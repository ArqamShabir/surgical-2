import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { HERO_SLIDES, SIDE_BANNERS, fixAssetUrl } from "../../data/mockData";

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="max-w-[1280px] mx-auto px-4 py-5 font-roboto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {/* Left 2 Cols: Main Banner matching media_1788634562301.png */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-[#eef1f3] min-h-[320px] sm:min-h-[380px] md:min-h-[420px] flex items-center shadow-xs border border-gray-200/80 group">
          {/* Background Banner Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-right md:object-center transition-transform duration-700 ease-out group-hover:scale-102"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  fixAssetUrl("/image/cache/catalog/banners/2-960x450.jpg");
              }}
            />
            {/* Subtle Gradient overlay to ensure text contrast on left */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#eef1f3] via-[#eef1f3]/90 sm:via-[#eef1f3]/70 to-transparent w-full sm:w-2/3" />
          </div>

          {/* Left Text Content */}
          <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-md">
            <span className="inline-block bg-[#218596] text-white font-montserrat font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded shadow-2xs mb-4">
              {slide.tag}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-[38px] font-black font-montserrat text-gray-900 tracking-tight leading-[1.18] whitespace-pre-line mb-6 drop-shadow-2xs">
              {slide.title}
            </h1>

            <div>
              <a
                href={slide.link}
                className="inline-flex items-center gap-2 border border-gray-400 hover:border-[#218596] hover:bg-[#218596] hover:text-white bg-white/80 text-gray-800 font-montserrat font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-all cursor-pointer shadow-xs hover:shadow-md"
              >
                <span>{slide.buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Slider Dots Indicator */}
            <div className="flex items-center gap-1.5 mt-8">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? "w-5 bg-[#218596]" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: 2 Stacked Cards matching media_1788634562301.png */}
        <div className="flex flex-col gap-4 justify-between">
          {SIDE_BANNERS.map((banner) => (
            <a
              key={banner.id}
              href={banner.link}
              className="relative rounded-2xl overflow-hidden group shadow-xs hover:shadow-md transition-all duration-300 h-[155px] sm:h-[180px] md:h-[200px] block bg-white border border-gray-200/80"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    banner.id === "1"
                      ? fixAssetUrl("/image/cache/catalog/banners/b1-320x210.jpg")
                      : fixAssetUrl("/image/cache/catalog/banners/b2-320x210.jpg");
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
