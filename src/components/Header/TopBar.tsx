import React from "react";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import { DISPLAY_PHONE, WHATSAPP_PHONE } from "../../data/mockData";

interface TopBarProps {
  onNavigate?: (page: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#0f1418] text-gray-300 py-2 px-4 font-montserrat text-[11px] border-b border-gray-800/80 tracking-wide">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Trust Statement */}
        <div className="flex items-center gap-2 text-teal-300 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span className="hidden sm:inline">Certified German Stainless Steel • ISO & CE Certified Manufacturing</span>
          <span className="sm:hidden">Certified German Grade Steel</span>
        </div>

        {/* Right: Quick Inquiries & WhatsApp Phone */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-gray-300">
          <button
            onClick={() => onNavigate?.("about-us")}
            className="hidden md:inline hover:text-white transition-colors cursor-pointer text-gray-400"
          >
            About Us
          </button>
          <button
            onClick={() => onNavigate?.("pdf-catalogues")}
            className="hidden md:inline hover:text-white transition-colors cursor-pointer text-gray-400"
          >
            Catalogues
          </button>

          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-teal-300 transition-colors text-gray-200 font-semibold"
          >
            <Phone className="w-3 h-3 text-teal-400" />
            <span>{DISPLAY_PHONE}</span>
          </a>

          <a
            href="mailto:coinsurgical@gmail.com"
            className="hidden lg:flex items-center gap-1.5 hover:text-teal-300 transition-colors text-gray-400"
          >
            <Mail className="w-3 h-3 text-teal-400" />
            <span>coinsurgical@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};
