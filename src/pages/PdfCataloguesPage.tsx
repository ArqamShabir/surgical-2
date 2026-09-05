import React from "react";
import { ChevronRight, Download, FileText } from "lucide-react";

interface PdfCataloguesPageProps {
  onNavigateHome: () => void;
}

interface CatalogueItem {
  id: string;
  title: string;
  subtitle: string;
  pdfFile: string;
  fileName: string;
  image: string;
  accentColor: string;
}

export const PdfCataloguesPage: React.FC<PdfCataloguesPageProps> = ({ onNavigateHome }) => {
  const catalogues: CatalogueItem[] = [
    {
      id: "cat-1",
      title: "DOWNLOAD PLASTIC SURGERY",
      subtitle: "PDF CATALOG",
      pdfFile: "/catalogues/plastic-surgery-catalog.pdf",
      fileName: "plastic-surgery-catalog.pdf",
      image: "/image/cache/catalog/banners/2-960x450.jpg",
      accentColor: "#218596",
    },
    {
      id: "cat-2",
      title: "DOWNLOAD LIPOSUCTION",
      subtitle: "PDF CATALOG",
      pdfFile: "/catalogues/liposuction-catalog.pdf",
      fileName: "liposuction-catalog.pdf",
      image: "/image/cache/catalog/banners/b1-320x210.jpg",
      accentColor: "#174c57",
    },
    {
      id: "cat-3",
      title: "DOWNLOAD SPECIALTY SURGICAL SETS",
      subtitle: "PDF CATALOG",
      pdfFile: "/catalogues/specialty-instruments-catalog.pdf",
      fileName: "specialty-instruments-catalog.pdf",
      image: "/image/cache/catalog/banners/b2-320x210.jpg",
      accentColor: "#9333ea",
    },
    {
      id: "cat-4",
      title: "DOWNLOAD OPHTHALMIC & GENERAL",
      subtitle: "PDF CATALOG",
      pdfFile: "/catalogues/ophthalmic-catalog.pdf",
      fileName: "ophthalmic-catalog.pdf",
      image: "/image/cache/catalog/14-120x120.jpg",
      accentColor: "#0284c7",
    },
  ];

  const handleDownload = (pdfUrl: string) => {
    // Open in new tab or download
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="font-roboto bg-[#f7fafb] min-h-[75vh] py-8 px-4">
      <div className="max-w-[1280px] mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-montserrat">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#218596] cursor-pointer transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-semibold">PDF Catalogues</span>
        </nav>

        {/* Page Title with Teal Underline */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold font-montserrat text-gray-900">
            PDF Catalogues
          </h1>
          <div className="w-20 h-1 bg-[#218596] mt-3 rounded-full" />
          <p className="text-gray-600 text-xs sm:text-sm mt-3">
            Browse and download our official product catalogues in high-resolution PDF format.
          </p>
        </div>

        {/* 4 Catalogue Cards Grid matching reference screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {catalogues.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleDownload(cat.pdfFile)}
              className="bg-gradient-to-r from-[#218596] to-[#174c57] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-teal-600/30 group flex flex-col sm:flex-row relative"
            >
              {/* Left: Thumbnail & Visual Banner */}
              <div className="sm:w-1/2 p-4 flex items-center justify-center bg-white/10 backdrop-blur-xs relative overflow-hidden">
                <div className="relative w-full h-48 rounded-xl bg-white/90 p-3 shadow-inner flex items-center justify-center overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/image/cache/catalog/banners/2-960x450.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-[#218596]/10 group-hover:bg-transparent transition-colors" />
                </div>
              </div>

              {/* Right: Content & Action */}
              <div className="sm:w-1/2 p-6 flex flex-col justify-between text-white space-y-4">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-white/20 text-white rounded text-[10px] font-bold font-montserrat uppercase tracking-wider mb-3">
                    Official Catalogue
                  </span>
                  <h3 className="font-montserrat font-bold text-base sm:text-lg leading-tight tracking-wide text-white uppercase">
                    {cat.title}
                  </h3>
                  <h4 className="font-montserrat font-semibold text-xs text-teal-200 mt-1 uppercase tracking-wider">
                    {cat.subtitle}
                  </h4>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(cat.pdfFile);
                    }}
                    className="flex items-center gap-2 bg-white text-[#218596] hover:bg-teal-50 px-4 py-2 rounded-xl text-xs font-bold font-montserrat uppercase tracking-wider shadow-sm transition-all cursor-pointer group-hover:shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>

                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#218596] transition-all">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informational Help Note */}
        <div className="mt-10 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-teal-50 text-[#218596] rounded-xl shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-gray-900">
                Looking for Custom Instrument Technical Drawings?
              </h4>
              <p className="text-xs text-gray-600 mt-0.5">
                Contact our engineering team to request CAD specifications, custom laser engraving options, or OEM technical sheets.
              </p>
            </div>
          </div>
          <a
            href="mailto:coinsurgical@gmail.com"
            className="shrink-0 bg-[#218596] hover:bg-[#1a6e7c] text-white text-xs font-bold font-montserrat uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Email Engineering
          </a>
        </div>
      </div>
    </div>
  );
};
