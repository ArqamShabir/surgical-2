import catalogData from "./products.json";

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  name: string;
  model: string;
  price: number;
  originalPrice?: number | null;
  discount?: string;
  image: string;
  images?: string[];
  description: string;
  rating: number;
  badge?: "Hot" | "Sale" | "New";
  category?: string;
  subCategory?: string;
  breadcrumbs?: string[];
  tags?: string[];
  options?: ProductOption[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: { day: string; month: string };
  author: string;
  commentsCount: number;
  viewsCount: number;
  image: string;
}

export interface Testimonial {
  id: string;
  author: string;
  quote: string;
  rating: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
}

export interface SideProduct {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

const BASE_URL = import.meta.env.BASE_URL || "/";
const prefix = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;

export const fixAssetUrl = (url: string): string => {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) return url;
  const clean = url.startsWith("/") ? url.slice(1) : url;
  return `${prefix}${clean}`;
};

export const ALL_PRODUCTS: Product[] = (catalogData.products as Product[]).map((p, idx) => ({
  ...p,
  image: fixAssetUrl(p.image),
  images: p.images ? p.images.map(fixAssetUrl) : [fixAssetUrl(p.image)],
  rating: p.rating || 5,
  badge: idx % 7 === 0 ? "Hot" : idx % 5 === 0 ? "Sale" : idx % 3 === 0 ? "New" : undefined,
}));

export const NAV_CATEGORIES = [
  "All",
  "Plastic Surgery",
  "Specialty Instruments",
  "Standard Instruments",
  "Liposuction",
  "Suggested Instruments Sets",
  "General Surgery Instruments",
  "Electro Surgical Instruments",
  "Maxillofacial Instruments",
  "Hospital holloware",
  "Neurosurgery",
  "Obstetrical",
  "Stomach, Intestine & Rectum",
  "Thorax & Cardiovascular",
  "Urology",
  "Orthopedic",
  "ENT",
  "Gynecology",
];

export const HERO_SLIDES = [
  {
    id: "1",
    tag: "NEW ARRIVALS",
    title: "Quality for\nSmooth Experience",
    subtitle: "PRECISION SURGICAL TOOLS",
    description:
      "Explore our comprehensive range of handcrafted surgical instruments engineered for exceptional precision, durability, and absolute reliability.",
    buttonText: "SHOP NOW",
    link: "/collections/plastic-surgery",
    image: fixAssetUrl("/image/cache/catalog/banners/2-960x450.jpg"),
  },
  {
    id: "2",
    tag: "FULLY CERTIFIED",
    title: "Tools for\nProfessionals",
    subtitle: "STANDARD OF EXCELLENCE",
    description:
      "Tools crafted under rigorous international medical standards for discerning surgical professionals worldwide.",
    buttonText: "EXPLORE NOW",
    link: "/collections/suggested-instruments-sets",
    image: fixAssetUrl("/image/cache/catalog/banners/2-960x450.jpg"),
  },
];

export const SIDE_BANNERS = [
  {
    id: "1",
    tag: "Specialty Instruments",
    title: "Liposuction Cannulas",
    subtitle: "and Accessories",
    buttonText: "Explore Now",
    link: "/collections/liposuction",
    image: fixAssetUrl("/image/cache/catalog/banners/b1-320x210.jpg"),
  },
  {
    id: "2",
    tag: "Certified Quality",
    title: "Specialty Instruments",
    subtitle: "for Plastic Surgery",
    buttonText: "Shop Sets",
    link: "/collections/plastic-surgery",
    image: fixAssetUrl("/image/cache/catalog/banners/b2-320x210.jpg"),
  },
];

// Helper to curate distinct unique products without duplication
const getCuratedTabProducts = (keywords: string[], fallbackStart: number, count: number = 8): Product[] => {
  const result: Product[] = [];
  const seen = new Set<string>();

  for (const kw of keywords) {
    const lower = kw.toLowerCase();
    const found = ALL_PRODUCTS.find(
      (p) =>
        !seen.has(p.id) &&
        (p.id.toLowerCase().includes(lower) ||
          p.name.toLowerCase().includes(lower) ||
          p.model.toLowerCase().includes(lower))
    );
    if (found) {
      seen.add(found.id);
      result.push(found);
    }
  }

  // Fill up to count from unique products in catalog
  let idx = fallbackStart;
  while (result.length < count && idx < ALL_PRODUCTS.length) {
    const p = ALL_PRODUCTS[idx++];
    if (!seen.has(p.id)) {
      seen.add(p.id);
      result.push(p);
    }
  }

  return result;
};

