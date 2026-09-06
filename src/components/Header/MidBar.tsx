import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Menu,
  ChevronDown,
  Globe,
  DollarSign,
  MessageCircle,
} from "lucide-react";
import {
  NAV_CATEGORIES,
  fixAssetUrl,
  WHATSAPP_PHONE,
} from "../../data/mockData";
import { useCurrency } from "../../context/CurrencyContext";

interface MidBarProps {
  onNavigate: (page: string, category?: string, search?: string) => void;
  onOpenDrawer: () => void;
}

export const MidBar: React.FC<MidBarProps> = ({ onNavigate, onOpenDrawer }) => {
  const { currency, setCurrency, language, setLanguage, currencies, languages } =
    useCurrency();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const currencyRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
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

          {/* Right: Direct WhatsApp Chat button */}
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all shadow-xs flex items-center justify-center cursor-pointer"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>

        {/* Desktop Layout (>= md): 3-Column Balanced Luxury Grid */}
        <div className="hidden md:grid md:grid-cols-12 items-center gap-4">
          {/* Left Column: Search Bar (col-span-4) */}
          <div className="col-span-4">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-stretch border border-gray-300 hover:border-[#218596] focus-within:border-[#218596] rounded-lg overflow-visible bg-white shadow-2xs transition-colors relative"
            >
              {/* Category Select Dropdown */}
              <div className="relative border-r border-gray-200 shrink-0" ref={catRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="h-full px-3 py-2 bg-gray-50 hover:bg-gray-100 text-[11px] font-semibold text-gray-700 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span className="max-w-[100px] truncate">{selectedCategory}</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-200 shadow-2xl rounded-lg py-1 z-50 max-h-60 overflow-y-auto text-xs font-roboto">
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
                placeholder="Search instruments, models..."
                className="flex-1 px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent font-roboto"
              />

              {/* Search Submit Button */}
              <button
                type="submit"
                className="bg-[#218596] hover:bg-[#174c57] text-white px-3.5 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Center Column: Centered High-End Logo (col-span-4) */}
          <div className="col-span-4 flex justify-center">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center cursor-pointer focus:outline-none group"
              title="Coin Surgical"
            >
              <img
                src={fixAssetUrl("/image/cache/catalog/n%20final%20png-5027x2270.png")}
                alt="Coin Surgical"
                className="h-11 lg:h-12 w-auto max-w-[240px] object-contain group-hover:opacity-95 transition-opacity"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fixAssetUrl(
                    "/image/cache/catalog/n%20final%20png-600x315w.png"
                  );
                }}
              />
            </button>
          </div>

          {/* Right Column: Currency + Language + WhatsApp Contact (col-span-4) */}
          <div className="col-span-4 flex items-center justify-end gap-2.5">
            {/* Currency Selector Dropdown */}
            <div className="relative" ref={currencyRef}>
              <button
                onClick={() => {
                  setIsCurrencyOpen(!isCurrencyOpen);
                  setIsLangOpen(false);
                }}
                className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-800 px-3 py-2 rounded-lg border border-gray-200 hover:border-[#218596] cursor-pointer transition-all shadow-2xs text-xs font-semibold"
                title="Select Currency"
              >
                <DollarSign className="w-3.5 h-3.5 text-[#218596]" />
                <span className="text-gray-900">{currency.code}</span>
                <ChevronDown
                  className={`w-3 h-3 text-gray-400 transition-transform ${
                    isCurrencyOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCurrencyOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl py-1 z-50 min-w-[150px] overflow-hidden animate-fadeIn">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setCurrency(curr);
                        setIsCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 hover:text-[#218596] transition-colors cursor-pointer ${
                        currency.code === curr.code
                          ? "text-[#218596] font-bold bg-teal-50/60"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{curr.label}</span>
                      {currency.code === curr.code && (
                        <span className="text-[10px] text-[#218596] font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => {
                  setIsLangOpen(!isLangOpen);
                  setIsCurrencyOpen(false);
                }}
                className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-800 px-3 py-2 rounded-lg border border-gray-200 hover:border-[#218596] cursor-pointer transition-all shadow-2xs text-xs font-semibold"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#218596]" />
                <span className="text-gray-900 max-w-[80px] truncate">{language.label}</span>
                <ChevronDown
                  className={`w-3 h-3 text-gray-400 transition-transform ${
                    isLangOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl py-1 z-50 min-w-[140px] overflow-hidden animate-fadeIn">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 hover:text-[#218596] transition-colors cursor-pointer ${
                        language.code === lang.code
                          ? "text-[#218596] font-bold bg-teal-50/60"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{lang.label}</span>
                      {language.code === lang.code && (
                        <span className="text-[10px] text-[#218596] font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct WhatsApp Ordering / Inquire Button */}
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:shadow-md cursor-pointer shrink-0"
              title="Chat with us"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="hidden xl:inline">WhatsApp Inquiries</span>
              <span className="xl:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
