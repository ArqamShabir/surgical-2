import React, { useState } from "react";
import { ChevronRight, ChevronDown, BookOpen, Layers } from "lucide-react";

interface NavbarProps {
  onNavigate: (page: string, category?: string) => void;
}

interface SubSubCategory {
  name: string;
}

interface SubCategory {
  name: string;
  items?: SubSubCategory[];
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [activeL1, setActiveL1] = useState<string>("Plastic Surgery");
  const [activeL2, setActiveL2] = useState<string>("Specialty Instruments");
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>("Plastic Surgery");

  const menuTree: Record<string, SubCategory[]> = {
    "Plastic Surgery": [
      {
        name: "Specialty Instruments",
        items: [
          { name: "Areola Markers" },
          { name: "Auricular Plastic Instruments" },
          { name: "Breast Dissectors and Elevator" },
          { name: "Breast Retractors" },
          { name: "Cartilage And Bone Instruments" },
          { name: "Chisels and Gouges" },
          { name: "Dermatomes" },
          { name: "Dissectors and Elevators" },
          { name: "Lip and Cheek Retractors" },
          { name: "Lip and Cleft Palate Instruments" },
          { name: "Mallets" },
          { name: "Marking And Measuring Instruments" },
          { name: "Maxilla Mobilizer" },
          { name: "Mouth Gags" },
          { name: "Mucosa Knife And Raspatories" },
          { name: "Rhinoplasty Instruments" },
        ],
      },
      {
        name: "Standard Instruments",
        items: [
          { name: "Delicate Dressing and Tissue Forceps" },
          { name: "Dressing and Tissue Forceps" },
          { name: "Hemostatic Forceps" },
          { name: "Micro Forceps and Vessel Dilators" },
          { name: "Tissue Grasping Forceps" },
          { name: "Needle Holders" },
          { name: "Micro Needle Holders" },
          { name: "Retractors" },
          { name: "Delicate Retractors" },
          { name: "Self Retaining Retractors" },
          { name: "Scalpel Handles" },
          { name: "Delicate Scissors" },
          { name: "Delicate Dissecting Scissors" },
        ],
      },
      {
        name: "Liposuction",
        items: [
          { name: "Liposuction Cannulas" },
          { name: "Liposuction Cannulas Accessories" },
          { name: "Liposuction Cannulas Sets" },
          { name: "Threaded Fitting Cannulas" },
          { name: "Luer Lock Cannulas" },
          { name: "Super Handle Cannulas" },
          { name: "Microaire Fitting Cannulas" },
          { name: "Fat Grafting Sets" },
        ],
      },
    ],
    "General Surgery": [
      {
        name: "Abdominal Retractors",
        items: [
          { name: "Balfour Abdominal Retractors" },
          { name: "Bookwalter Retractor Systems" },
          { name: "Gosset Retractors" },
        ],
      },
      {
        name: "Dermatology Instruments",
        items: [
          { name: "Biopsy Punches" },
          { name: "Comedone Extractors" },
          { name: "Dermal Curettes" },
        ],
      },
    ],
    "Electro Surgical": [
      {
        name: "European Pattern",
        items: [
          { name: "Bipolar Forceps, Straight" },
          { name: "Bipolar Forceps, Bayonet" },
          { name: "Non-Stick Bipolar Forceps" },
        ],
      },
      {
        name: "American Pattern",
        items: [
          { name: "Jeweler Bipolar Forceps" },
          { name: "Cushing Bipolar Forceps" },
        ],
      },
      {
        name: "Cables & Accessories",
        items: [
          { name: "Bipolar Cables" },
          { name: "Monopolar Cables" },
          { name: "Electrosurgical Pencils" },
        ],
      },
    ],
    "Maxillofacial Instruments": [],
  };

  const level1Categories: string[] = [
    "Plastic Surgery",
    "General Surgery",
    "Electro Surgical",
    "Maxillofacial Instruments",
  ];

