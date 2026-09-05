const fs = require("fs");
const path = require("path");

const STORE_DIR = path.resolve(__dirname, "../../www.store.notroxinstruments.com");
const OUT_FILE = path.resolve(__dirname, "../src/data/products.json");

console.log("Scanning directory:", STORE_DIR);

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(filePath));
    } else if (file.endsWith(".html")) {
      results.push(filePath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(STORE_DIR);
console.log(`Found ${htmlFiles.length} HTML files.`);

const productsMap = new Map();
const categoriesSet = new Set();
const subcategoriesMap = new Map();

for (const filePath of htmlFiles) {
  const content = fs.readFileSync(filePath, "utf-8");

  // Only process if it is a product detail page
  if (!content.includes('id="product-product"') && !content.includes('class="product-info')) {
    continue;
  }

  // 1. Title / Name
  let name = "";
  const titleMatch = content.match(/<h1 class="title page-title"[^>]*>\s*<span>([^<]+)<\/span>/i) ||
                     content.match(/<div class="title page-title"[^>]*>([^<]+)<\/div>/i) ||
                     content.match(/<h1 class="title page-title"[^>]*>([^<]+)<\/h1>/i);
  if (titleMatch) {
    name = titleMatch[1].trim();
  }
  if (!name) continue;

  // 2. Model
  let model = "";
  const modelMatch = content.match(/<li class="product-model">.*?<span>([^<]+)<\/span>/is);
  if (modelMatch) {
    model = modelMatch[1].trim();
  } else {
    model = path.basename(filePath, ".html");
  }

  // Deduplicate by Model or clean name
  const prodKey = model ? `${model}__${name}` : name;
  if (productsMap.has(prodKey)) {
    continue;
  }

  // 3. Price
  let price = 0;
  let originalPrice = null;
  const priceNewMatch = content.match(/<div class="product-price-new">\$([0-9.,]+)<\/div>/i);
  const priceOldMatch = content.match(/<div class="product-price-old">\$([0-9.,]+)<\/div>/i);
  const priceMatch = content.match(/<div class="product-price">\$([0-9.,]+)<\/div>/i);

  if (priceNewMatch) {
    price = parseFloat(priceNewMatch[1].replace(/,/g, ""));
    if (priceOldMatch) {
      originalPrice = parseFloat(priceOldMatch[1].replace(/,/g, ""));
    }
  } else if (priceMatch) {
    price = parseFloat(priceMatch[1].replace(/,/g, ""));
  }

  // 4. Main Image & Gallery
  let mainImage = "";
  const imageMatch = content.match(/<div class="product-image[^"]*".*?<img\s+src="([^"]+)"/is) ||
                     content.match(/<div class="swiper-slide"[^>]*>\s*<img\s+src="([^"]+)"/is) ||
                     content.match(/data-largeimg="([^"]+)"/i);
  if (imageMatch) {
    let imgUrl = imageMatch[1];
    imgUrl = imgUrl.replace(/^https?:\/\/[^\/]+/, "");
    if (!imgUrl.startsWith("/")) imgUrl = "/" + imgUrl;
    mainImage = imgUrl;
  }

  // Additional gallery images
  const images = [];
  if (mainImage) images.push(mainImage);
  const galleryMatches = content.matchAll(/data-images='([^']+)'/gi);
  for (const g of galleryMatches) {
    try {
      const decoded = JSON.parse(g[1].replace(/&quot;/g, '"'));
      if (Array.isArray(decoded)) {
        for (const item of decoded) {
          if (item.src) {
            let src = item.src.replace(/^https?:\/\/[^\/]+/, "");
            if (!src.startsWith("/")) src = "/" + src;
            if (!images.includes(src)) images.push(src);
          }
        }
      }
    } catch (e) {}
  }

  // 5. Description
  let description = "";
  const descMatch = content.match(/<div class="product_extra-242 tab-pane[^"]*"[^>]*>.*?<div class="block-content expand-content">(.*?)<\/div>/is) ||
                    content.match(/<div id="tab-description"[^>]*>(.*?)<\/div>/is) ||
                    content.match(/<div class="product-details">.*?<div class="description">(.*?)<\/div>/is);
  if (descMatch) {
    description = descMatch[1].replace(/<div class="block-expand-overlay">.*?<\/div>/is, "").trim();
    description = description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }
  if (!description) {
    description = `${name}. High quality precision surgical instrument manufactured from medical grade stainless steel by Notrox Instruments.`;
  }

  // 6. Breadcrumbs & Categories
  const breadcrumbs = [];
  const breadcrumbMatches = content.match(/<ul class="breadcrumb">(.*?)<\/ul>/is);
  if (breadcrumbMatches) {
    const liMatches = breadcrumbMatches[1].matchAll(/<li[^>]*>\s*<a href="([^"]*)">\s*(?:<i class="fa fa-home"><\/i>)?([^<]*)<\/a>\s*<\/li>/gi);
    for (const li of liMatches) {
      const crumbText = li[2].trim();
      if (crumbText && crumbText !== name && !crumbText.toLowerCase().includes("home")) {
        breadcrumbs.push(crumbText);
      }
    }
  }

  const primaryCategory = breadcrumbs[0] || "Plastic Surgery";
  const subCategory = breadcrumbs[1] || "";
  categoriesSet.add(primaryCategory);
  if (subCategory) {
    if (!subcategoriesMap.has(primaryCategory)) {
      subcategoriesMap.set(primaryCategory, new Set());
    }
    subcategoriesMap.get(primaryCategory).add(subCategory);
  }

  // 7. Tags
  const tags = [];
  const tagsBlock = content.match(/<div class="tags">(.*?)<\/div>/is);
  if (tagsBlock) {
    const tagMatches = tagsBlock[1].matchAll(/<a[^>]*>([^<]+)<\/a>/gi);
    for (const t of tagMatches) {
      tags.push(t[1].trim());
    }
  }

  // 8. Options / Variants (e.g. Select Angle, Cannula Size, Handle, Size, Pattern)
  const options = [];
  const optionMatches = content.matchAll(/<div class="form-group[^"]*product-option[^"]*"[^>]*>(.*?)<\/div>\s*<\/div>/gis);
  for (const ob of optionMatches) {
    const optLabelMatch = ob[0].match(/<label class="control-label"[^>]*>([^<]+)<\/label>/i);
    if (optLabelMatch) {
      const optName = optLabelMatch[1].replace(/\s*\*\s*$/, "").trim();
      const optValues = [];
      const valMatches = ob[0].matchAll(/<span class="option-value">\s*([^<]+)\s*<\/span>/gi);
      for (const vm of valMatches) {
        optValues.push(vm[1].trim());
      }
      if (optValues.length > 0) {
        options.push({
          name: optName,
          values: optValues,
        });
      }
    }
  }

  const slug = path.basename(filePath, ".html").toLowerCase().replace(/[^a-z0-9]+/g, "-");

  productsMap.set(prodKey, {
    id: slug || `prod-${productsMap.size + 1}`,
    name,
    model,
    price: price || 30.0,
    originalPrice: originalPrice,
    image: mainImage || "/image/cache/catalog/n%20final%20png-5027x2270.png",
    images: images.length > 0 ? images : [mainImage || "/image/cache/catalog/n%20final%20png-5027x2270.png"],
    description,
    category: primaryCategory,
    subCategory,
    breadcrumbs,
    tags: tags.length > 0 ? tags : [primaryCategory, "Surgical Instruments"],
    options,
    rating: 5,
  });
}

const products = Array.from(productsMap.values());
console.log(`Successfully extracted ${products.length} unique products!`);

const categories = Array.from(categoriesSet);
const subcategories = {};
for (const [k, v] of subcategoriesMap.entries()) {
  subcategories[k] = Array.from(v);
}

const catalogData = {
  totalCount: products.length,
  categories,
  subcategories,
  products,
};

fs.writeFileSync(OUT_FILE, JSON.stringify(catalogData, null, 2), "utf-8");
console.log(`Wrote catalog to ${OUT_FILE}`);
