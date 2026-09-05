import React from "react";
import { TopBar } from "./TopBar";
import { MidBar } from "./MidBar";
import { Navbar } from "./Navbar";

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onNavigate: (page: string, category?: string, search?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 shadow-sm bg-white">
      <TopBar onNavigate={onNavigate} />
      <MidBar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={onOpenCart}
        onNavigate={onNavigate}
      />
      <Navbar onNavigate={onNavigate} />
    </header>
  );
};
