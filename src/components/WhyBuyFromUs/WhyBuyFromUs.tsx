import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { TOP_CATEGORIES } from "../../data/mockData";

export const WhyBuyFromUs: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const maxIndex = Math.max(0, TOP_CATEGORIES.length - itemsPerPage);

  const prev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const next = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleCategories = TOP_CATEGORIES.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-gray-900 tracking-tight">
            Why buy from us?
          </h2>
          <div className="w-12 h-0.5 bg-[#218596] mx-auto mt-2 mb-4" />
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed text-justify md:text-center">
            At Coin Surgical, we are dedicated to providing the highest quality surgical
            instruments tailored to the needs of medical professionals. Our instruments are crafted
            from the finest materials, ensuring durability and exceptional performance. With years of
            experience, our skilled artisans produce tools that meet stringent medical standards. We
            offer premium products at competitive prices, delivering excellent value for your
            investment. Choose Coin Surgical for reliable, top-quality surgical tools that
            professionals trust.
          </p>
        </div>

        {/* Tab & Header */}
        <div className="flex items-center justify-between border-b border-gray-200 mb-6 pb-2">
          <div className="flex">
            <button className="bg-[#218596] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t">
              Top Categories
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              disabled={startIndex === 0}
              className={`p-1.5 rounded border border-gray-200 text-gray-600 transition-colors ${
                startIndex === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-[#218596] hover:text-white cursor-pointer"
              }`}
              aria-label="Previous Categories"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              disabled={startIndex >= maxIndex}
              className={`p-1.5 rounded border border-gray-200 text-gray-600 transition-colors ${
                startIndex >= maxIndex
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-[#218596] hover:text-white cursor-pointer"
              }`}
              aria-label="Next Categories"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Carousel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="p-4 flex flex-col items-center">
                {/* Category Image */}
                <div className="w-full h-48 flex items-center justify-center p-2 bg-gray-50 rounded mb-4 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-montserrat font-bold text-sm text-gray-800 text-center mb-2 group-hover:text-[#218596] transition-colors">
                  <a href={cat.link}>{cat.name}</a>
                </h3>

                <p className="text-xs text-gray-500 text-center line-clamp-2 mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-center">
                <a
                  href={cat.link}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-[#218596] transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Category</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
