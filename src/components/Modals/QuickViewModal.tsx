import React from "react";
import { X, Zap, ArrowRight } from "lucide-react";
import {
  fixAssetUrl,
  getWhatsAppProductUrl,
  type Product,
} from "../../data/mockData";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onSelectProduct,
}) => {
  if (!product) return null;

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

              <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-3">
                Premium Surgical Grade Stainless Steel
              </div>

              <p className="text-xs text-gray-600 leading-relaxed mb-4 md:mb-6 line-clamp-4">
                {product.description}
              </p>
            </div>

            <div className="space-y-2.5 pt-3 sm:pt-4 border-t border-gray-100">
              {/* Buy Now (WhatsApp) */}
              <a
                href={getWhatsAppProductUrl(product)}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-gradient-to-r from-[#218596] to-[#174c57] hover:from-[#174c57] hover:to-[#0f343c] text-white font-montserrat font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer transform hover:scale-102"
              >
                <Zap className="w-4 h-4 text-teal-200 fill-teal-200" />
                <span>Buy Now</span>
              </a>

              {/* View Full Product Details */}
              {onSelectProduct && (
                <button
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="w-full bg-gray-50 hover:bg-teal-50 text-[#174c57] hover:text-[#218596] border border-gray-200 hover:border-[#218596] font-montserrat font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Full Product Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
