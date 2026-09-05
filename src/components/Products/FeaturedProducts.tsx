import React, { useState } from "react";
import { Star, ShoppingCart, Eye, Check, ArrowRight, Zap } from "lucide-react";
import { FEATURED_PRODUCTS, type Product } from "../../data/mockData";
import { useCurrency } from "../../context/CurrencyContext";

interface FeaturedProductsProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
  onOpenQuestion?: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateCollection: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onAddToCart,
  onQuickView,
  onSelectProduct,
  onNavigateCollection,
}) => {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<"featured" | "latest" | "bestsellers" | "specials">("featured");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const products = FEATURED_PRODUCTS[activeTab] || [];

  const handleQtyChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleAddCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    onAddToCart(product, qty);
    setAddedNotice(product.id);
    setTimeout(() => setAddedNotice(null), 2000);
  };

  const tabLabels = {
    featured: "FEATURED",
    latest: "LATEST",
    bestsellers: "BESTSELLERS",
    specials: "SPECIALS",
  };

  return (
    <section className="py-12 bg-[#f7fafb]">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-black font-montserrat text-gray-900 tracking-tight uppercase">
            Featured Products
          </h2>
          <div className="w-14 h-1 bg-[#218596] mx-auto mt-2.5 mb-3 rounded-full" />
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-roboto">
            If you are not able to find the special instruments you need, our team is ready to assist you. Find the high-quality instruments required for delicate and complex plastic surgery procedures.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {(["featured", "latest", "bestsellers", "specials"] as const).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`px-5 py-2 text-xs font-bold font-montserrat uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeTab === tabKey
                  ? "bg-[#218596] text-white shadow-md scale-102"
                  : "bg-white text-gray-700 hover:bg-teal-50 hover:text-[#218596] border border-gray-200"
              }`}
            >
              {tabLabels[tabKey]}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div
          key={activeTab}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-200"
        >
          {products.map((product) => {
            const qty = quantities[product.id] || 1;
            const isAdded = addedNotice === product.id;

            return (
              <div
                key={`${activeTab}-${product.id}`}
                className="bg-white border border-gray-200/80 rounded-xl overflow-hidden group hover:shadow-xl hover:border-[#218596]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Full-width Image Container (without weird clipping / excessive zoom) */}
                  <div
                    className="relative w-full h-56 sm:h-60 bg-white flex items-center justify-center p-3 overflow-hidden cursor-pointer border-b border-gray-100"
                    onClick={() => onSelectProduct(product)}
                  >
                    {/* Badge */}
                    {product.badge && (
                      <span
                        className={`absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full text-white shadow-xs z-10 font-montserrat ${
                          product.badge === "Hot"
                            ? "bg-[#218596]"
                            : product.badge === "Sale"
                            ? "bg-amber-600"
                            : "bg-[#174c57]"
                        }`}
                      >
                        {product.discount ? product.discount : product.badge}
                      </span>
                    )}

                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-103 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/image/cache/catalog/n%20final%20png-5027x2270.png";
                      }}
                    />

                    {/* Quickview Button on Hover */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="absolute inset-x-4 bottom-3 bg-[#174c57]/90 hover:bg-[#218596] text-white text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-lg z-20 font-montserrat font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    {/* Model Info */}
                    <div className="text-[11px] text-gray-400 mb-1 font-mono">
                      <span>Model: </span>
                      <span className="text-[#218596] font-bold">{product.model}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-montserrat font-bold text-sm text-gray-900 leading-snug line-clamp-2 group-hover:text-[#218596] transition-colors mb-2 min-h-[40px]">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="text-left hover:underline cursor-pointer"
                      >
                        {product.name}
                      </button>
                    </h3>

                    {/* Price and Rating */}
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        {product.originalPrice ? (
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-montserrat font-black text-lg text-[#218596]">
                              {formatPrice(product.price)}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-montserrat font-black text-lg text-gray-900">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>

                      {/* Stars */}
                      <div className="flex text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= product.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-200 fill-gray-100"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Stepper + Add to Cart + Attractive Buy Now Button */}
                <div className="p-3.5 bg-gray-50/80 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden h-9">
                      <button
                        type="button"
                        onClick={() => handleQtyChange(product.id, -1)}
                        className="px-2.5 text-gray-500 hover:bg-gray-100 h-full flex items-center justify-center text-xs cursor-pointer font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-semibold text-gray-800">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQtyChange(product.id, 1)}
                        className="px-2.5 text-gray-500 hover:bg-gray-100 h-full flex items-center justify-center text-xs cursor-pointer font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddCart(product)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-montserrat font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isAdded
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-white border border-[#218596] text-[#218596] hover:bg-teal-50 shadow-2xs"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5 text-[#218596]" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Attractive, Prominent BUY NOW Button */}
                  <button
                    onClick={() => {
                      handleAddCart(product);
                      onSelectProduct(product);
                    }}
                    className="w-full bg-gradient-to-r from-[#218596] to-[#174c57] hover:from-[#1b7180] hover:to-[#133f48] text-white font-montserrat font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.2"
                  >
                    <Zap className="w-3.5 h-3.5 text-teal-200 fill-teal-200" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Action Button */}
        <div className="text-center mt-10">
          <button
            onClick={onNavigateCollection}
            className="inline-flex items-center gap-2 bg-[#218596] hover:bg-[#174c57] text-white font-montserrat font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>SEE ALL PRODUCTS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
