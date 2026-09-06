import React, { useState, useMemo, useEffect } from "react";
import {
  LayoutGrid,
  List,
  Home,
  Eye,
  ChevronLeft,
  ChevronRight,
  SearchX,
  MessageCircle,
} from "lucide-react";
import {
  ALL_PRODUCTS,
  fixAssetUrl,
  getWhatsAppProductUrl,
  type Product,
} from "../data/mockData";
import { useCurrency } from "../context/CurrencyContext";

interface CollectionPageProps {
  categoryName?: string;
  searchQuery?: string;
  onQuickView: (product: Product) => void;
  onOpenQuestion?: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
  onClearSearch?: () => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  categoryName = "Plastic Surgery",
  searchQuery = "",
  onQuickView,
  onSelectProduct,
  onNavigateHome,
  onClearSearch,
}) => {
  const { formatPrice } = useCurrency();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("default");
  const [limit, setLimit] = useState(24);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedSubCategory("All");
  }, [categoryName, searchQuery]);

  // Primary filtering by search query & category
  const filteredProducts = useMemo(() => {
    let list = ALL_PRODUCTS;

    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        const matchName = p.name && p.name.toLowerCase().includes(q);
        const matchModel = p.model && p.model.toLowerCase().includes(q);
        const matchDesc = p.description && p.description.toLowerCase().includes(q);
        const matchTags = p.tags && p.tags.some((t) => t.toLowerCase().includes(q));
        const matchCat = p.category && p.category.toLowerCase().includes(q);
        const matchSub = p.subCategory && p.subCategory.toLowerCase().includes(q);
        return matchName || matchModel || matchDesc || matchTags || matchCat || matchSub;
      });
    }

    if (categoryName && categoryName !== "All" && (!searchQuery || categoryName !== "Search")) {
      const catLower = categoryName.toLowerCase();
      const catFiltered = list.filter((p) => {
        const matchCat = p.category && p.category.toLowerCase().includes(catLower);
        const matchSub = p.subCategory && p.subCategory.toLowerCase().includes(catLower);
        const matchTag = p.tags && p.tags.some((t) => t.toLowerCase().includes(catLower));
        const matchName = p.name && p.name.toLowerCase().includes(catLower);
        return matchCat || matchSub || matchTag || matchName;
      });

      if (!searchQuery) {
        list = catFiltered;
      }
    }

    return list;
  }, [categoryName, searchQuery]);

  // Secondary subcategory filtering if selected
  const categoryProducts = useMemo(() => {
    if (!selectedSubCategory || selectedSubCategory === "All") {
      return filteredProducts.length > 0 ? filteredProducts : ALL_PRODUCTS;
    }
    const subLower = selectedSubCategory.toLowerCase();
    const result = filteredProducts.filter((p) => {
      const matchSub = p.subCategory && p.subCategory.toLowerCase().includes(subLower);
      const matchTag = p.tags && p.tags.some((t) => t.toLowerCase().includes(subLower));
      const matchName = p.name && p.name.toLowerCase().includes(subLower);
      return matchSub || matchTag || matchName;
    });
    return result.length > 0 ? result : filteredProducts;
  }, [filteredProducts, selectedSubCategory]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...categoryProducts];
    if (sortBy === "name-asc") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      return list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "price-asc") {
      return list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      return list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "model") {
      return list.sort((a, b) => a.model.localeCompare(b.model));
    }
    return list;
  }, [categoryProducts, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(sortedProducts.length / limit) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * limit;
    return sortedProducts.slice(start, start + limit);
  }, [sortedProducts, currentPage, limit]);

  // Extract unique subcategories from dataset
  const dynamicSubcategories = useMemo(() => {
    const subs = new Map<string, number>();
    for (const p of filteredProducts) {
      if (p.subCategory) {
        subs.set(p.subCategory, (subs.get(p.subCategory) || 0) + 1);
      }
      if (p.tags) {
        for (const t of p.tags.slice(0, 2)) {
          subs.set(t, (subs.get(t) || 0) + 1);
        }
      }
    }
    const list = Array.from(subs.entries()).map(([name, count]) => ({
      name,
      count,
    }));
    return list.slice(0, 8);
  }, [filteredProducts]);

  const refineCategories = [
    {
      name: "Specialty Instruments",
      image: fixAssetUrl("/image/cache/catalog/14-120x120.jpg"),
      count: "125 items",
    },
    {
      name: "Standard Instruments",
      image: fixAssetUrl("/image/cache/catalog/15-120x120.jpg"),
      count: "94 items",
    },
    {
      name: "Liposuction Cannulas",
      image: fixAssetUrl("/image/cache/catalog/lipo-2-120x120.jpg"),
      count: "68 items",
    },
    {
      name: "Suggested Instruments Sets",
      image: fixAssetUrl("/image/cache/catalog/1-120x120.jpg"),
      count: "48 items",
    },
    {
      name: "Electro Surgical",
      image: fixAssetUrl("/image/cache/catalog/2-120x120.jpg"),
      count: "46 items",
    },
    {
      name: "General Surgery",
      image: fixAssetUrl("/image/cache/catalog/3-120x120.jpg"),
      count: "80 items",
    },
  ];

  const pageTitle = searchQuery
    ? `Search Results for "${searchQuery}"`
    : categoryName;

  return (
    <div className="bg-[#f7fafb] py-6 font-roboto">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 bg-white px-4 py-2.5 rounded-lg border border-gray-200/80 shadow-2xs flex-wrap">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1 hover:text-[#218596] transition-colors cursor-pointer font-medium"
          >
            <Home className="w-3.5 h-3.5 text-[#218596]" />
            <span>Home</span>
          </button>
          <span className="text-gray-400">→</span>
          {searchQuery ? (
            <>
              <span className="text-gray-400">Search</span>
              <span className="text-gray-400">→</span>
              <span className="text-gray-800 font-bold truncate max-w-xs">"{searchQuery}"</span>
            </>
          ) : (
            <span className="text-gray-800 font-bold">{categoryName}</span>
          )}
          {selectedSubCategory !== "All" && (
            <>
              <span className="text-gray-400">→</span>
              <span className="text-[#218596] font-bold">{selectedSubCategory}</span>
            </>
          )}
        </div>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-black font-montserrat text-gray-900 tracking-tight">
            {pageTitle}
          </h1>
          <div className="w-14 h-1 bg-[#218596] mt-2.5 mb-4 rounded-full" />
        </div>

        {/* Category Description Banner */}
        <div className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-xs mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-2 font-montserrat uppercase tracking-wide">
            {categoryName} Instruments • Coin Surgical
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Coin Surgical is a leader in manufacturing and exporting precision medical and surgical instruments. Our catalog includes specialized instruments, liposuction cannulas, dissection forceps, needle holders, retractors, and complete procedure sets crafted under stringent ISO, CE, and FDA standards.
          </p>
        </div>

        {/* Refine Search / Subcategories */}
        {!searchQuery && (
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 font-montserrat">
              Refine Search
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {refineCategories.map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => {
                    setSelectedSubCategory(sub.name);
                    setCurrentPage(1);
                  }}
                  className={`bg-white p-3 rounded-xl border transition-all text-center group cursor-pointer shadow-xs flex flex-col items-center justify-between ${
                    selectedSubCategory === sub.name ? "border-2 border-[#218596] ring-2 ring-teal-100 bg-teal-50/20" : "border-gray-200 hover:border-[#218596]"
                  }`}
                >
                  <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center mb-2 overflow-hidden border border-gray-100">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          fixAssetUrl("/image/cache/catalog/N-Products/suggested-sets/set-05-breast-augmentation-instruments-set-70x70.jpg");
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-800 group-hover:text-[#218596] transition-colors block line-clamp-1 font-montserrat">
                    {sub.name}
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5">{sub.count}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main 2-Column Layout (Sidebar + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            {/* Category Tree Box */}
            <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-2 mb-3 font-montserrat">
                Categories
              </h3>
              <ul className="space-y-1 text-xs">
                <li>
                  <button
                    onClick={() => {
                      setSelectedSubCategory("All");
                      setCurrentPage(1);
                    }}
                    className={`w-full flex items-center justify-between py-2 px-2.5 rounded-lg transition-colors text-left cursor-pointer font-medium ${
                      selectedSubCategory === "All"
                        ? "bg-[#218596] text-white font-bold"
                        : "text-gray-700 hover:bg-teal-50"
                    }`}
                  >
                    <span>All {categoryName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      {filteredProducts.length}
                    </span>
                  </button>
                </li>
                {dynamicSubcategories.map((cat) => (
                  <li key={cat.name}>
                    <button
                      onClick={() => {
                        setSelectedSubCategory(cat.name);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between py-2 px-2.5 rounded-lg transition-colors text-left cursor-pointer font-medium ${
                        selectedSubCategory === cat.name
                          ? "bg-[#218596] text-white font-bold"
                          : "text-gray-700 hover:bg-teal-50"
                      }`}
                    >
                      <span className="truncate max-w-[140px]">{cat.name}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          selectedSubCategory === cat.name ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Product Grid Area */}
          <div className="lg:col-span-3">
            {/* Mobile Subcategories Horizontal Pill Filter */}
            {dynamicSubcategories.length > 0 && (
              <div className="lg:hidden mb-4 overflow-x-auto pb-1 flex items-center gap-2 text-xs scrollbar-none">
                <button
                  onClick={() => {
                    setSelectedSubCategory("All");
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full font-montserrat whitespace-nowrap transition-colors cursor-pointer text-xs ${
                    selectedSubCategory === "All"
                      ? "bg-[#218596] text-white font-bold shadow-xs"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  All ({filteredProducts.length})
                </button>
                {dynamicSubcategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setSelectedSubCategory(cat.name);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-full font-montserrat whitespace-nowrap transition-colors cursor-pointer text-xs ${
                      selectedSubCategory === cat.name
                        ? "bg-[#218596] text-white font-bold shadow-xs"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
            )}

            {/* Toolbar (Grid/List + Sort + Limit) */}
            <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Grid / List View Toggle */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-[#218596] text-white border-[#218596]"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    viewMode === "list"
                      ? "bg-[#218596] text-white border-[#218596]"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort By & Show Limit */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <label className="text-gray-600 font-bold font-montserrat text-xs">Sort By:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs bg-white text-gray-700 focus:outline-none focus:border-[#218596] cursor-pointer font-medium"
                  >
                    <option value="default">Default</option>
                    <option value="name-asc">Name (A - Z)</option>
                    <option value="name-desc">Name (Z - A)</option>
                    <option value="price-asc">Price (Low &gt; High)</option>
                    <option value="price-desc">Price (High &gt; Low)</option>
                    <option value="model">Model (A - Z)</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <label className="text-gray-600 font-bold font-montserrat text-xs">Show:</label>
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs bg-white text-gray-700 focus:outline-none focus:border-[#218596] cursor-pointer font-medium"
                  >
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                    <option value={72}>72</option>
                    <option value={96}>96</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Zero Results State */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
                <div className="w-16 h-16 bg-teal-50 text-[#218596] rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-montserrat mb-2">
                  No products found
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto mb-6">
                  {searchQuery
                    ? `No products match your search: "${searchQuery}". Please try searching with terms like cannula, set, forceps, scissors, or retractor.`
                    : `No products registered under "${categoryName}".`}
                </p>
                <button
                  onClick={() => {
                    if (onClearSearch) onClearSearch();
                    setSelectedSubCategory("All");
                  }}
                  className="bg-[#218596] hover:bg-[#174c57] text-white px-6 py-3 rounded-lg font-montserrat font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  See All Products
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* Grid View Mode */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className="bg-white border border-gray-200/80 rounded-xl overflow-hidden group hover:shadow-xl hover:border-[#218596]/40 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Container with Full Card Width Display */}
                        <div
                          className="relative w-full h-56 sm:h-60 bg-white flex items-center justify-center p-3 overflow-hidden cursor-pointer border-b border-gray-100"
                          onClick={() => onSelectProduct(product)}
                        >
                          {product.badge && (
                            <span className="absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full text-white bg-[#174c57] z-10 font-montserrat shadow-xs">
                              {product.badge}
                            </span>
                          )}

                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain group-hover:scale-103 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                fixAssetUrl("/image/cache/catalog/n%20final%20png-5027x2270.png");
                            }}
                          />

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onQuickView(product);
                            }}
                            className="absolute inset-x-4 bottom-3 bg-[#174c57]/90 hover:bg-[#218596] text-white text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-md z-20 font-montserrat font-semibold"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Quick View</span>
                          </button>
                        </div>

                        {/* Card Body */}
                        <div className="p-4">
                          <div className="text-[11px] text-gray-400 mb-1 font-mono">
                            <span>Model: </span>
                            <span className="text-[#218596] font-bold">{product.model}</span>
                          </div>

                          <h3 className="font-montserrat font-bold text-sm text-gray-900 leading-snug line-clamp-2 group-hover:text-[#218596] transition-colors mb-2 min-h-[36px]">
                            <button
                              onClick={() => onSelectProduct(product)}
                              className="text-left hover:underline cursor-pointer"
                            >
                              {product.name}
                            </button>
                          </h3>

                          <div className="flex items-center justify-between mb-2">
                            <span className="font-montserrat font-black text-lg text-[#218596]">
                              {formatPrice(product.price)}
                            </span>

                            {product.originalPrice && (
                              <span className="text-xs text-gray-400 line-through font-montserrat">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions: Luxury WhatsApp Direct Order */}
                      <div className="p-3 bg-gray-50/80 border-t border-gray-100">
                        <a
                          href={getWhatsAppProductUrl(
                            product,
                            undefined,
                            formatPrice(product.price)
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-montserrat font-bold text-xs uppercase tracking-wider py-2.5 px-3 rounded-lg transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.2"
                        >
                          <MessageCircle className="w-4 h-4 fill-white" />
                          <span>Order on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View Mode */
              <div className="space-y-4">
                {paginatedProducts.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className="bg-white border border-gray-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-5 hover:shadow-lg transition-all"
                    >
                      <div
                        className="w-36 h-36 bg-white rounded-lg p-2 shrink-0 flex items-center justify-center cursor-pointer border border-gray-100 overflow-hidden"
                        onClick={() => onSelectProduct(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              fixAssetUrl("/image/cache/catalog/n%20final%20png-5027x2270.png");
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-mono text-[#218596] font-bold">
                          Model: {product.model}
                        </span>
                        <h3 className="font-montserrat font-bold text-base text-gray-900 hover:text-[#218596] transition-colors mb-1.5">
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="text-left cursor-pointer hover:underline"
                          >
                            {product.name}
                          </button>
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                          {product.description}
                        </p>
                        <div className="font-montserrat font-black text-xl text-[#218596]">
                          {formatPrice(product.price)}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 shrink-0 w-full sm:w-48">
                        <a
                          href={getWhatsAppProductUrl(
                            product,
                            undefined,
                            formatPrice(product.price)
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-montserrat font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 fill-white" />
                          <span>Order on WhatsApp</span>
                        </a>

                        <button
                          onClick={() => onSelectProduct(product)}
                          className="w-full bg-gray-50 hover:bg-teal-50 text-[#174c57] hover:text-[#218596] border border-gray-200 hover:border-[#218596] font-montserrat font-bold text-xs uppercase py-2.5 rounded-lg text-center cursor-pointer transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Pagination */}
            <div className="mt-8 bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs flex flex-wrap items-center justify-between text-xs text-gray-600 gap-4">
              <span className="font-medium">
                Showing {(currentPage - 1) * limit + 1} to{" "}
                {Math.min(currentPage * limit, sortedProducts.length)} of {sortedProducts.length} products
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border transition-colors flex items-center justify-center ${
                    currentPage === 1
                      ? "opacity-40 cursor-not-allowed border-gray-200"
                      : "hover:bg-gray-100 cursor-pointer border-gray-300"
                  }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 2 + i;
                    if (pageNum > totalPages) pageNum = totalPages - 4 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer font-montserrat ${
                        currentPage === pageNum
                          ? "bg-[#218596] text-white shadow-xs"
                          : "hover:bg-teal-50 text-gray-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border transition-colors flex items-center justify-center ${
                    currentPage === totalPages
                      ? "opacity-40 cursor-not-allowed border-gray-200"
                      : "hover:bg-gray-100 cursor-pointer border-gray-300"
                  }`}
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
