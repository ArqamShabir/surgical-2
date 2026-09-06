import { Phone, Mail } from "lucide-react";
import { SIDE_PRODUCTS, FOOTER_DATA, fixAssetUrl } from "../../data/mockData";
import { useCurrency } from "../../context/CurrencyContext";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { formatPrice } = useCurrency();

  return (
    <footer className="bg-[#218596] text-white font-roboto">
      {/* 1. Most Viewed Mini Products Row */}
      <div className="border-t border-b border-teal-700/50 py-6 bg-[#1b7180]">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center mb-4">
            <span className="bg-[#174c57] text-white text-[11px] font-bold font-montserrat uppercase tracking-wider px-3.5 py-1 rounded shadow-xs">
              Most Viewed Products
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SIDE_PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => onNavigate ? onNavigate(`/product/${prod.id}`) : window.location.href = `/product/${prod.id}`}
                className="bg-white p-3 rounded-lg border border-teal-800/20 flex items-center gap-3 hover:shadow-lg transition-all transform hover:-translate-y-0.5 group text-left cursor-pointer"
              >
                <div className="w-16 h-16 shrink-0 bg-gray-50 p-1 flex items-center justify-center rounded overflow-hidden border border-gray-100">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        fixAssetUrl("/image/cache/catalog/n%20final%20png-5027x2270.png");
                    }}
                  />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-semibold text-gray-800 line-clamp-1 group-hover:text-[#218596] transition-colors font-montserrat">
                    {prod.name}
                  </h4>
                  <span className="text-xs font-bold font-montserrat text-[#218596] block mt-1">
                    {formatPrice(prod.price)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main 4-Column Footer Content */}
      <div className="py-12 bg-[#218596]">
        <div className="max-w-[1280px] mx-auto px-4">
          {/* Top Footer WhatsApp Inquiry Banner */}
          <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-[#174c57] to-[#123942] border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="text-center md:text-left">
              <h3 className="font-montserrat font-bold text-base text-white uppercase tracking-wider">
                Direct WhatsApp Inquiries & Wholesale Orders
              </h3>
              <p className="text-xs text-teal-100 mt-1 font-roboto">
                Talk directly with our master surgical instrument experts for custom specifications, catalog sets, and pricing.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
              <a
                href="https://wa.me/923494846107?text=Hello%20Coin%20Surgical,%20I%20would%20like%20to%20place%20an%20inquiry/order"
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-montserrat font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all shadow-md flex items-center gap-2 transform hover:scale-105 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Order via WhatsApp</span>
              </a>

              <a
                href="https://wa.me/923494846107"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white font-montserrat font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-xl transition-all border border-teal-300/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Chat with us</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1: QUICK LINKS */}
            <div>
              <h3 className="font-montserrat font-bold text-sm text-white uppercase tracking-wider mb-5">
                QUICK LINKS
              </h3>
              <ul className="space-y-2.5 text-xs text-teal-50 font-medium">
                {FOOTER_DATA.quickLinks.map((link) => (
                  <li key={link.title}>
                    <button
                      onClick={() => onNavigate ? onNavigate(link.link) : window.location.href = link.link}
                      className="hover:text-white hover:underline transition-colors block text-left cursor-pointer"
                    >
                      {link.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: CONTACT US with Icons */}
            <div>
              <h3 className="font-montserrat font-bold text-sm text-white uppercase tracking-wider mb-5">
                CONTACT US
              </h3>
              <div className="space-y-3 text-xs text-teal-50 font-medium">
                {/* Phone with Icon */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-teal-200" />
                  </div>
                  <a
                    href="tel:+923494846107"
                    className="hover:underline hover:text-white font-medium"
                  >
                    +92 3494846107
                  </a>
                </div>

                {/* WhatsApp with Icon */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 fill-teal-200" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </div>
                  <a
                    href="https://wa.me/923494846107"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline hover:text-white font-medium"
                  >
                    +92 3494846107 (WhatsApp)
                  </a>
                </div>

                {/* Email with Icon */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-teal-200" />
                  </div>
                  <div className="space-y-0.5">
                    {FOOTER_DATA.contact.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="block hover:underline hover:text-white"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3: FOLLOW US */}
            <div>
              <h3 className="font-montserrat font-bold text-sm text-white uppercase tracking-wider mb-5">
                FOLLOW US
              </h3>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/coinsurgical"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white text-[#218596] hover:bg-teal-50 flex items-center justify-center transition-all shadow-sm transform hover:scale-110"
                  title="Facebook"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/coinsurgical.shop/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white text-[#218596] hover:bg-teal-50 flex items-center justify-center transition-all shadow-sm transform hover:scale-110"
                  title="Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/coinsurgical"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white text-[#218596] hover:bg-teal-50 flex items-center justify-center transition-all shadow-sm transform hover:scale-110"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 4: ADDRESS */}
            <div>
              <h3 className="font-montserrat font-bold text-sm text-white uppercase tracking-wider mb-5">
                ADDRESS
              </h3>
              <div className="text-xs text-teal-50 font-medium space-y-1">
                <p>Sialkot, Punjab</p>
                <p>Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Row Matching Media 2 Screenshot Exactly */}
      <div className="border-t border-teal-400/30 py-5 px-4 text-xs text-teal-100 font-medium bg-[#1d7989]">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-center md:text-left">
            {FOOTER_DATA.copyright}
          </p>

          <div className="flex items-center gap-6 text-[11px] tracking-wide">
            {FOOTER_DATA.certifications.map((cert) => (
              <span key={cert} className="text-white font-semibold">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
