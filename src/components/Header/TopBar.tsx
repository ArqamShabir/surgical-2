import React, { useState, useRef, useEffect } from "react";
import { Home, Users, Mail, Phone, ChevronDown, Globe, DollarSign } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { DISPLAY_PHONE, WHATSAPP_PHONE } from "../../data/mockData";

interface TopBarProps {
  onNavigate?: (page: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onNavigate }) => {
  const { currency, setCurrency, language, setLanguage, currencies, languages } = useCurrency();
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const currencyRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#1a2024] text-gray-300 py-1.5 px-4 font-montserrat text-[11px] border-b border-gray-800 shadow-xs relative z-50">
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Navigation Links & Selectors */}
        <div className="flex items-center space-x-3 sm:space-x-4 flex-wrap">
          {/* Home */}
          <button
            onClick={() => onNavigate?.("home")}
            className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer py-1"
          >
            <Home className="w-3.5 h-3.5 text-[#218596]" />
            <span>Home</span>
          </button>

          {/* About Us */}
          <button
            onClick={() => onNavigate?.("about-us")}
            className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer py-1"
          >
            <Users className="w-3.5 h-3.5 text-[#218596]" />
            <span>About Us</span>
          </button>

          {/* Contact (Opens Email Client) */}
          <a
            href="mailto:coinsurgical@gmail.com"
            className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer py-1"
            title="Email us at coinsurgical@gmail.com"
          >
            <Mail className="w-3.5 h-3.5 text-[#218596]" />
            <span>Contact</span>
          </a>

          {/* Prominent Currency Selector Dropdown */}
          <div className="relative" ref={currencyRef}>
            <button
              onClick={() => {
                setIsCurrencyOpen(!isCurrencyOpen);
                setIsLangOpen(false);
              }}
              className="flex items-center gap-1.5 bg-[#252e35] hover:bg-[#2d3840] text-white px-2.5 py-1 rounded border border-gray-700 hover:border-[#218596] cursor-pointer transition-all shadow-xs"
              title="Select Currency"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#218596]" />
              <span className="font-semibold text-teal-300">{currency.label}</span>
              <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isCurrencyOpen ? "rotate-180" : ""}`} />
            </button>

            {isCurrencyOpen && (
              <div className="absolute top-full left-0 mt-1 bg-[#252e35] border border-gray-700 rounded-md shadow-2xl py-1 z-50 min-w-[150px] overflow-hidden animate-fadeIn">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrency(curr);
                      setIsCurrencyOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#218596] hover:text-white transition-colors cursor-pointer ${
                      currency.code === curr.code
                        ? "text-teal-300 font-bold bg-[#1b2329]"
                        : "text-gray-200"
                    }`}
                  >
                    <span>{curr.label}</span>
                    {currency.code === curr.code && (
                      <span className="text-[10px] bg-teal-500/30 text-teal-200 px-1.5 py-0.5 rounded font-bold">
                        ACTIVE
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Prominent Language Selector Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsCurrencyOpen(false);
              }}
              className="flex items-center gap-1.5 bg-[#252e35] hover:bg-[#2d3840] text-white px-2.5 py-1 rounded border border-gray-700 hover:border-[#218596] cursor-pointer transition-all shadow-xs"
              title="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#218596]" />
              <span className="font-semibold text-gray-200">{language.label}</span>
              <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
            </button>

            {isLangOpen && (
              <div className="absolute top-full left-0 mt-1 bg-[#252e35] border border-gray-700 rounded-md shadow-2xl py-1 z-50 min-w-[140px] overflow-hidden animate-fadeIn">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#218596] hover:text-white transition-colors cursor-pointer ${
                      language.code === lang.code
                        ? "text-teal-300 font-bold bg-[#1b2329]"
                        : "text-gray-200"
                    }`}
                  >
                    <span>{lang.label}</span>
                    {language.code === lang.code && (
                      <span className="text-[10px] bg-teal-500/30 text-teal-200 px-1.5 py-0.5 rounded font-bold">
                        ACTIVE
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Contact Details: Phone & Email */}
        <div className="flex items-center space-x-3 sm:space-x-4 text-gray-300">
          {/* Phone / WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#218596]" />
            <span className="font-semibold">{DISPLAY_PHONE}</span>
          </a>

          <span className="text-gray-600 hidden sm:inline">•</span>

          {/* Email */}
          <a
            href="mailto:coinsurgical@gmail.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#218596]" />
            <span>coinsurgical@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};
