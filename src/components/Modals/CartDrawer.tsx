import React from "react";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import type { Product } from "../../data/mockData";
import { useCurrency } from "../../context/CurrencyContext";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout,
}) => {
  const { formatPrice } = useCurrency();
  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop overlay */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 transform transition-transform duration-300 ease-out z-10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#218596]" />
            <h2 className="font-montserrat font-bold text-lg text-gray-900">Your Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center text-gray-400 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
              <p className="text-sm font-medium font-montserrat">Your shopping cart is empty!</p>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-100"
              >
                <div className="w-16 h-16 bg-white rounded p-1 border border-gray-200 flex items-center justify-center shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-800 line-clamp-1 font-montserrat">
                    {product.name}
                  </h4>
                  <span className="text-xs font-semibold text-[#218596] block mt-0.5">
                    {formatPrice(product.price)}
                  </span>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden h-7">
                      <button
                        onClick={() => onUpdateQty(product.id, Math.max(1, quantity - 1))}
                        className="px-2 text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-semibold">{quantity}</span>
                      <button
                        onClick={() => onUpdateQty(product.id, quantity + 1)}
                        className="px-2 text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right font-montserrat font-bold text-xs text-gray-900">
                  {formatPrice(product.price * quantity)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 pt-4 space-y-4">
            <div className="flex justify-between items-center text-sm font-semibold text-gray-900">
              <span>Subtotal:</span>
              <span className="text-lg font-bold font-montserrat text-[#218596]">
                {formatPrice(total)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold py-2.5 rounded transition-colors text-center cursor-pointer font-montserrat uppercase tracking-wider"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  onClose();
                  onProceedCheckout();
                }}
                className="w-full bg-[#218596] hover:bg-[#174c57] text-white text-xs font-semibold uppercase tracking-wider py-2.5 rounded transition-colors text-center flex items-center justify-center gap-1 cursor-pointer shadow-sm font-montserrat"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
