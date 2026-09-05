import React from "react";
import { Truck, Check, Shield, Headphones } from "lucide-react";

export const FeatureStrip: React.FC = () => {
  return (
    <section className="bg-[#1e2428] text-white py-6 border-b border-teal-900/40">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-teal-500/30 bg-[#174c57]/70 flex items-center justify-center shrink-0 text-[#218596] shadow-sm">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-montserrat tracking-tight text-white">
                Free Shipping
              </h4>
              <p className="text-xs text-gray-400">Free delivery over $2000</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-teal-500/30 bg-[#174c57]/70 flex items-center justify-center shrink-0 text-[#218596] shadow-sm">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-montserrat tracking-tight text-white">
                Quality Check
              </h4>
              <p className="text-xs text-gray-400">Checked each tool by hand</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-teal-500/30 bg-[#174c57]/70 flex items-center justify-center shrink-0 text-[#218596] shadow-sm">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-montserrat tracking-tight text-white">
                Secure Shopping
              </h4>
              <p className="text-xs text-gray-400">Best security features</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-teal-500/30 bg-[#174c57]/70 flex items-center justify-center shrink-0 text-[#218596] shadow-sm">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-montserrat tracking-tight text-white">
                24/7 Customer Support
              </h4>
              <p className="text-xs text-gray-400">available all time to help you</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
