import React, { useState } from "react";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "../../data/mockData";

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-gray-900 tracking-tight">
            What are people saying about us
          </h2>
          <div className="w-12 h-0.5 bg-[#218596] mx-auto mt-2" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.slice(currentIndex, currentIndex + 3).map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-xl p-6 text-center flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group"
            >
              <div>
                {/* Quote Icon */}
                <div className="text-[#218596] flex justify-center mb-4">
                  <Quote className="w-9 h-9 fill-[#218596]/10 text-[#218596]" />
                </div>

                {/* Quote Text */}
                <p className="text-xs text-gray-600 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author */}
              <div>
                <h4 className="font-montserrat font-bold text-sm text-gray-800 tracking-wide">
                  {item.author}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-1.5 mt-8">
          <button
            onClick={() => setCurrentIndex(0)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              currentIndex === 0 ? "bg-[#218596] w-5" : "bg-gray-300"
            }`}
          />
          <button
            onClick={() => setCurrentIndex(1)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              currentIndex === 1 ? "bg-[#218596] w-5" : "bg-gray-300"
            }`}
          />
        </div>
      </div>
    </section>
  );
};
