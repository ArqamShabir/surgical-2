import React, { useState } from "react";
import { Home, ChevronRight, CheckCircle2, ShoppingBag, Truck, CreditCard, ArrowLeft, Trash2 } from "lucide-react";
import type { CartItem } from "../components/Modals/CartDrawer";
import { useCurrency } from "../context/CurrencyContext";

interface CheckoutPageProps {
  items: CartItem[];
  onUpdateQty: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigateHome: () => void;
  onClearCart: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  onUpdateQty,
  onRemoveItem,
  onNavigateHome,
  onClearCart,
}) => {
  const { formatPrice } = useCurrency();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    address: "",
    city: "",
    postcode: "",
    country: "United States",
    zone: "California",
    shippingMethod: "standard",
    paymentMethod: "credit_card",
    comment: "",
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 2000 || items.length === 0 ? 0 : 45.0;
  const total = subtotal + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = "COIN-" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(generatedOrderNum);
    setOrderComplete(true);
    onClearCart();
  };

  if (orderComplete) {
    return (
      <div className="bg-[#f8f8f8] py-12">
        <div className="max-w-2xl mx-auto px-4 text-center bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold font-montserrat text-gray-900 mb-2">
            Your Order Has Been Placed!
          </h1>
          <p className="text-sm font-semibold text-[#218596] mb-4">
            Order Reference: {orderNumber}
          </p>
          <p className="text-xs text-gray-600 leading-relaxed mb-6">
            Thank you for ordering with Coin Surgical. A confirmation email with details of your
            surgical instruments order has been sent to <strong>{formData.email || "your email"}</strong>.
            Our team will dispatch your consignment promptly.
          </p>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 bg-[#218596] hover:bg-[#174c57] text-white px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Store</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f8f8] py-6">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1 hover:text-[#218596] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-semibold">Checkout</span>
        </div>

        <h1 className="text-2xl font-bold font-montserrat text-gray-900 mb-6">
          Checkout
        </h1>

        {items.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-lg border border-gray-200 shadow-sm space-y-4">
            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto stroke-1" />
            <p className="text-sm font-semibold text-gray-700">Your shopping cart is currently empty!</p>
            <button
              onClick={onNavigateHome}
              className="bg-[#218596] hover:bg-[#174c57] text-white text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Details & Method */}
              <div className="lg:col-span-2 space-y-6">
                {/* 1. Customer & Delivery Details */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 pb-3 mb-4 border-b border-gray-200 font-montserrat">
                    1. Customer & Delivery Address
                  </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#218596]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#218596]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">E-Mail *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#218596]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Telephone / WhatsApp *</label>
                      <input
                        type="text"
                        name="telephone"
                        required
                        value={formData.telephone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#218596]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-gray-700 mb-1">Address *</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Clinic / Hospital name & Street address"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#218596]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#218596]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Country *</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-[#218596]"
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Germany">Germany</option>
                        <option value="Australia">Australia</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. Shipping & Payment Method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 pb-2 mb-3 border-b border-gray-200 font-montserrat flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#218596]" />
                      <span>Shipping Method</span>
                    </h3>

                    <div className="space-y-2 text-xs">
                      <label className="flex items-start gap-2 p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === "standard"}
                          onChange={handleChange}
                          className="mt-0.5"
                        />
                        <div>
                          <span className="font-semibold block">Standard Courier Express</span>
                          <span className="text-gray-500 text-[11px]">3-5 Business Days (${shippingFee.toFixed(2)})</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 pb-2 mb-3 border-b border-gray-200 font-montserrat flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#218596]" />
                      <span>Payment Method</span>
                    </h3>

                    <div className="space-y-2 text-xs">
                      <label className="flex items-start gap-2 p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit_card"
                          checked={formData.paymentMethod === "credit_card"}
                          onChange={handleChange}
                          className="mt-0.5"
                        />
                        <div>
                          <span className="font-semibold block">Credit / Debit Card</span>
                          <span className="text-gray-500 text-[11px]">Visa, Mastercard, Amex</span>
                        </div>
                      </label>

                      <label className="flex items-start gap-2 p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="whatsapp"
                          checked={formData.paymentMethod === "whatsapp"}
                          onChange={handleChange}
                          className="mt-0.5"
                        />
                        <div>
                          <span className="font-semibold block">WhatsApp Direct Order</span>
                          <span className="text-gray-500 text-[11px]">Confirm & Pay via WhatsApp Support</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Col: Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-24 space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 pb-3 border-b border-gray-200 font-montserrat">
                    Order Summary
                  </h2>

                  {/* Items List */}
                  <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 pr-1 space-y-3">
                    {items.map(({ product, quantity }) => (
                      <div key={product.id} className="pt-3 flex items-center gap-3 text-xs">
                        <div className="w-12 h-12 bg-gray-50 rounded p-1 border border-gray-200 shrink-0 flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 truncate">{product.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-500 text-[11px]">
                              {quantity} x {formatPrice(product.price)}
                            </span>
                            <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden h-5">
                              <button
                                type="button"
                                onClick={() => onUpdateQty(product.id, Math.max(1, quantity - 1))}
                                className="px-1 text-[10px] hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="px-1 text-[10px] font-semibold">{quantity}</span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(product.id, quantity + 1)}
                                className="px-1 text-[10px] hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(product.id)}
                              className="text-gray-400 hover:text-red-500 p-0.5"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="font-bold font-montserrat text-gray-900 text-right">
                          {formatPrice(product.price * quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals Calculation */}
                  <div className="border-t border-gray-200 pt-3 space-y-1.5 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span className="font-semibold font-montserrat text-gray-900">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping Rate:</span>
                      <span className="font-semibold font-montserrat text-gray-900">
                        {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-gray-900 border-t border-gray-200 pt-2 mt-2">
                      <span>Total:</span>
                      <span className="text-lg font-montserrat text-[#218596]">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#218596] hover:bg-[#174c57] text-white font-bold text-xs uppercase tracking-wider py-3 rounded transition-colors shadow cursor-pointer mt-4"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
