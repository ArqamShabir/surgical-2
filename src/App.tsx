import React, { useState, useEffect } from "react";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { HomePage } from "./pages/HomePage";
import { CollectionPage } from "./pages/CollectionPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { InfoPage, type InfoPageType } from "./pages/InfoPage";
import { PdfCataloguesPage } from "./pages/PdfCataloguesPage";
import { QuickViewModal } from "./components/Modals/QuickViewModal";
import { CartDrawer, type CartItem } from "./components/Modals/CartDrawer";
import { WhatsAppChatbot } from "./components/Chatbot/WhatsAppChatbot";
import { ALL_PRODUCTS, type Product } from "./data/mockData";
import { CurrencyProvider } from "./context/CurrencyContext";

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || "/");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => {
    const path = window.location.pathname;
    if (path.startsWith("/product/")) {
      const slug = path.replace("/product/", "").toLowerCase();
      return ALL_PRODUCTS.find((p) => p.id.toLowerCase() === slug) || ALL_PRODUCTS[0];
    }
    return ALL_PRODUCTS[0];
  });

  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("search") || "";
  });

  const [currentCategory, setCurrentCategory] = useState<string>(() => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const queryCat = params.get("category");
    if (queryCat) return queryCat;
    if (path.startsWith("/collections/")) {
      const catSlug = decodeURIComponent(path.replace("/collections/", "")).replace(/-/g, " ");
      return catSlug || "Plastic Surgery";
    }
    return "Plastic Surgery";
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync state with browser address bar
  const navigateTo = (url: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fullCurrent = window.location.pathname + window.location.search;
    if (fullCurrent !== url) {
      window.history.pushState({}, "", url);
    }
    const pathOnly = url.split("?")[0];
    setCurrentPath(pathOnly);

    const searchParams = new URLSearchParams(url.includes("?") ? url.split("?")[1] : "");
    const searchQ = searchParams.get("search") || "";
    setSearchQuery(searchQ);

    const queryCat = searchParams.get("category");
    if (queryCat) {
      setCurrentCategory(queryCat);
    } else if (url.startsWith("/collections/")) {
      const catSlug = decodeURIComponent(pathOnly.replace("/collections/", "")).replace(/-/g, " ");
      if (catSlug) setCurrentCategory(catSlug);
    }

    if (url.startsWith("/product/")) {
      const slug = pathOnly.replace("/product/", "").toLowerCase();
      const found = ALL_PRODUCTS.find((p) => p.id.toLowerCase() === slug);
      if (found) setSelectedProduct(found);
    }
  };

  // Listen for browser Back and Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || "/";
      setCurrentPath(path);

      const params = new URLSearchParams(window.location.search);
      const searchQ = params.get("search") || "";
      setSearchQuery(searchQ);

      const queryCat = params.get("category");
      if (queryCat) {
        setCurrentCategory(queryCat);
      } else if (path.startsWith("/collections/")) {
        const catSlug = decodeURIComponent(path.replace("/collections/", "")).replace(/-/g, " ");
        if (catSlug) setCurrentCategory(catSlug);
      }

      if (path.startsWith("/product/")) {
        const slug = path.replace("/product/", "").toLowerCase();
        const found = ALL_PRODUCTS.find((p) => p.id.toLowerCase() === slug);
        if (found) setSelectedProduct(found);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Navigation Handlers
  const handleNavigate = (page: string, category?: string, search?: string) => {
    if (page === "collection" || page === "collections" || page === "search") {
      if (search && search.trim().length > 0) {
        setSearchQuery(search.trim());
        const catParam = category && category !== "All" ? `&category=${encodeURIComponent(category)}` : "";
        navigateTo(`/collections?search=${encodeURIComponent(search.trim())}${catParam}`);
      } else if (category && category !== "All") {
        setSearchQuery("");
        setCurrentCategory(category);
        const slug = encodeURIComponent(category.toLowerCase().replace(/\s+/g, "-"));
        navigateTo(`/collections/${slug}`);
      } else {
        setSearchQuery("");
        navigateTo("/collections");
      }
    } else if (page === "checkout") {
      navigateTo("/checkout");
    } else if (page === "product" && selectedProduct) {
      navigateTo(`/product/${selectedProduct.id}`);
    } else if (page === "pdf-catalogues" || page === "/pdf-catalogues") {
      navigateTo("/pdf-catalogues");
    } else if (
      page === "about-us" || page === "/about-us" || page === "about" || page === "/about" ||
      page === "delivery-information" || page === "/delivery-information" ||
      page === "privacy-policy" || page === "/privacy-policy" ||
      page === "terms" || page === "/terms" ||
      page === "our-work-strategy" || page === "/our-work-strategy" ||
      page === "return-policy" || page === "/return-policy" ||
      page === "faq" || page === "/faq"
    ) {
      const cleanPath = page.startsWith("/") ? page : `/${page}`;
      navigateTo(cleanPath === "/about" ? "/about-us" : cleanPath);
    } else {
      setSearchQuery("");
      navigateTo("/");
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    navigateTo(`/product/${product.id}`);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Determine current page view from URL path
  const isProductPage = currentPath.startsWith("/product/");
  const isCollectionPage = currentPath.startsWith("/collections") || currentPath === "/collection";
  const isCheckoutPage = currentPath === "/checkout";
  const isPdfCataloguesPage = currentPath === "/pdf-catalogues";

  const infoPageMap: Record<string, InfoPageType> = {
    "/about-us": "about-us",
    "/about": "about-us",
    "/delivery-information": "delivery-information",
    "/privacy-policy": "privacy-policy",
    "/terms": "terms",
    "/our-work-strategy": "our-work-strategy",
    "/return-policy": "return-policy",
    "/faq": "faq",
  };

  const currentInfoPage = infoPageMap[currentPath];
  const isInfoPage = !!currentInfoPage;

  const isHomePage =
    !isProductPage &&
    !isCollectionPage &&
    !isCheckoutPage &&
    !isPdfCataloguesPage &&
    !isInfoPage;

  return (
    <CurrencyProvider>
      <div className="min-h-screen flex flex-col bg-[#f7fafb]">
        {/* Header */}
        <Header
          cartCount={cartCount}
          cartTotal={cartTotal}
          onOpenCart={() => setIsCartOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* Main Routed Page Content */}
        <main className="flex-1">
          {isHomePage && (
            <HomePage
              onAddToCart={handleAddToCart}
              onQuickView={(prod) => setQuickViewProduct(prod)}
              onSelectProduct={handleSelectProduct}
              onNavigateCollection={() => handleNavigate("collection", "Plastic Surgery")}
            />
          )}

          {isCollectionPage && (
            <CollectionPage
              categoryName={currentCategory}
              searchQuery={searchQuery}
              onAddToCart={handleAddToCart}
              onQuickView={(prod) => setQuickViewProduct(prod)}
              onSelectProduct={handleSelectProduct}
              onNavigateHome={() => navigateTo("/")}
              onClearSearch={() => handleNavigate("collection", "Plastic Surgery")}
            />
          )}

          {isProductPage && (
            <ProductDetailPage
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              onSelectProduct={handleSelectProduct}
              onNavigateHome={() => navigateTo("/")}
              onNavigateCollection={() => handleNavigate("collection", selectedProduct?.category || "Plastic Surgery")}
            />
          )}

          {isPdfCataloguesPage && (
            <PdfCataloguesPage onNavigateHome={() => navigateTo("/")} />
          )}

          {isInfoPage && (
            <InfoPage
              pageType={currentInfoPage}
              onNavigateHome={() => navigateTo("/")}
              onNavigatePage={(slug) => handleNavigate(slug)}
            />
          )}

          {isCheckoutPage && (
            <CheckoutPage
              items={cart}
              onUpdateQty={handleUpdateQty}
              onRemoveItem={handleRemoveFromCart}
              onNavigateHome={() => navigateTo("/")}
              onClearCart={handleClearCart}
            />
          )}
        </main>

        {/* Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* WhatsApp Chatbot Widget */}
        <WhatsAppChatbot />

        {/* Modals & Cart Drawer */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveFromCart}
          onProceedCheckout={() => handleNavigate("checkout")}
        />
      </div>
    </CurrencyProvider>
  );
};

export default App;
