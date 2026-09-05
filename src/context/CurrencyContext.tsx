import React, { createContext, useContext, useState, useEffect } from "react";

export interface CurrencyOption {
  code: string;
  symbol: string;
  label: string;
  rate: number; // conversion rate from USD base
}

export interface LanguageOption {
  code: string;
  label: string;
}

export const CURRENCIES: CurrencyOption[] = [
  { code: "USD", symbol: "$", label: "$ US Dollar", rate: 1.0 },
  { code: "GBP", symbol: "£", label: "£ Pound Sterling", rate: 0.79 },
  { code: "EUR", symbol: "€", label: "€ Euro", rate: 0.92 },
];

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

interface CurrencyContextType {
  currency: CurrencyOption;
  setCurrency: (currency: CurrencyOption) => void;
  language: LanguageOption;
  setLanguage: (lang: LanguageOption) => void;
  formatPrice: (amountInUSD: number) => string;
  currencies: CurrencyOption[];
  languages: LanguageOption[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const triggerGoogleTranslate = (langCode: string) => {
  const hostname = window.location.hostname;

  if (langCode === "en") {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
    document.cookie = "googtrans=/en/en; path=/;";
    document.cookie = `googtrans=/en/en; path=/; domain=${hostname};`;
  } else {
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${hostname};`;
  }

  // Update goog-te-combo if present
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event("change"));
  } else {
    // If google translate combo isn't attached yet, reload with cookie set
    const hasBeenReloaded = sessionStorage.getItem("coin_lang_reloaded");
    if (!hasBeenReloaded) {
      sessionStorage.setItem("coin_lang_reloaded", "true");
      window.location.reload();
    }
  }
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyOption>(() => {
    const saved = localStorage.getItem("coin_currency");
    if (saved) {
      const found = CURRENCIES.find((c) => c.code === saved);
      if (found) return found;
    }
    return CURRENCIES[0]; // Default to USD
  });

  const [language, setLanguageState] = useState<LanguageOption>(() => {
    const saved = localStorage.getItem("coin_language");
    if (saved) {
      const found = LANGUAGES.find((l) => l.code === saved);
      if (found) return found;
    }
    return LANGUAGES[0];
  });

  // Ensure Google Translate reflects saved language on load
  useEffect(() => {
    if (language.code !== "en") {
      const timer = setTimeout(() => {
        triggerGoogleTranslate(language.code);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const setCurrency = (curr: CurrencyOption) => {
    setCurrencyState(curr);
    localStorage.setItem("coin_currency", curr.code);
  };

  const setLanguage = (lang: LanguageOption) => {
    setLanguageState(lang);
    localStorage.setItem("coin_language", lang.code);
    sessionStorage.removeItem("coin_lang_reloaded");
    triggerGoogleTranslate(lang.code);
  };

  const formatPrice = (amountInUSD: number): string => {
    if (isNaN(amountInUSD)) return `${currency.symbol}0.00`;
    const converted = amountInUSD * currency.rate;
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        language,
        setLanguage,
        formatPrice,
        currencies: CURRENCIES,
        languages: LANGUAGES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
