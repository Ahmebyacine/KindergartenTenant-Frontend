import i18n from "@/i18n";

export const formatCurrencyDZD = (amount) => {
  const lang = i18n.language;
  const locales = {
    ar: "ar-DZ",
    fr: "fr-FR",
    en: "en-US",
  };

  const locale = locales[lang] || "en-US";

  if (isNaN(amount) || amount === null || amount === undefined) {
    return lang === "ar" ? "غير محدد" : "Not selected";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "DZD",
    minimumFractionDigits: 2,
  }).format(amount);
};
