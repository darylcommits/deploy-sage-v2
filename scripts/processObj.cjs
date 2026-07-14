const fs = require('fs');
const readline = require('readline');
const path = require('path');

const objPath = path.join(__dirname, '../public/logo.obj');
const outPath = path.join(__dirname, '../public/logo_points.json');

async function processFile() {
  if (!fs.existsSync(objPath)) {
    console.error('File not found:', objPath);
    return;
  }

  const fileStream = fs.createReadStream(objPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const vertices = [];
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;

  console.log('Parsing OBJ...');
  for await (const line of rl) {
    if (line.startsWith('v ')) {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 4) {
        const x = parseFloat(parts[1]);
        const y = parseFloat(parts[2]);
        const z = parseFloat(parts[3]);
        vertices.push(x, y, z);

        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
        if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
      }
    }
  }

  console.log(`Found ${vertices.length / 3} vertices.`);
  console.log(`Bounds: X(${minX.toFixed(2)} to ${maxX.toFixed(2)}) Y(${minY.toFixed(2)} to ${maxY.toFixed(2)}) Z(${minZ.toFixed(2)} to ${maxZ.toFixed(2)})`);

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const cz = (minZ + maxZ) / 2;
  const maxExtent = Math.max(maxX - minX, maxY - minY, maxZ - minZ);

  const COUNT = 25000;
  const points = [];

  for (let i = 0; i < COUNT; i++) {
    const pIdx = Math.floor(Math.random() * (vertices.length / 3)) * 3;
    
    // Normalize and center (scale to -2.5 to 2.5 roughly)
    const x = ((vertices[pIdx] - cx) / maxExtent) * 5.0; 
    const y = ((vertices[pIdx+1] - cy) / maxExtent) * 5.0;
    const z = ((vertices[pIdx+2] - cz) / maxExtent) * 5.0;

    // Use 4 decimal places to save JSON file size
    points.push(Number(x.toFixed(4)), Number(y.toFixed(4)), Number(z.toFixed(4)));
  }
  
  fs.writeFileSync(outPath, JSON.stringify(points));
  console.log(`Saved ${COUNT} points to logo_points.json (${(fs.statSync(outPath).size / 1024 / 1024).toFixed(2)} MB)`);
}

processFile();
