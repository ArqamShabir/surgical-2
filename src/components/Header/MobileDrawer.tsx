import React, { useState } from "react";
import {
  X,
  Search,
  ChevronRight,
  ChevronDown,
  Globe,
  DollarSign,
  Phone,
  Mail,
  Home,
  BookOpen,
  Layers,
  Users,
  MessageCircle,
} from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import {
  DISPLAY_PHONE,
  WHATSAPP_PHONE,
  fixAssetUrl,
} from "../../data/mockData";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, category?: string, search?: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { currency, setCurrency, language, setLanguage, currencies, languages } =
    useCurrency();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCat, setExpandedCat] = useState<string | null>("Plastic Surgery");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate("collection", "All", searchQuery.trim());
      onClose();
    }
  };

  const categoriesTree: Record<string, string[]> = {
    "Plastic Surgery": [
      "Specialty Instruments",
      "Standard Instruments",
      "Liposuction Cannulas",
      "Areola Markers",
      "Breast Retractors",
      "Rhinoplasty Instruments",
      "Cartilage And Bone Instruments",
      "Dissectors and Elevators",
    ],
    "General Surgery": [
      "Abdominal Retractors",
      "Balfour Abdominal Retractors",
      "Dermatology Instruments",
      "Biopsy Punches",
      "Dermal Curettes",
    ],
    "Electro Surgical": [
      "Bipolar Forceps, Straight",
      "Bipolar Forceps, Bayonet",
      "Non-Stick Bipolar Forceps",
      "Monopolar & Bipolar Cables",
      "Electrosurgical Pencils",
    ],
    "Maxillofacial Instruments": [
      "Maxilla Mobilizer",
      "Mouth Gags",
      "Mucosa Knives",
    ],
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-montserrat">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel */}
      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col z-50 transform transition-transform animate-in slide-in-from-left duration-300">
          {/* Drawer Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#11161a] text-white">
            <div className="flex items-center gap-2.5">
              <img
                src={fixAssetUrl("/image/cache/catalog/n%20final%20png-5027x2270.png")}
                alt="Coin Surgical"
                className="h-7 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fixAssetUrl(
                    "/image/cache/catalog/n%20final%20png-600x315w.png"
                  );
                }}
              />
              <span className="text-xs font-bold tracking-wider uppercase text-teal-300">
                Menu
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {/* 1. Search Bar */}
            <div className="p-4 bg-gray-50/70">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search surgical instruments..."
                  className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#218596] shadow-2xs font-roboto"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bg-[#218596] text-white px-2.5 py-1 rounded text-[11px] font-semibold hover:bg-[#174c57] transition-colors"
                >
                  Go
                </button>
              </form>
            </div>

            {/* 2. Currency & Language Selectors */}
            <div className="p-4 bg-white grid grid-cols-2 gap-2 text-xs">
              {/* Currency Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsCurrOpen(!isCurrOpen);
                    setIsLangOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-gray-800 font-semibold"
                >
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-[#218596]" />
                    <span className="text-[11px]">{currency.code}</span>
                  </div>
                  <ChevronDown
                    className={`w-3 h-3 text-gray-400 transition-transform ${
                      isCurrOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCurrOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-30 max-h-48 overflow-y-auto">
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setCurrency(curr);
                          setIsCurrOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-[11px] flex items-center justify-between hover:bg-teal-50 ${
                          currency.code === curr.code
                            ? "text-[#218596] font-bold bg-teal-50/50"
                            : "text-gray-700"
                        }`}
                      >
                        <span>{curr.label}</span>
                        {currency.code === curr.code && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsLangOpen(!isLangOpen);
                    setIsCurrOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-gray-800 font-semibold"
                >
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#218596]" />
                    <span className="text-[11px] truncate">{language.label}</span>
                  </div>
                  <ChevronDown
                    className={`w-3 h-3 text-gray-400 transition-transform ${
                      isLangOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isLangOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-30 max-h-48 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-[11px] flex items-center justify-between hover:bg-teal-50 ${
                          language.code === lang.code
                            ? "text-[#218596] font-bold bg-teal-50/50"
                            : "text-gray-700"
                        }`}
                      >
                        <span>{lang.label}</span>
                        {language.code === lang.code && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 3. Primary Navigation Links */}
            <div className="p-3 space-y-1 text-xs font-semibold">
              <button
                onClick={() => {
                  onNavigate("home");
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-800 hover:bg-gray-50 hover:text-[#218596] transition-colors text-left"
              >
                <Home className="w-4 h-4 text-[#218596]" />
                <span>Home</span>
              </button>

              <button
                onClick={() => {
                  onNavigate("collection", "Suggested Instruments Sets");
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-800 hover:bg-gray-50 hover:text-[#218596] transition-colors text-left"
              >
                <Layers className="w-4 h-4 text-[#218596]" />
                <span>Suggested Instruments Sets</span>
              </button>

              <button
                onClick={() => {
                  onNavigate("pdf-catalogues");
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-800 hover:bg-gray-50 hover:text-[#218596] transition-colors text-left"
              >
                <BookOpen className="w-4 h-4 text-[#218596]" />
                <span>PDF Catalogues</span>
              </button>

              <button
                onClick={() => {
                  onNavigate("about-us");
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-800 hover:bg-gray-50 hover:text-[#218596] transition-colors text-left"
              >
                <Users className="w-4 h-4 text-[#218596]" />
                <span>About Us</span>
              </button>
            </div>

            {/* 4. Surgical Departments Accordion */}
            <div className="p-4">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Surgical Departments
              </div>
              <div className="space-y-1.5">
                {Object.keys(categoriesTree).map((cat) => {
                  const isExp = expandedCat === cat;
                  const subs = categoriesTree[cat] || [];
                  return (
                    <div
                      key={cat}
                      className="border border-gray-100 rounded-lg overflow-hidden bg-gray-50/50"
                    >
                      <div className="flex items-center justify-between px-3 py-2.5">
                        <button
                          onClick={() => {
                            onNavigate("collection", cat);
                            onClose();
                          }}
                          className="font-bold text-xs text-gray-900 hover:text-[#218596] text-left flex-1"
                        >
                          {cat}
                        </button>
                        {subs.length > 0 && (
                          <button
                            onClick={() => setExpandedCat(isExp ? null : cat)}
                            className="p-1 text-gray-400 hover:text-gray-900"
                          >
                            {isExp ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>

                      {isExp && subs.length > 0 && (
                        <div className="bg-white border-t border-gray-100 px-3 py-2 space-y-1 text-xs">
                          {subs.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => {
                                onNavigate("collection", sub);
                                onClose();
                              }}
                              className="w-full text-left py-1 text-gray-600 hover:text-[#218596] block truncate font-roboto text-[11px]"
                            >
                              • {sub}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Direct WhatsApp & Contact Card */}
            <div className="p-4 bg-gradient-to-br from-[#1b7180] to-[#174c57] text-white">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-teal-300" />
                <h4 className="font-bold text-xs tracking-wide">Direct WhatsApp Desk</h4>
              </div>
              <p className="text-[11px] text-teal-100 mb-3 font-roboto leading-snug">
                Connect directly with our master craftsmen and sales team for inquiries and bespoke orders.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Chat with us</span>
              </a>

              <div className="mt-4 pt-3 border-t border-teal-600/40 space-y-1.5 text-[11px] text-teal-100 font-roboto">
                <a
                  href={`tel:${WHATSAPP_PHONE}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-300" />
                  <span>{DISPLAY_PHONE}</span>
                </a>
                <a
                  href="mailto:coinsurgical@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-teal-300" />
                  <span>coinsurgical@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
