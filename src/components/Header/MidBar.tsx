import React, { useState } from "react";
import { Search, ShoppingBag, ChevronDown } from "lucide-react";
import { NAV_CATEGORIES, fixAssetUrl } from "../../data/mockData";
import { useCurrency } from "../../context/CurrencyContext";

interface MidBarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onNavigate: (page: string, category?: string, search?: string) => void;
}

export const MidBar: React.FC<MidBarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onNavigate,
}) => {
  const { formatPrice } = useCurrency();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate("collection", selectedCategory, searchQuery.trim());
  };

  return (
    <div className="bg-white py-4 px-4 border-b border-gray-100">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Original Notrox Instruments Logo */}
        <div className="shrink-0">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center cursor-pointer focus:outline-none"
            title="Coin Surgical"
          >
            <img
              src={fixAssetUrl("/image/cache/catalog/n%20final%20png-5027x2270.png")}
              alt="Coin Surgical"
              className="h-10 sm:h-12 w-auto max-w-[200px] sm:max-w-[240px] object-contain"
              onError={(e) => {
                // Fallback to text + icon
                (e.target as HTMLImageElement).src =
                  fixAssetUrl("/image/cache/catalog/n%20final%20png-600x315w.png");
              }}
            />
          </button>
        </div>

        {/* Center: Classic Journal 3 Search Bar with Category Dropdown */}
        <div className="w-full md:max-w-xl lg:max-w-2xl">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-stretch border-2 border-[#218596] rounded overflow-visible bg-white shadow-xs relative"
          >
            {/* Category Select Dropdown */}
            <div className="relative border-r border-gray-200 hidden sm:block shrink-0">
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="h-full px-3 py-2 bg-gray-50 hover:bg-gray-100 text-xs font-semibold text-gray-700 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span className="max-w-[120px] truncate">{selectedCategory}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {isCategoryOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsCategoryOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 shadow-xl rounded py-1 z-50 max-h-64 overflow-y-auto text-xs font-roboto">
                    {NAV_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsCategoryOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-teal-50 hover:text-[#218596] transition-colors cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-teal-50 font-bold text-[#218596]"
                            : "text-gray-700"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search here..."
              className="flex-1 px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
            />

            {/* Search Button */}
            <button
              type="submit"
              className="bg-[#218596] hover:bg-[#174c57] text-white px-5 py-2 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right: Classic Cart Widget */}
        <div className="shrink-0 flex items-center">
          <button
            onClick={onOpenCart}
            className="flex items-center gap-3 p-2 bg-gray-50 hover:bg-teal-50/50 border border-gray-200 hover:border-[#218596] rounded transition-all cursor-pointer group"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded bg-[#218596] text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="absolute -top-1.5 -right-1.5 bg-[#e96631] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-montserrat shadow-xs">
                {cartCount}
              </span>
            </div>

            <div className="text-left font-montserrat text-xs leading-tight">
              <span className="text-[11px] text-gray-500 block font-medium">Shopping Cart</span>
              <span className="font-bold text-[#218596] text-xs">
                {cartCount} item(s) - {formatPrice(cartTotal)}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
