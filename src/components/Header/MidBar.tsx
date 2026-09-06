import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Menu,
  ChevronDown,
} from "lucide-react";
import {
  NAV_CATEGORIES,
  fixAssetUrl,
} from "../../data/mockData";

interface MidBarProps {
  onNavigate: (page: string, category?: string, search?: string) => void;
  onOpenDrawer: () => void;
}

export const MidBar: React.FC<MidBarProps> = ({ onNavigate, onOpenDrawer }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate("collection", selectedCategory, searchQuery.trim());
  };

  return (
    <div className="bg-white py-3.5 px-4 border-b border-gray-100 font-montserrat">
      <div className="max-w-[1280px] mx-auto">
        {/* Mobile Layout (< md) */}
        <div className="flex md:hidden items-center justify-between gap-3">
          {/* Left: Drawer Toggler */}
          <button
            onClick={onOpenDrawer}
            className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-50 hover:bg-teal-50 text-gray-800 hover:text-[#218596] border border-gray-200 transition-colors cursor-pointer"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5 text-[#218596]" />
            <span className="text-xs font-bold uppercase tracking-wider">Menu</span>
          </button>

          {/* Center: Centered Logo */}
          <div className="flex-1 flex justify-center">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center cursor-pointer focus:outline-none"
              title="Coin Surgical"
            >
              <img
                src={fixAssetUrl("/image/cache/catalog/n%20final%20png-5027x2270.png")}
                alt="Coin Surgical"
                className="h-9 w-auto max-w-[170px] object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fixAssetUrl(
                    "/image/cache/catalog/n%20final%20png-600x315w.png"
                  );
                }}
              />
            </button>
          </div>

          <div className="w-14" /> {/* Visual spacer for centered logo on mobile */}
        </div>

        {/* Desktop Layout (>= md): Classic Left Logo, Center/Right Search Bar */}
        <div className="hidden md:flex items-center justify-between gap-6">
          {/* Left: Coin Surgical Logo */}
          <div className="shrink-0">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center cursor-pointer focus:outline-none"
              title="Coin Surgical"
            >
              <img
                src={fixAssetUrl("/image/cache/catalog/n%20final%20png-5027x2270.png")}
                alt="Coin Surgical"
                className="h-10 lg:h-12 w-auto max-w-[220px] lg:max-w-[260px] object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fixAssetUrl(
                    "/image/cache/catalog/n%20final%20png-600x315w.png"
                  );
                }}
              />
            </button>
          </div>

          {/* Right: Search Bar with Category Dropdown */}
          <div className="w-full max-w-xl lg:max-w-2xl">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-stretch border-2 border-[#218596] rounded overflow-visible bg-white shadow-xs relative"
            >
              {/* Category Select Dropdown */}
              <div className="relative border-r border-gray-200 shrink-0" ref={catRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="h-full px-3 py-2 bg-gray-50 hover:bg-gray-100 text-xs font-semibold text-gray-700 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span className="max-w-[120px] truncate">{selectedCategory}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {isCategoryOpen && (
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
                )}
              </div>

              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search here..."
                className="flex-1 px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent font-roboto"
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
        </div>
      </div>
    </div>
  );
};
