import i18n from "@/i18n";


export const formatDate = (dateString) => {
  const lang = i18n.language;
  const locales = {
    ar: "ar-DZ",
    fr: "fr-FR",
    en: "en-US",
  };

  const locale = locales[lang] || "en-US";

  return new Date(dateString).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateMonth = (dateString) => {
  const lang = i18n.language;
  const locales = {
    ar: "ar-DZ",
    fr: "fr-FR",
    en: "en-US",
  };
  const locale = locales[lang] || "en-US";

  return new Date(dateString).toLocaleString(locale, {
    year: "numeric",
    month: "long",
  });
};

export const formatDateTime = (dateString) => {
  const lang = i18n.language;
  const locales = {
    ar: "ar-DZ",
    fr: "fr-FR",
    en: "en-US",
  };
  const locale = locales[lang] || "en-US";

  return new Date(dateString).toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
