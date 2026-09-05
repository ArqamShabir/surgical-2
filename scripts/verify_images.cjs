const fs = require("fs");
const path = require("path");

const productsFile = path.resolve(__dirname, "../src/data/products.json");
const publicDir = path.resolve(__dirname, "../public");

const data = JSON.parse(fs.readFileSync(productsFile, "utf-8"));
console.log("Total products in json:", data.products.length);

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

const fallbackImage = "/image/cache/catalog/N-Products/suggested-sets/set-05-breast-augmentation-instruments-set-550x550.jpg";

for (const p of data.products) {
  let img = p.image;
  img = decodeURIComponent(img).replace(/\\/g, "/");
  if (!img.startsWith("/")) img = "/" + img;

  const checkLower = img.toLowerCase();
  if (fileMap.has(checkLower)) {
    p.image = fileMap.get(checkLower);
  } else {
    // Try to find matching image in N-Products or catalog by basename
    const baseName = path.basename(img).toLowerCase();
    let found = false;
    for (const [key, actual] of fileMap.entries()) {
      if (path.basename(key) === baseName) {
        p.image = actual;
        found = true;
        break;
      }
    }
    if (!found) {
      p.image = fallbackImage;
    }
  }

  // Also check p.images
  if (p.images) {
    p.images = p.images.map((im) => {
      let decoded = decodeURIComponent(im).replace(/\\/g, "/");
      if (!decoded.startsWith("/")) decoded = "/" + decoded;
      const lower = decoded.toLowerCase();
      if (fileMap.has(lower)) {
        return fileMap.get(lower);
      }
      return p.image;
    });
  }
}

fs.writeFileSync(productsFile, JSON.stringify(data, null, 2), "utf-8");
console.log("Verified all images in products.json!");