// Distinct curated products per tab
export const FEATURED_PRODUCTS: Record<"featured" | "latest" | "bestsellers" | "specials", Product[]> = {
  featured: getCuratedTabProducts(
    [
      "cleft-palate-set",
      "breast-augmentation-instrument-set",
      "fat-grafting-and-liposuction",
      "tebbetts-rhinoplasty",
      "major-nasal-set",
      "rhinoplasty-instruments-set-walter",
      "abdominoplasty-tummy-tuck",
      "preservation-rhinoplasty",
    ],
    0,
    8
  ),
  latest: getCuratedTabProducts(
    [
      "bauer-type-intra-oral",
      "hargis",
      "stevens-scissors",
      "adson-tissue-forceps",
      "aufricht-nasal",
      "castroviejo",
      "balfour-abdominal",
      "female-urinal",
    ],
    40,
    8
  ),
  bestsellers: getCuratedTabProducts(
    [
      "metzenbaum",
      "mayo-lexer",
      "freeman-areola",
      "heymann-nasal",
      "mercedese-cannula",
      "desmarres-lid",
      "cushing-bipolar",
      "halsey-needle",
    ],
    120,
    8
  ),
  specials: getCuratedTabProducts(
    [
      "blue-line-rhinoplasty",
      "special-luer-lock",
      "rib-shears",
      "bone-cutting",
      "olsen-hegar",
      "frontotemporal",
      "wang-cleft",
      "maxilla-mobilizer",
    ],
    200,
    8
  ),
};

export const SIDE_PRODUCTS: SideProduct[] = getCuratedTabProducts(
  [
    "breast-augmentation-instrument-set",
    "fat-grafting-and-liposuction",
    "major-nasal-set",
    "rhinoplasty-instruments-set-walter",
  ],
  0,
  4
).map((p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  rating: 5,
  image: p.image,
}));

export const CATEGORIES_DATA: Category[] = [
  {
    id: "cat-1",
    name: "Plastic Surgery",
    description: "Wide range of instruments from skin grafting to micro surgery.",
    image: fixAssetUrl("/image/cache/catalog/14-120x120.jpg"),
    link: "/collections/plastic-surgery",
  },
  {
    id: "cat-2",
    name: "Liposuction Cannulas",
    description: "Precision engineered suction and infiltration cannulas with custom fittings.",
    image: fixAssetUrl("/image/cache/catalog/lipo-2-120x120.jpg"),
    link: "/collections/liposuction",
  },
  {
    id: "cat-3",
    name: "Standard Instruments",
    description: "Forceps, scissors, needle holders and retractors of highest grade.",
    image: fixAssetUrl("/image/cache/catalog/15-120x120.jpg"),
    link: "/collections/standard-instruments",
  },
  {
    id: "cat-4",
    name: "Suggested Instruments Sets",
    description: "Complete procedure kits for breast augmentation, rhinoplasty, and cleft palate.",
    image: fixAssetUrl("/image/cache/catalog/1-120x120.jpg"),
    link: "/collections/suggested-instruments-sets",
  },
  {
    id: "cat-5",
    name: "Electro Surgical",
    description: "Bipolar and monopolar forceps, electrodes, cables and generators.",
    image: fixAssetUrl("/image/cache/catalog/2-120x120.jpg"),
    link: "/collections/electro-surgical-instruments",
  },
  {
    id: "cat-6",
    name: "General Surgery",
    description: "Abdominal retractors, intestinal clamps, bone cutting shears and more.",
    image: fixAssetUrl("/image/cache/catalog/3-120x120.jpg"),
    link: "/collections/general-surgery-instruments",
  },
];

export const TOP_CATEGORIES = CATEGORIES_DATA;

export const WHATSAPP_PHONE = "923494846107";
export const DISPLAY_PHONE = "+92 3494846107";

export const getWhatsAppProductUrl = (
  product: Product,
  selectedOptions?: Record<string, string>
): string => {
  const lines: string[] = [
    `Hello Coin Surgical, I would like to order / inquire about:`,
    `*Product:* ${product.name}`,
    `*Model:* ${product.model}`,
  ];

  if (selectedOptions && Object.keys(selectedOptions).length > 0) {
    const opts = Object.entries(selectedOptions)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");
    lines.push(`*Selected Variant:* ${opts}`);
  }

  const encoded = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
};

export const FOOTER_DATA = {
  quickLinks: [
    { title: "About Us", link: "/about-us" },
    { title: "Delivery Information", link: "/delivery-information" },
    { title: "Privacy Policy", link: "/privacy-policy" },
    { title: "Terms & Conditions", link: "/terms" },
    { title: "Our Work Strategy", link: "/our-work-strategy" },
    { title: "Return Policy", link: "/return-policy" },
    { title: "FAQ", link: "/faq" },
  ],
  contact: {
    phone: DISPLAY_PHONE,
    whatsapp: WHATSAPP_PHONE,
    emails: ["coinsurgical@gmail.com"],
    address: "Sialkot, Punjab, Pakistan",
  },
  social: [
    { name: "Facebook", href: "https://www.facebook.com/coinsurgical" },
    { name: "Instagram", href: "https://www.instagram.com/coinsurgical.shop/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/coinsurgical" },
  ],
  certifications: ["ISO 9001:2015", "CE Marked", "FDA Approved"],
  copyright: "© 2026 Coin Surgical. All Rights Reserved.",
};

