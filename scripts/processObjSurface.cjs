const fs = require('fs');
const readline = require('readline');
const path = require('path');

const objPath = path.join(__dirname, '../public/logo.obj');
const outPath = path.join(__dirname, '../public/logo_points.json');

// Calculate area of a 3D triangle
function triangleArea(A, B, C) {
  const AB = [B[0]-A[0], B[1]-A[1], B[2]-A[2]];
  const AC = [C[0]-A[0], C[1]-A[1], C[2]-A[2]];
  // Cross product
  const cx = AB[1]*AC[2] - AB[2]*AC[1];
  const cy = AB[2]*AC[0] - AB[0]*AC[2];
  const cz = AB[0]*AC[1] - AB[1]*AC[0];
  return 0.5 * Math.sqrt(cx*cx + cy*cy + cz*cz);
}

async function processFile() {
  if (!fs.existsSync(objPath)) {
    console.error('File not found:', objPath);
    return;
  }

  const fileStream = fs.createReadStream(objPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const vertices = [[0, 0, 0]]; // OBJ is 1-indexed
  const faces = [];
  
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;

  console.log('Parsing OBJ file (vertices and faces)...');
  for await (const line of rl) {
    if (line.startsWith('v ')) {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 4) {
        const x = parseFloat(parts[1]);
        const y = parseFloat(parts[2]);
        const z = parseFloat(parts[3]);
        vertices.push([x, y, z]);

        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
        if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
      }
    } else if (line.startsWith('f ')) {
      const parts = line.trim().split(/\s+/).slice(1);
      // Face elements look like: 1/1/1 or just 1
      const vIndices = parts.map(p => parseInt(p.split('/')[0], 10));
      // Triangulate any polygons into simple triangles
      for (let i = 1; i < vIndices.length - 1; i++) {
        faces.push([vIndices[0], vIndices[i], vIndices[i+1]]);
      }
    }
  }

  console.log(`Found ${vertices.length - 1} vertices and ${faces.length} triangular faces.`);

  // If there are no faces, fallback to vertex-only sampling (unlikely)
  if (faces.length === 0) {
     console.error("No faces found! Cannot do uniform surface sampling.");
     return;
  }

  // Calculate cumulative area for weighted random selection
  console.log('Calculating surface areas...');
  const cumulativeAreas = new Float64Array(faces.length);
  let totalArea = 0;
  
  for (let i = 0; i < faces.length; i++) {
    const f = faces[i];
    const A = vertices[f[0]];
    const B = vertices[f[1]];
    const C = vertices[f[2]];
    
    // Safety check for malformed OBJ indices
    if (A && B && C) {
        totalArea += triangleArea(A, B, C);
    }
    cumulativeAreas[i] = totalArea;
  }

  // Binary search to pick a random face based on area
  function pickRandomFace() {
    const r = Math.random() * totalArea;
    let low = 0, high = faces.length - 1;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (cumulativeAreas[mid] < r) low = mid + 1;
      else high = mid;
    }
    return faces[low];
  }

  console.log(`Total surface area: ${totalArea.toFixed(2)}. Sampling points...`);

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const cz = (minZ + maxZ) / 2;
  const maxExtent = Math.max(maxX - minX, maxY - minY, maxZ - minZ);

  // We increase count slightly to 30000 for an incredibly dense, solid shape
  const COUNT = 30000;
  const points = [];

  for (let i = 0; i < COUNT; i++) {
    const face = pickRandomFace();
    const A = vertices[face[0]];
    const B = vertices[face[1]];
    const C = vertices[face[2]];

    if (!A || !B || !C) continue;

    // Uniform random point inside triangle (Barycentric coordinates)
    const r1 = Math.random();
    const r2 = Math.random();
    const sqrtR1 = Math.sqrt(r1);
    
    const a = 1 - sqrtR1;
    const b = sqrtR1 * (1 - r2);
    const c = sqrtR1 * r2;

    const px = A[0]*a + B[0]*b + C[0]*c;
    const py = A[1]*a + B[1]*b + C[1]*c;
    const pz = A[2]*a + B[2]*b + C[2]*c;
    
    // Normalize and center (scale to base 5.0)
    const x = ((px - cx) / maxExtent) * 5.0; 
    const y = ((py - cy) / maxExtent) * 5.0;
    const z = ((pz - cz) / maxExtent) * 5.0;

    points.push(Number(x.toFixed(4)), Number(y.toFixed(4)), Number(z.toFixed(4)));
  }
  
  fs.writeFileSync(outPath, JSON.stringify(points));
  console.log(`Successfully mapped ${COUNT} points perfectly across the 3D surface!`);
  console.log(`Saved to logo_points.json (${(fs.statSync(outPath).size / 1024 / 1024).toFixed(2)} MB)`);
}

processFile();
