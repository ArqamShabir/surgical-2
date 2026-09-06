import React, { useState } from "react";
import { TopBar } from "./TopBar";
import { MidBar } from "./MidBar";
import { Navbar } from "./Navbar";
import { MobileDrawer } from "./MobileDrawer";

interface HeaderProps {
  onNavigate: (page: string, category?: string, search?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 shadow-xs bg-white">
      <TopBar onNavigate={onNavigate} />
      <MidBar
        onNavigate={onNavigate}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />
      <Navbar onNavigate={onNavigate} />
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={onNavigate}
      />
    </header>
  );
};