export const BLOG_POSTS = {
  latest: [
    {
      id: "post-1",
      title: "Introducing Our New Microaire Fitting ...",
      excerpt:
        "At Coin Surgical, we are dedicated to advancing medical technology and providing the highest quality surgical instruments to healthcare...",
      date: { day: "08", month: "JUL" },
      author: "irfan",
      commentsCount: 31,
      viewsCount: 3821,
      image: fixAssetUrl("/image/cache/catalog/blog-posts/microaire-fitting-cannulas-pal-cannulas-1060x400.jpg"),
    },
    {
      id: "post-2",
      title: "Essential Breast Surgery Instruments: ...",
      excerpt:
        "Breast surgery, whether reconstructive, cosmetic, or oncological, requires a meticulous approach and the use of high-quality instruments. The right...",
      date: { day: "26", month: "JUN" },
      author: "irfan",
      commentsCount: 323,
      viewsCount: 5003,
      image: fixAssetUrl("/image/cache/catalog/blog-posts/breast-surgery-instruments-1060x400.jpg"),
    },
  ],
  mostRead: [
    {
      id: "post-2",
      title: "Essential Breast Surgery Instruments: ...",
      excerpt:
        "Breast surgery, whether reconstructive, cosmetic, or oncological, requires a meticulous approach and the use of high-quality instruments. The right...",
      date: { day: "26", month: "JUN" },
      author: "irfan",
      commentsCount: 323,
      viewsCount: 5003,
      image: fixAssetUrl("/image/cache/catalog/blog-posts/breast-surgery-instruments-1060x400.jpg"),
    },
    {
      id: "post-1",
      title: "Introducing Our New Microaire Fitting ...",
      excerpt:
        "At Coin Surgical, we are dedicated to advancing medical technology and providing the highest quality surgical instruments to healthcare...",
      date: { day: "08", month: "JUL" },
      author: "irfan",
      commentsCount: 31,
      viewsCount: 3821,
      image: fixAssetUrl("/image/cache/catalog/blog-posts/microaire-fitting-cannulas-pal-cannulas-1060x400.jpg"),
    },
  ],
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    author: "Dr. Emily S., Plastic Surgeon",
    quote: "I have been using instruments from Coin Surgical for the past year, and I am extremely impressed with the quality and precision of their tools. The Metzenbaum Scissors and needle holders are particularly exceptional.",
    rating: 5,
  },
  {
    id: "t-2",
    author: "Dr. Mark R., Surgeon",
    quote: "As a plastic surgeon, having reliable and high-quality instruments is crucial. The Brown-Adson Tissue Forceps and Freer Elevator are my go-to instruments now. Fast delivery and well-packaged.",
    rating: 5,
  },
  {
    id: "t-3",
    author: "Dr. Sarah T., Chief Surgeon",
    quote: "I recently purchased a complete surgical instrument set. The instruments are well-crafted and meet the highest standards required for surgical procedures. Great products and service!",
    rating: 5,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-1",
    title: "Deaver Retractor Insulated",
    image: fixAssetUrl("/image/cache/catalog/products/05 - BREAST RETRACTORS/05-BR-32-550x550w.jpg"),
  },
  {
    id: "g-2",
    title: "Fiber Optic Breast Retractor",
    image: fixAssetUrl("/image/cache/catalog/products/05 - BREAST RETRACTORS/01 Double Handle Breast Retractor with Fiber Optic and Suction Tube-550x550h.jpg"),
  },
  {
    id: "g-3",
    title: "Nasal Speculums",
    image: fixAssetUrl("/image/cache/catalog/products/02 - AURICULAR PLASTIC INSTRUMENTS/02-API-05-550x550w.jpg"),
  },
  {
    id: "g-4",
    title: "Electro Surgical Instruments",
    image: fixAssetUrl("/image/cache/catalog/products/05 - BREAST RETRACTORS/05-BR-03-550x550h.jpg"),
  },
  {
    id: "g-5",
    title: "Microaire Fitting Cannulas",
    image: fixAssetUrl("/image/cache/catalog/N-Products/liposuction/6-microaire-fitting/1-550x550.jpg"),
  },
  {
    id: "g-6",
    title: "Breast Elevator",
    image: fixAssetUrl("/image/cache/catalog/products/05 - BREAST RETRACTORS/05-BR-40-550x550w.jpg"),
  },
  {
    id: "g-7",
    title: "Bone & Cartilage Rasps",
    image: fixAssetUrl("/image/cache/catalog/products/06 - CARTILAGE AND BONE INSTRUMENTS/06-CBI-04-550x550h.jpg"),
  },
  {
    id: "g-8",
    title: "Grossman Areola Marker",
    image: fixAssetUrl("/image/cache/catalog/products/01 - Areola Marker/01-AR-16-550x550w.jpg"),
  },
  {
    id: "g-9",
    title: "Syringe Holding Device",
    image: fixAssetUrl("/image/cache/catalog/products/01 - Areola Marker/01-AR-38-550x550w.jpg"),
  },
];
