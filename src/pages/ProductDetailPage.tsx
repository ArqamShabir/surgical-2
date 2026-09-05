import React, { useState, useRef, type MouseEvent } from "react";
import {
  Home,
  ShoppingCart,
  Zap,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { ALL_PRODUCTS, type Product } from "../data/mockData";
import { useCurrency } from "../context/CurrencyContext";

interface ProductDetailPageProps {
  product: Product | null;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenQuestion?: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateCollection: (category?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
  onNavigateHome,
  onNavigateCollection,
}) => {
  const { formatPrice, currency } = useCurrency();
  const currentProduct = product || ALL_PRODUCTS[0];

  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(currentProduct.image);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (currentProduct.options) {
      for (const opt of currentProduct.options) {
        if (opt.values && opt.values.length > 0) {
          initial[opt.name] = opt.values[0];
        }
      }
    }
    return initial;
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [bottomTab, setBottomTab] = useState<"recently" | "mostViewed">("recently");

  // Smooth Crisp Zoom & Lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHoverZooming, setIsHoverZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  };

  const handleAddCart = () => {
    onAddToCart(currentProduct, qty);
  };

  const imagesList = currentProduct.images && currentProduct.images.length > 0
    ? currentProduct.images
    : [currentProduct.image];

  const activeImage = selectedImage || currentProduct.image;
  const currentImageIdx = imagesList.indexOf(activeImage);

  const bottomStripProducts = ALL_PRODUCTS.slice(4, 8);

  return (
    <div className="bg-[#f7fafb] py-6 font-roboto">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 bg-white px-4 py-2.5 rounded-lg border border-gray-200/80 shadow-2xs flex-wrap">
          <button
            onClick={onNavigateHome}
            className="text-gray-500 hover:text-[#218596] transition-colors cursor-pointer flex items-center gap-1 font-medium"
          >
            <Home className="w-3.5 h-3.5 text-[#218596]" />
            <span>Home</span>
          </button>
          <span className="text-gray-400">→</span>
          <button
            onClick={() => onNavigateCollection(currentProduct.category || "Plastic Surgery")}
            className="hover:text-[#218596] transition-colors cursor-pointer font-medium"
          >
            {currentProduct.category || "Plastic Surgery"}
          </button>
          {currentProduct.subCategory && (
            <>
              <span className="text-gray-400">→</span>
              <button
                onClick={() => onNavigateCollection(currentProduct.subCategory)}
                className="hover:text-[#218596] transition-colors cursor-pointer font-medium"
              >
                {currentProduct.subCategory}
              </button>
            </>
          )}
          <span className="text-gray-400">→</span>
          <span className="text-gray-800 font-bold truncate max-w-xs">{currentProduct.name}</span>
        </div>

        {/* Product Main Showcase Section (2-Column Grid) */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Product Image Container with Crisp Natural Magnifier & Lightbox */}
            <div>
              <div
                ref={imageContainerRef}
                onMouseEnter={() => setIsHoverZooming(true)}
                onMouseLeave={() => setIsHoverZooming(false)}
                onMouseMove={handleMouseMove}
                onClick={() => setIsLightboxOpen(true)}
                className="relative bg-white rounded-xl border border-gray-200 aspect-square w-full flex items-center justify-center overflow-hidden cursor-crosshair group shadow-inner"
              >
                {/* Regular Image */}
                <img
                  src={activeImage}
                  alt={currentProduct.name}
                  className={`w-full h-full object-contain p-4 transition-transform duration-200 ${
                    isHoverZooming ? "opacity-0" : "opacity-100"
                  }`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/image/cache/catalog/n%20final%20png-5027x2270.png";
                  }}
                />

                {/* Hover Lens Zoom - Adjusted from 260% to 135% to avoid extreme pixelation */}
                {isHoverZooming && (
                  <div
                    className="absolute inset-0 w-full h-full bg-no-repeat pointer-events-none"
                    style={{
                      backgroundImage: `url('${activeImage}')`,
                      backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      backgroundSize: "135%",
                    }}
                  />
                )}

                {/* Zoom Fullscreen Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  className="absolute top-3 right-3 bg-white/95 hover:bg-[#218596] hover:text-white text-gray-700 p-2.5 rounded-full border border-gray-200 shadow-md transition-all cursor-pointer z-10"
                  title="Click para ampliar imagen"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <div className="absolute bottom-2.5 right-3 bg-gray-900/70 text-white text-[10px] px-2.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium">
                  Pase el cursor para ampliar o haga clic
                </div>
              </div>

              {/* Thumbnails Gallery */}
              {imagesList.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                  {imagesList.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-18 h-18 rounded-lg border p-1 bg-white shrink-0 flex items-center justify-center cursor-pointer transition-all ${
                        activeImage === img ? "border-2 border-[#218596] shadow-sm scale-102" : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${currentProduct.name} ${idx + 1}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Tags Under Image */}
              {currentProduct.tags && currentProduct.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-gray-700 font-montserrat">Etiquetas:</span>
                  {currentProduct.tags.map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => onNavigateCollection(tag)}
                      className="bg-[#174c57] text-white text-[11px] font-medium px-3 py-1 rounded-full cursor-pointer hover:bg-[#218596] transition-colors shadow-2xs"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col justify-between h-full">
              <div>
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-black font-montserrat text-gray-900 tracking-tight leading-snug mb-3">
                  {currentProduct.name}
                </h1>

                {/* Model & Availability */}
                <div className="flex items-center gap-4 text-xs mb-4 pb-3 border-b border-gray-100 font-mono">
                  <span className="text-gray-500">
                    Model: <strong className="text-[#218596]">{currentProduct.model}</strong>
                  </span>
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    In Stock • Certified Quality
                  </span>
                </div>

                {/* Price Row */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl md:text-4xl font-black font-montserrat text-[#218596]">
                    {formatPrice(currentProduct.price)}
                  </span>
                  {currentProduct.originalPrice && (
                    <span className="text-base text-gray-400 line-through font-montserrat">
                      {formatPrice(currentProduct.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-gray-500 font-medium">
                    (Unit price in {currency.code})
                  </span>
                </div>

                {/* Description Text */}
                <div className="mb-6 bg-gray-50/70 p-4 rounded-xl border border-gray-200/60">
                  <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-[#174c57] block mb-2">
                    Product Description:
                  </span>
                  <div className="text-xs text-gray-700 leading-relaxed">
                    <p className={isExpanded ? "" : "line-clamp-4"}>
                      {currentProduct.description}
                    </p>
                    {currentProduct.description.length > 150 && (
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="inline-flex items-center gap-1 text-[#218596] hover:text-[#174c57] text-xs font-bold mt-2 cursor-pointer transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5" />
                            <span>Show Less</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5" />
                            <span>Show More</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Dynamic Variants / Options */}
                {currentProduct.options && currentProduct.options.length > 0 && (
                  <div className="space-y-4 mb-6">
                    {currentProduct.options.map((opt) => (
                      <div key={opt.name}>
                        <label className="block text-xs font-bold text-gray-800 mb-2 font-montserrat">
                          {opt.name} <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {opt.values.map((val) => {
                            const isSelected = selectedOptions[opt.name] === val;
                            return (
                              <button
                                key={val}
                                onClick={() => handleOptionSelect(opt.name, val)}
                                className={`px-4 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#218596] text-white border-[#218596] shadow-xs font-bold scale-102"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-[#218596]"
                                }`}
                              >
                                {val}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons: Stepper + Add To Cart + Attractive Buy Now Button */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  {/* Stepper with Up/Down buttons */}
                  <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden h-12 bg-white shrink-0 justify-between px-2">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="px-3 hover:bg-gray-100 h-full flex items-center justify-center cursor-pointer text-gray-600 font-bold text-sm"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={qty}
                      className="w-10 text-center text-sm font-bold text-gray-900 focus:outline-none font-montserrat"
                    />
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="px-3 hover:bg-gray-100 h-full flex items-center justify-center cursor-pointer text-gray-600 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddCart}
                    className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-teal-50 text-[#218596] border-2 border-[#218596] h-12 px-5 rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#218596]" />
                    <span>ADD TO CART</span>
                  </button>

                  {/* Attractive, Modern Buy Now Button */}
                  <button
                    onClick={handleAddCart}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#218596] to-[#174c57] hover:from-[#1b7180] hover:to-[#133f48] text-white h-12 px-6 rounded-xl font-montserrat font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Zap className="w-4 h-4 text-teal-200 fill-teal-200" />
                    <span>BUY NOW</span>
                  </button>
                </div>

                {/* Value Guarantee Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100 text-[11px] text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#218596] shrink-0" />
                    <span>German Steel Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#218596] shrink-0" />
                    <span>Secure Worldwide Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-[#218596] shrink-0" />
                    <span>Personalized Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: RECENTLY VIEWED | MOST VIEWED */}
        <div className="bg-[#174c57] rounded-2xl p-6 mb-8 text-white shadow-md">
          {/* Tabs */}
          <div className="flex border-b border-teal-600/40 gap-6 mb-5 text-xs font-montserrat font-bold">
            <button
              onClick={() => setBottomTab("recently")}
              className={`pb-2.5 uppercase tracking-wider cursor-pointer border-b-2 transition-colors ${
                bottomTab === "recently"
                  ? "border-[#2bb5cb] text-white"
                  : "border-transparent text-teal-200/70 hover:text-white"
              }`}
            >
              Recently Viewed
            </button>
            <button
              onClick={() => setBottomTab("mostViewed")}
              className={`pb-2.5 uppercase tracking-wider cursor-pointer border-b-2 transition-colors ${
                bottomTab === "mostViewed"
                  ? "border-[#2bb5cb] text-white"
                  : "border-transparent text-teal-200/70 hover:text-white"
              }`}
            >
              Most Popular
            </button>
          </div>

          {/* 4 Mini Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bottomStripProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl p-3 flex items-center gap-3 text-gray-900 shadow-sm hover:shadow-lg transition-all group"
              >
                <div
                  className="w-16 h-16 bg-gray-50 rounded-lg p-1 border border-gray-200 shrink-0 flex items-center justify-center cursor-pointer overflow-hidden"
                  onClick={() => onSelectProduct(p)}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/image/cache/catalog/n%20final%20png-5027x2270.png";
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-montserrat font-semibold text-[11px] text-gray-800 truncate">
                    <button
                      onClick={() => onSelectProduct(p)}
                      className="text-left hover:text-[#218596] transition-colors"
                    >
                      {p.name}
                    </button>
                  </h4>
                  <div className="font-montserrat font-bold text-xs text-[#218596] mt-0.5">
                    {formatPrice(p.price)}
                  </div>

                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      onClick={() => onAddToCart(p, 1)}
                      className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#174c57] hover:text-[#218596] transition-colors cursor-pointer"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Zoom Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 bg-white/10 hover:bg-white text-white hover:text-gray-900 p-2.5 rounded-full transition-colors cursor-pointer z-50 shadow-lg"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Image Arrow */}
          {imagesList.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const prevIdx = (currentImageIdx - 1 + imagesList.length) % imagesList.length;
                setSelectedImage(imagesList[prevIdx]);
              }}
              className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white text-white hover:text-gray-900 p-3.5 rounded-full transition-colors cursor-pointer z-50 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Image Arrow */}
          {imagesList.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const nextIdx = (currentImageIdx + 1) % imagesList.length;
                setSelectedImage(imagesList[nextIdx]);
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white text-white hover:text-gray-900 p-3.5 rounded-full transition-colors cursor-pointer z-50 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Lightbox Image View */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt={currentProduct.name}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl bg-white p-4"
            />
            <div className="text-white text-center mt-3 font-montserrat font-bold text-sm tracking-wide">
              {currentProduct.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
