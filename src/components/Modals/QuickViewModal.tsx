import React, { useState } from "react";
import { X, ShoppingCart, Check, Zap } from "lucide-react";
import { fixAssetUrl, type Product } from "../../data/mockData";
import { useCurrency } from "../../context/CurrencyContext";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const { formatPrice } = useCurrency();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const handleBuyNow = () => {
    onAddToCart(product, qty);
    onClose();
    window.location.href = `/product/${product.id}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-5 sm:p-6 md:p-8 text-gray-900 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 border border-gray-100 font-roboto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer z-10 bg-white/80 backdrop-blur-xs"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Image */}
          <div className="bg-white rounded-xl p-4 flex items-center justify-center border border-gray-200 h-64 sm:h-72 md:h-80 overflow-hidden">
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

          {/* Details */}
          <div className="flex flex-col justify-between h-full space-y-4 md:space-y-0">
            <div>
              <span className="text-xs font-mono text-[#218596] font-bold uppercase tracking-wider block mb-1">
                Model: {product.model}
              </span>
              <h2 className="font-montserrat font-bold text-lg sm:text-xl text-gray-900 mb-2 leading-snug">
                {product.name}
              </h2>

              <div className="text-xl sm:text-2xl font-black font-montserrat text-[#218596] mb-3">
                {formatPrice(product.price)}
              </div>

              <p className="text-xs text-gray-600 leading-relaxed mb-4 md:mb-6 line-clamp-4">
                {product.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 sm:pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {/* Stepper */}
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-10 bg-white">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 text-gray-600 hover:bg-gray-100 h-full flex items-center justify-center font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 text-gray-600 hover:bg-gray-100 h-full flex items-center justify-center font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 flex items-center justify-center gap-2 h-10 px-4 rounded-lg font-montserrat font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                    added
                      ? "bg-emerald-600 text-white"
                      : "bg-white border-2 border-[#218596] text-[#218596] hover:bg-teal-50"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 text-[#218596]" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* Attractive Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-[#218596] to-[#174c57] hover:from-[#1b7180] hover:to-[#133f48] text-white font-montserrat font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-teal-200 fill-teal-200" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
