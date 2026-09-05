import React from "react";
import { HeroBanner } from "../components/Hero/HeroBanner";
import { FeatureStrip } from "../components/Features/FeatureStrip";
import { WhyBuyFromUs } from "../components/WhyBuyFromUs/WhyBuyFromUs";
import { FeaturedProducts } from "../components/Products/FeaturedProducts";
import { GallerySection } from "../components/Gallery/GallerySection";
import { BlogSection } from "../components/Blog/BlogSection";
import { TestimonialsSection } from "../components/Testimonials/TestimonialsSection";
import type { Product } from "../data/mockData";

interface HomePageProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateCollection: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onAddToCart,
  onQuickView,
  onSelectProduct,
  onNavigateCollection,
}) => {
  return (
    <div className="flex-1">
      {/* 1. Hero Slider & Side Banners */}
      <HeroBanner />

      {/* 2. Feature Highlights Strip */}
      <FeatureStrip />

      {/* 3. Why buy from us? Section */}
      <WhyBuyFromUs />

      {/* 4. Featured Products Tabs Section */}
      <FeaturedProducts
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        onSelectProduct={onSelectProduct}
        onNavigateCollection={onNavigateCollection}
      />

      {/* 5. Gallery Section */}
      <GallerySection />

      {/* 6. From our Blog Section */}
      <BlogSection />

      {/* 7. What are people saying about us (Testimonials) */}
      <TestimonialsSection />
    </div>
  );
};
