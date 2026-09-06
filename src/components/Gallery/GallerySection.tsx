import React, { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { GALLERY_ITEMS, fixAssetUrl, type GalleryItem } from "../../data/mockData";

export const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <section className="bg-[#38444d] text-white py-14 font-roboto">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-white tracking-tight">
            Gallery
          </h2>
          <div className="w-12 h-0.5 bg-[#218596] mx-auto mt-2.5 mb-4" />
          <p className="text-xs sm:text-sm text-gray-300">
            Discover the precision and craftsmanship of our instruments like never before!
          </p>
        </div>

        {/* Gallery Grid: 9 cards in a row matching media_1788634585919.png */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="bg-white rounded-xl p-2 group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 aspect-square flex items-center justify-center overflow-hidden border border-white/10 relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    fixAssetUrl("/image/cache/catalog/n%20final%20png-5027x2270.png");
                }}
              />
              <div className="absolute inset-0 bg-[#218596]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                <ZoomIn className="w-5 h-5 text-white drop-shadow" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white rounded-2xl p-6 max-w-lg w-full text-gray-900 shadow-2xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-80 w-full flex items-center justify-center bg-gray-50 rounded-xl mb-4 p-4 overflow-hidden border border-gray-100">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <h3 className="font-montserrat font-bold text-base text-gray-900 text-center">
              {selectedImage.title}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
};