  const currentL2List: SubCategory[] = menuTree[activeL1] || [];
  const currentL3List: SubSubCategory[] =
    currentL2List.find((sub) => sub.name === activeL2)?.items || [];

  return (
    <div className="relative z-40 bg-[#1b7180] border-t border-teal-600/40">
      <div className="max-w-[1280px] mx-auto flex items-stretch justify-between">
        {/* Left: ALL DEPARTMENTS Button */}
        <div
          className="relative"
          onMouseEnter={() => setIsBrowseOpen(true)}
          onMouseLeave={() => setIsBrowseOpen(false)}
        >
          <button
            onClick={() => setIsBrowseOpen(!isBrowseOpen)}
            className={`flex items-center gap-2 sm:gap-3 font-montserrat font-bold text-xs uppercase tracking-wider px-4 sm:px-6 py-3 h-full cursor-pointer relative transition-colors ${
              isBrowseOpen
                ? "bg-white text-gray-900 shadow-sm"
                : "bg-[#175d69] hover:bg-white hover:text-gray-900 text-white"
            }`}
          >
            {/* 3 Dots / Menu Icon */}
            <div className="flex flex-col gap-0.5 justify-center">
              <span
                className={`w-1 h-1 rounded-full transition-colors ${
                  isBrowseOpen ? "bg-gray-900" : "bg-white"
                }`}
              />
              <span
                className={`w-1 h-1 rounded-full transition-colors ${
                  isBrowseOpen ? "bg-gray-900" : "bg-white"
                }`}
              />
              <span
                className={`w-1 h-1 rounded-full transition-colors ${
                  isBrowseOpen ? "bg-gray-900" : "bg-white"
                }`}
              />
            </div>
            <span className="whitespace-nowrap">ALL DEPARTMENTS</span>

            {isBrowseOpen && (
              <span className="hidden md:block absolute -bottom-2 left-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white z-50" />
            )}
          </button>

          {/* 3-Column Desktop Flyout Mega Menu */}
          {isBrowseOpen && (
            <div className="hidden md:flex absolute top-full left-0 bg-white shadow-2xl border border-gray-200 z-50 font-roboto text-xs min-h-[400px]">
              {/* Column 1: Main Categories */}
              <div className="w-56 bg-white py-2 border-r border-gray-200 shrink-0">
                {level1Categories.map((cat) => (
                  <button
                    key={cat}
                    onMouseEnter={() => {
                      setActiveL1(cat);
                      const subs = menuTree[cat] || [];
                      if (subs.length > 0) {
                        setActiveL2(subs[0].name);
                      } else {
                        setActiveL2("");
                      }
                    }}
                    onClick={() => {
                      onNavigate("collection", cat);
                      setIsBrowseOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left cursor-pointer transition-colors ${
                      activeL1 === cat
                        ? "bg-teal-50 text-[#218596] font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{cat}</span>
                    {menuTree[cat] && menuTree[cat].length > 0 && (
                      <span className="text-gray-400 text-[10px]">▶</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Column 2: Subcategories */}
              {currentL2List.length > 0 && (
                <div className="w-56 bg-white py-2 border-r border-gray-200 shrink-0">
                  {currentL2List.map((sub) => (
                    <button
                      key={sub.name}
                      onMouseEnter={() => setActiveL2(sub.name)}
                      onClick={() => {
                        onNavigate("collection", sub.name);
                        setIsBrowseOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-left cursor-pointer transition-colors ${
                        activeL2 === sub.name
                          ? "bg-teal-50 text-[#218596] font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{sub.name}</span>
                      {sub.items && sub.items.length > 0 && (
                        <span className="text-gray-400 text-[10px]">▶</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Column 3: Deep Item Categories */}
              {currentL3List.length > 0 && (
                <div className="w-72 bg-white py-2 shrink-0 max-h-[440px] overflow-y-auto">
                  {currentL3List.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        onNavigate("collection", item.name);
                        setIsBrowseOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 text-gray-700 hover:text-[#218596] hover:bg-teal-50/50 transition-colors cursor-pointer block truncate"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mobile Accordion Menu */}
          {isBrowseOpen && (
            <div className="md:hidden absolute top-full left-0 w-[calc(100vw-32px)] max-w-[340px] bg-white shadow-2xl border border-gray-200 z-50 font-roboto text-xs max-h-[75vh] overflow-y-auto p-3 rounded-b-xl">
              <div className="space-y-2">
                {/* Mobile Suggested Sets & Catalogues Links */}
                <div className="pb-2 border-b border-gray-100 flex flex-col gap-1">
                  <button
                    onClick={() => {
                      onNavigate("collection", "Suggested Instruments Sets");
                      setIsBrowseOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-teal-50 text-[#218596] font-bold"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Suggested Instruments Sets</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("pdf-catalogues");
                      setIsBrowseOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-teal-50 text-[#218596] font-bold"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>PDF Catalogues</span>
                  </button>
                </div>

                {/* Categories Drilldown */}
                <p className="font-bold text-gray-400 uppercase text-[10px] tracking-wider px-1 pt-1">
                  Departments:
                </p>
                {level1Categories.map((cat) => {
                  const isExpanded = mobileExpandedCat === cat;
                  const subs = menuTree[cat] || [];

                  return (
                    <div key={cat} className="border border-gray-100 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between bg-gray-50 px-3 py-2">
                        <button
                          onClick={() => {
                            onNavigate("collection", cat);
                            setIsBrowseOpen(false);
                          }}
                          className="font-semibold text-gray-800 hover:text-[#218596] text-left flex-1"
                        >
                          {cat}
                        </button>
                        {subs.length > 0 && (
                          <button
                            onClick={() => setMobileExpandedCat(isExpanded ? null : cat)}
                            className="p-1 text-gray-500 hover:text-gray-900"
                          >
                            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>

                      {isExpanded && subs.length > 0 && (
                        <div className="p-2 bg-white space-y-1 pl-4 border-t border-gray-100">
                          {subs.map((sub) => (
                            <button
                              key={sub.name}
                              onClick={() => {
                                onNavigate("collection", sub.name);
                                setIsBrowseOpen(false);
                              }}
                              className="w-full text-left py-1 text-gray-600 hover:text-[#218596] block truncate"
                            >
                              • {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Center: SUGGESTED SETS & PDF CATALOGUES */}
        <div className="hidden md:flex items-center space-x-1 px-4 flex-1">
          <button
            onClick={() => onNavigate("collection", "Suggested Instruments Sets")}
            className="text-white font-montserrat font-bold text-xs uppercase tracking-wider hover:text-teal-100 transition-colors cursor-pointer px-4 py-3 whitespace-nowrap"
          >
            SUGGESTED INSTRUMENTS SETS
          </button>
          <button
            onClick={() => onNavigate("pdf-catalogues")}
            className="text-white font-montserrat font-bold text-xs uppercase tracking-wider hover:text-teal-100 transition-colors cursor-pointer px-4 py-3 whitespace-nowrap"
          >
            PDF CATALOGUES
          </button>
        </div>

        {/* Right WhatsApp & Phone Contact matching media 3 screenshot */}
        <div className="flex items-stretch text-white text-xs font-montserrat font-bold tracking-wider shrink-0">
          <a
            href="https://wa.me/923167134152"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 hover:text-teal-100 transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-white shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="tracking-tight text-white font-semibold text-[11px] sm:text-xs whitespace-nowrap">+92 3167134152</span>
          </a>

          {/* Non-link arrow indicator badge pointing to WhatsApp number */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 sm:px-4 py-2.5 bg-[#174c57] text-teal-100 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] select-none whitespace-nowrap">
            <span className="text-white text-sm">←</span>
            <span>WHAT'S APP NUMBER</span>
          </div>
        </div>
      </div>
    </div>
  );
};
