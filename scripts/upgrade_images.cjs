const fs = require("fs");
const path = require("path");

const productsFile = path.resolve(__dirname, "../src/data/products.json");
const publicDir = path.resolve(__dirname, "../public");

const data = JSON.parse(fs.readFileSync(productsFile, "utf-8"));
console.log("Processing products count:", data.products.length);

function buildFileMap(dir, baseDir) {
  const map = new Map();
  function walk(currentDir) {
    const list = fs.readdirSync(currentDir);
    for (const f of list) {
      const fullPath = path.join(currentDir, f);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        walk(fullPath);
      } else {
        const relPath = "/" + path.relative(baseDir, fullPath).replace(/\\/g, "/");
        map.set(relPath.toLowerCase(), relPath);
      }
    }
  }
  walk(dir);
  return map;
}

const fileMap = buildFileMap(path.join(publicDir, "image"), publicDir);

function getHighestRes(imgRel) {
  if (!imgRel) return imgRel;
  // If it is 550x550 or 200x200, check if 1100x1100 or 1000x1000 or raw exists
  const clean = imgRel.toLowerCase();
  const high1100 = clean.replace(/-\d+x\d+\.(jpg|png|jpeg)$/i, "-1100x1100.$1");
  const high1000 = clean.replace(/-\d+x\d+\.(jpg|png|jpeg)$/i, "-1000x1000.$1");
  const high550 = clean.replace(/-\d+x\d+\.(jpg|png|jpeg)$/i, "-550x550.$1");

  if (fileMap.has(high1100)) return fileMap.get(high1100);
  if (fileMap.has(high1000)) return fileMap.get(high1000);
  if (fileMap.has(high550)) return fileMap.get(high550);
  if (fileMap.has(clean)) return fileMap.get(clean);
  return imgRel;
}

function normalizeKey(imgPath) {
  // Strip resolution and size suffixes like -550x550, -1000x1000 to identify identical base images
  return path.basename(imgPath).toLowerCase().replace(/-\d+x\d+(?:h|w)?\.(jpg|png|jpeg)$/i, "");
}

for (const p of data.products) {
  // Upgrade main image
  p.image = getHighestRes(p.image);

  // Clean and deduplicate images array
  const uniqueMap = new Map();
  if (p.image) {
    uniqueMap.set(normalizeKey(p.image), p.image);
  }

  if (Array.isArray(p.images)) {
    for (const im of p.images) {
      const best = getHighestRes(im);
      const key = normalizeKey(best);
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, best);
      }
    }
  }

  p.images = Array.from(uniqueMap.values());
}

fs.writeFileSync(productsFile, JSON.stringify(data, null, 2), "utf-8");
console.log("Finished upgrading resolutions and deduplicating image arrays in products.json");
