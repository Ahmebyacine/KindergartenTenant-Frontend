// src/hooks/useCurrency.js
import { useAuth } from "@/contexts/AuthContext";
import i18n from "@/i18n";

export const useCurrency = () => {
  const { config } = useAuth();
  const lang = i18n.language;

  // Language to locale mapping
  const locales = {
    ar: "ar-DZ",
    fr: "fr-FR",
    en: "en-US",
  };

  const locale = locales[lang] || "en-US";

  const format = (amount) => {
    if (isNaN(amount) || amount === null || amount === undefined) {
      return lang === "ar" ? "غير محدد" : "Not selected";
    }

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: config?.currency || "DZD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return { format };
};
