import React from "react";
import { ChevronRight } from "lucide-react";

export type InfoPageType =
  | "about-us"
  | "delivery-information"
  | "privacy-policy"
  | "terms"
  | "our-work-strategy"
  | "return-policy"
  | "faq";

interface InfoPageProps {
  pageType: InfoPageType;
  onNavigateHome: () => void;
  onNavigatePage?: (page: string) => void;
}

export const InfoPage: React.FC<InfoPageProps> = ({
  pageType,
  onNavigateHome,
}) => {
  const getPageTitle = () => {
    switch (pageType) {
      case "about-us":
        return "About Us";
      case "delivery-information":
        return "Delivery Information";
      case "privacy-policy":
        return "Privacy Policy";
      case "terms":
        return "Terms & Conditions";
      case "our-work-strategy":
        return "Our Work Strategy";
      case "return-policy":
        return "Return Policy";
      case "faq":
        return "Frequently Asked Questions";
    }
  };

  const renderContent = () => {
    switch (pageType) {
      case "about-us":
        return (
          <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-roboto">
            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                COMPANY PROFILE:
              </h2>
              <p>
                <strong>Coin Surgical</strong> is serving the clients in a reliable, responsive and cost effective manner; to ensure client’s satisfaction by building a strong business relationship.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                INTRODUCTION:
              </h2>
              <p className="mb-2">
                Based in Sialkot-Pakistan, <strong>Coin Surgical</strong> is a dedicated and professional company providing Plastic Surgery Instruments and General Surgery Instruments in world medical sector.
              </p>
              <p className="mb-2">
                We are leading manufacturer of Plastic Surgery Instruments and General Surgery Instruments. We have a proven track record of providing our instruments to Hospitals and Clinics worldwide. We never compromise on quality and strive to deliver the best instruments and services to our esteemed clients.
              </p>
              <p>
                Our goal is to serve the clients in a reliable, responsive and cost effective manner; to ensure client’s satisfaction by building strong, professional, business relationships.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                VISION:
              </h2>
              <p>
                Our journey is to fully satisfy our customer’s requirements through a process of continuous improvement. It is critical to understand that this is not a short-term program. It’s a long-term commitment aimed at continuously improving the way we work, providing a safe work environment, managing our business processes selecting quality suppliers, and maintaining clear internal and external communications. It is our goal to position our company for market expansion, thereby providing improved job security and quality of life for all.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                MISSION:
              </h2>
              <p className="mb-2">
                <strong>Coin Surgical</strong> is dedicated to providing the best available medical instruments, primarily for the operating room market. “Best available” implies that our instruments must provide superior features for the intended use, ease of operation and service, high reliability and the lowest acquisition and operating costs.
              </p>
              <p className="mb-2">
                By providing the best, <strong>Coin Surgical</strong> will actively contribute to improving the provision of medical services to the national and world population.
              </p>
              <p>
                We are committed to being very aggressive in our attitude towards quality and customer service, primarily since we want to be ranked as the “best” in our business. Quality is not just another goal; it is our strategy for survival and future growth.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                OUR INSTRUMENTS:
              </h2>
              <p>
                You can see our full range of instruments on our online store. Also we are providing instruments from international catalogues. Customers can also send their custom instruments details and specifications to us at <a href="mailto:coinsurgical@gmail.com" className="text-[#218596] font-semibold underline">coinsurgical@gmail.com</a>.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                CONTACT & INQUIRIES:
              </h2>
              <p>Email: <a href="mailto:coinsurgical@gmail.com" className="text-[#218596] font-semibold underline">coinsurgical@gmail.com</a></p>
              <p>Phone / WhatsApp: <span className="font-semibold">+92 3167134152</span></p>
              <p>Address: Sialkot, Punjab, Pakistan</p>
            </div>
          </div>
        );

      case "delivery-information":
        return (
          <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-roboto">
            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                DELIVERY TIMESCALE;
              </h2>
              <p>
                All orders received through <strong>Coin Surgical</strong> website are processed and, if the stock is available, dispatched within 4 working day of receiving the order. Therefore, your ordered products will have to go through a production process, and the production period may vary according to number of products and quantity, which may be 1-4 weeks.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                LOST PACKAGE;
              </h2>
              <p className="mb-3">
                On rare occasions we do experience losses whilst in transit. Please allow 10 days for the package to arrive from the date of dispatch. If this time elapses and the goods do not arrive, please contact you’re nearest relevant courier office to check that no goods are being held. In the unlikely event that the package is not being held, please contact our Customer Services team who will be happy to assist in sending a replacement.
              </p>
              <p>
                Please be aware that if we are not contacted within 3 weeks, an insurance claim cannot be made and thus you will be unable to claim any loss from <strong>Coin Surgical</strong>.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                TRACK AN ORDER;
              </h2>
              <p>
                For all your orders simply retrieve your tracking number from your account or dispatch confirmation email and then visit the relevant Courier Website (DHL / FedEx) and track the order using their functionality.
              </p>
            </div>
          </div>
        );

      case "privacy-policy":
        return (
          <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-roboto">
            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                What Personal Information About Customers Does Coin Surgical Gather?
              </h2>
              <p className="mb-2">
                · The information we learn from customers helps us personalize and continually improve your shopping experience at <strong>Coin Surgical</strong>. Here are the types of information we gather:
              </p>
              <p className="mb-2">
                · <strong>Information You Give Us:</strong> We receive and store any information you enter on our Web site or give us in any other way. We use the information that you provide for such purposes as responding to your requests, customizing future shopping for you, and communicating with you.
              </p>
              <p className="mb-2">
                · <strong>Automatic Information:</strong> We receive and store certain types of information whenever you interact with us. For example, like many Web sites, we use "cookies," and we obtain certain types of information when your Web browser accesses our website.
              </p>
              <p>
                · <strong>E-mail Communications:</strong> To help us make e-mails more useful and interesting, we often receive a confirmation when you open e-mail from <strong>Coin Surgical</strong> if your computer supports such capabilities.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                What about Cookies?
              </h2>
              <p className="mb-2">
                Cookies are alphanumeric identifiers that we transfer to your computer's hard drive through your Web browser to enable our systems to recognize your browser and to provide features such as storage of items in your Shopping Cart between visits.
              </p>
              <p>
                The Help portion of the toolbar on most browsers will tell you how to prevent your browser from accepting new cookies, how to have the browser notify you when you receive a new cookie, or how to disable cookies altogether. However, because cookies allow you to take advantage of some of <strong>Coin Surgical</strong> essential features, we recommend that you leave them turned on.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                Does Coin Surgical Share the Information It Receives?
              </h2>
              <p className="mb-2">
                Information about our customers is an important part of our business, and we are not in the business of selling it to others. We share customer information only as described below:
              </p>
              <p className="mb-2">
                <strong>Third-Party Service Providers:</strong> We employ other companies and individuals to perform functions on our behalf. Examples include fulfilling orders, delivering packages, sending postal mail and e-mail, processing payments, and providing customer service. They have access to personal information needed to perform their functions, but may not use it for other purposes.
              </p>
              <p>
                <strong>Business Transfers:</strong> As we continue to develop our business, we might sell or buy stores, subsidiaries, or business units. In such transactions, customer information generally is one of the transferred business assets but remains subject to the promises made in any pre-existing Privacy Notice.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                How Secure Is Information About Me?
              </h2>
              <p className="mb-2">
                We work to protect the security of your information during transmission by using Secure Sockets Layer (SSL) software, which encrypts information you input.
              </p>
              <p>
                It is important for you to protect against unauthorized access to your password and to your computer. Be sure to sign off when finished using a shared computer.
              </p>
            </div>
          </div>
        );

      case "terms":
        return (
          <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-roboto">
            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                Minimum Order Quantity (MOQ)
              </h2>
              <p>
                Requirements apply in all cases; for general instruments our MOQ is 1(One) instruments whereas for special items we decide on a case to case basis.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                Guarantee period
              </h2>
              <p>
                Guarantee period of 1 year is applicable on all instruments against rust, corrosion, pitting or any other manufacturing related defect.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                Shipping Time
              </h2>
              <p>
                For products available in stock will be 4-6 Working days, whereas for items not in stock is roughly 20-30 days depending upon order size and the nature of instruments. This Shipping period is significantly reduced once our customer becomes regular and we start to maintain customer specific inventory at our facility.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                Delivery Time
              </h2>
              <p>
                Delivery Time is not more that 10 days, depends on the region of delivery. As we use to deliver with World-class trustable "DHL" courier, average delivery time is 6 working days.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                International Custom Duties and Taxes
              </h2>
              <p>
                International Buyers are responsible for their country’s taxes and duties when receiving packages. We are NOT responsible for any fees relating to international customs. Also we are NOT responsible for any delays in customs clearance in the buyer's country.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                Import License
              </h2>
              <p>
                Those countries who need import license from importer, Customer will arrange the import license before order. Countries Details: Brazil, Russia, Mexico etc.
              </p>
            </div>
          </div>
        );

      case "our-work-strategy":
        return (
          <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-roboto">
            <div>
              <h2 className="font-bold text-gray-900 uppercase text-xs sm:text-sm mb-2">
                OUR WORK STRATEGY:
              </h2>
              <p className="mb-3">
                Locating and comparing specialty Plastic Surgery Instruments and General Surgery Instruments is easy with one call or message to <strong>Coin Surgical</strong>. You will be connected directly with an experienced Instrument Specialist who is dedicated to helping you with your instrument need, not a complicated phone menu.
              </p>
              <p className="mb-3">
                Our extensive knowledge comes from years of industry experience. We can reference any catalog number or description from any manufacturer. And we will only provide you with a quote on instruments that match your instrument specifications and deliver an equal or superior quality instrument with substantially more value.
              </p>
              <p className="mb-3">
                Say goodbye to automated systems, voice mail, and a lack of product support. Our Knowledgeable Instrument Specialists are available 24/7. We can provide you with a quote over the phone, WhatsApp (+92 3167134152) or by email (<a href="mailto:coinsurgical@gmail.com" className="text-[#218596] font-semibold underline">coinsurgical@gmail.com</a>).
              </p>
              <p>
                Looking for a hard to find instrument? Ask the Instrument Specialist for help! Quickly locate the instrument you need without days of research by submitting your question to <a href="mailto:coinsurgical@gmail.com" className="text-[#218596] font-semibold underline">coinsurgical@gmail.com</a>.
              </p>
            </div>
          </div>
        );

      case "return-policy":
        return (
          <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-roboto">
            <div>
              <p className="mb-3">
                · To return any product please contact our support at <a href="mailto:coinsurgical@gmail.com" className="text-[#218596] font-semibold underline">coinsurgical@gmail.com</a> or WhatsApp at <span className="font-semibold">+92 3167134152</span> to get an RMA number.
              </p>
              <p className="mb-3">
                · Returns WILL NOT be accepted unless they can be identified by a valid RMA number issued by <strong>Coin Surgical</strong>.
              </p>
              <p className="mb-3">
                · Return shipping, insurance, and handling is the responsibility of the customer. Credits will not be issued until the product is received in acceptable condition.
              </p>
              <p className="mb-3">
                · Once the item has been used it is not returnable.
              </p>
              <p className="mb-3">
                · Any claim for incorrect shipment, faulty or damaged goods on delivery, must be made within ten (10) working days of receipt of goods.
              </p>
              <p className="mb-3">
                · Custom products are not eligible for return or exchange under any circumstances.
              </p>
              <p className="mb-3">
                · Product will only be accepted for exchange/credit if received in sellable condition. Product must be returned in the original sealed package to be accepted for replacement or credit.
              </p>
              <p className="mb-2">
                · A restocking fee will apply to any product returned for reasons other than defect or damage. The Restocking Fee Schedule is as follows:
              </p>
              <div className="pl-4 space-y-1 mb-3">
                <p>20% for items returned within 15 days</p>
                <p>30% for items returned between 15-45 days</p>
                <p>No credit after 45 days</p>
                <p>Shipping fees will not be credited.</p>
              </div>
              <p className="mb-3">
                · All returned product must include all accessories, manuals, or other documentation that were originally shipped with product. We are not responsible for additional damages made resulting from improper packaging of your equipment on sending it back.
              </p>
              <p>
                · <strong>Coin Surgical</strong> cannot be responsible for return shipping losses. Please allow 3 to 4 weeks from the time we receive your returned merchandise for your refund to be issued.
              </p>
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-roboto">
            <div>
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                1. What types of surgical instruments do you offer?
              </h3>
              <p className="mb-4">
                We offer a comprehensive range of surgical instruments including general surgery tools, specialized instruments for plastic and reconstructive surgery, orthopedic instruments, dental instruments, and more. Our catalog includes scissors, forceps, retractors, needle holders, scalpels, and various sets tailored to specific surgical procedures.
              </p>

              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                2. Are your surgical instruments FDA approved?
              </h3>
              <p className="mb-4">
                Yes, all our surgical instruments comply with FDA regulations and are manufactured to meet the highest standards of quality and safety. We ensure that each instrument is rigorously tested and certified before it reaches our customers.
              </p>

              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                3. Can I request a sample before making a bulk purchase?
              </h3>
              <p className="mb-4">
                Absolutely. We understand the importance of evaluating the quality of our instruments before committing to a large order. Please contact our sales team to discuss your sample request and we will be happy to assist you.
              </p>

              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                4. How can I place an order on your website?
              </h3>
              <p className="mb-4">
                Placing an order is simple. Browse through our product catalog, select the items you need, and add them to your cart. Once you have all your items in the cart, proceed to checkout where you will be guided through the payment and shipping process.
              </p>

              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                5. What payment methods do you accept?
              </h3>
              <p className="mb-4">
                We accept a variety of payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and more. For specific payment queries, please contact our customer service team.
              </p>

              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                6. Do you offer discounts for bulk orders?
              </h3>
              <p className="mb-4">
                Yes, we offer competitive pricing and discounts for bulk orders. Please contact our sales team with your requirements, and we will provide you with a customized quote based on your order size and specifications.
              </p>

              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                7. How do I track my order?
              </h3>
              <p className="mb-4">
                Once your order is shipped, you will receive a confirmation email with a tracking number and a link to the shipping carrier’s website. You can use this tracking number to monitor the status and location of your shipment.
              </p>

              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                8. Can you customize instruments to specific requirements?
              </h3>
              <p className="mb-4">
                Yes, we offer customization services for surgical instruments to meet specific requirements. Please contact our technical support team with your specifications, and we will work with you to create the instruments you need.
              </p>

              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                9. How do I contact customer service?
              </h3>
              <p>
                Our customer service team is available to assist you with any inquiries or issues. You can reach us via email at <a href="mailto:coinsurgical@gmail.com" className="text-[#218596] font-semibold underline">coinsurgical@gmail.com</a>, through our contact form on the website, or by phone/WhatsApp at +92 3167134152.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-[70vh] py-8 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Breadcrumb matching index.html */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-montserrat">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#218596] cursor-pointer transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-gray-600 font-semibold">{getPageTitle()}</span>
        </div>

        {/* Page Title & Divider matching media 1788648974020.png */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#2c3640] tracking-tight">
            {getPageTitle()}
          </h1>
          <div className="w-16 h-0.5 bg-[#218596] mt-2 mb-6" />
        </div>

        {/* Main Content Area: Pure, Simple & Readable Text */}
        <div className="max-w-4xl">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
