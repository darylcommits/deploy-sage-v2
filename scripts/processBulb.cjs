// Process bullb.glb into bulb_points.json — surface-sampled point cloud
const fs = require('fs');
const path = require('path');

const glbPath = path.join(__dirname, '../public/bullb.glb');
const outPath = path.join(__dirname, '../public/bulb_points.json');

function triangleArea(A, B, C) {
  const AB = [B[0]-A[0], B[1]-A[1], B[2]-A[2]];
  const AC = [C[0]-A[0], C[1]-A[1], C[2]-A[2]];
  const cx = AB[1]*AC[2] - AB[2]*AC[1];
  const cy = AB[2]*AC[0] - AB[0]*AC[2];
  const cz = AB[0]*AC[1] - AB[1]*AC[0];
  return 0.5 * Math.sqrt(cx*cx + cy*cy + cz*cz);
}

function parseGLB(buffer) {
  const magic = buffer.readUInt32LE(0);
  if (magic !== 0x46546C67) throw new Error('Not a valid GLB file (bad magic)');
  const version = buffer.readUInt32LE(4);
  console.log(`GLB version: ${version}`);

  let offset = 12;
  let jsonChunk = null;
  let binChunk = null;

  while (offset < buffer.length) {
    const chunkLength = buffer.readUInt32LE(offset);
    const chunkType = buffer.readUInt32LE(offset + 4);
    const chunkData = buffer.slice(offset + 8, offset + 8 + chunkLength);

    if (chunkType === 0x4E4F534A) { // JSON
      jsonChunk = JSON.parse(chunkData.toString('utf8'));
    } else if (chunkType === 0x004E4942) { // BIN
      binChunk = chunkData;
    }
    offset += 8 + chunkLength;
  }

  if (!jsonChunk) throw new Error('No JSON chunk found in GLB');
  if (!binChunk) throw new Error('No BIN chunk found in GLB');

  console.log(`Meshes: ${jsonChunk.meshes?.length || 0}`);
  console.log(`Accessors: ${jsonChunk.accessors?.length || 0}`);

  const allVertices = [];
  const allFaces = [];
  let vertexOffset = 0;

  for (const mesh of jsonChunk.meshes || []) {
    console.log(`Processing mesh: ${mesh.name || 'unnamed'} with ${mesh.primitives.length} primitives`);
    for (const prim of mesh.primitives) {
      const posAccIdx = prim.attributes['POSITION'];
      if (posAccIdx === undefined) continue;

      const posAcc = jsonChunk.accessors[posAccIdx];
      const posView = jsonChunk.bufferViews[posAcc.bufferView];
      const posOffset = (posView.byteOffset || 0) + (posAcc.byteOffset || 0);
      const posStride = posView.byteStride || 12;

      const count = posAcc.count;
      console.log(`  Vertices: ${count}`);

      for (let i = 0; i < count; i++) {
        const o = posOffset + i * posStride;
        allVertices.push([
          binChunk.readFloatLE(o),
          binChunk.readFloatLE(o + 4),
          binChunk.readFloatLE(o + 8)
        ]);
      }

      if (prim.indices !== undefined) {
        const idxAcc = jsonChunk.accessors[prim.indices];
        const idxView = jsonChunk.bufferViews[idxAcc.bufferView];
        const idxOffset = (idxView.byteOffset || 0) + (idxAcc.byteOffset || 0);
        const idxCount = idxAcc.count;
        const componentType = idxAcc.componentType;

        console.log(`  Indices: ${idxCount} (${idxCount/3} triangles)`);

        for (let i = 0; i < idxCount; i += 3) {
          let a, b, c;
          if (componentType === 5123) {
            a = binChunk.readUInt16LE(idxOffset + i * 2);
            b = binChunk.readUInt16LE(idxOffset + (i+1) * 2);
            c = binChunk.readUInt16LE(idxOffset + (i+2) * 2);
          } else {
            a = binChunk.readUInt32LE(idxOffset + i * 4);
            b = binChunk.readUInt32LE(idxOffset + (i+1) * 4);
            c = binChunk.readUInt32LE(idxOffset + (i+2) * 4);
          }
          allFaces.push([a + vertexOffset, b + vertexOffset, c + vertexOffset]);
        }
      } else {
        for (let i = 0; i < count; i += 3) {
          allFaces.push([i + vertexOffset, i+1 + vertexOffset, i+2 + vertexOffset]);
        }
      }

      vertexOffset += count;
    }
  }

  return { vertices: allVertices, faces: allFaces };
}

async function main() {
  console.log('Reading bullb.glb...');
  const buffer = fs.readFileSync(glbPath);
  console.log(`File size: ${(buffer.length / 1024 / 1024).toFixed(1)} MB`);

  const { vertices, faces } = parseGLB(buffer);
  console.log(`\nTotal vertices: ${vertices.length}`);
  console.log(`Total faces: ${faces.length}`);

  if (vertices.length === 0) {
    console.error('No vertices found!');
    return;
  }

  // Bounding box
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;
  for (const [x, y, z] of vertices) {
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
    if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
  }
  console.log(`Bounds X: ${minX.toFixed(3)} to ${maxX.toFixed(3)}`);
  console.log(`Bounds Y: ${minY.toFixed(3)} to ${maxY.toFixed(3)}`);
  console.log(`Bounds Z: ${minZ.toFixed(3)} to ${maxZ.toFixed(3)}`);

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const cz = (minZ + maxZ) / 2;
  const maxExtent = Math.max(maxX - minX, maxY - minY, maxZ - minZ);

  // Surface-area weighted sampling
  console.log('\nCalculating surface areas...');
  const areas = new Float64Array(faces.length);
  let totalArea = 0;
  for (let i = 0; i < faces.length; i++) {
    const [ai, bi, ci] = faces[i];
    const A = vertices[ai], B = vertices[bi], C = vertices[ci];
    if (A && B && C) {
      areas[i] = triangleArea(A, B, C);
      totalArea += areas[i];
    }
  }

  const cumAreas = new Float64Array(faces.length);
  let acc = 0;
  for (let i = 0; i < faces.length; i++) { acc += areas[i]; cumAreas[i] = acc; }

  function pickFace() {
    const r = Math.random() * totalArea;
    let lo = 0, hi = faces.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cumAreas[mid] < r) lo = mid + 1; else hi = mid;
    }
    return faces[lo];
  }

  const COUNT = 150000;
  const points = [];
  for (let i = 0; i < COUNT; i++) {
    const face = pickFace();
    const A = vertices[face[0]], B = vertices[face[1]], C = vertices[face[2]];
    if (!A || !B || !C) continue;

    const r1 = Math.sqrt(Math.random());
    const r2 = Math.random();
    const a = 1 - r1, b = r1 * (1 - r2), c = r1 * r2;

    // Scale to same coordinate space as logo (maxExtent-normalized, * 5.0)
    const px = (A[0]*a + B[0]*b + C[0]*c - cx) / maxExtent * 5.0;
    const py = (A[1]*a + B[1]*b + C[1]*c - cy) / maxExtent * 5.0;
    const pz = (A[2]*a + B[2]*b + C[2]*c - cz) / maxExtent * 5.0;
    points.push(+px.toFixed(4), +py.toFixed(4), +pz.toFixed(4));
  }

  fs.writeFileSync(outPath, JSON.stringify(points));
  console.log(`\nSaved ${COUNT} points → bulb_points.json (${(fs.statSync(outPath).size/1024).toFixed(0)} KB)`);
}

main().catch(console.error);
