export const formatCurrencyDZD = (amount, lang = 'en') => {
  const locales = {
    ar: 'ar-DZ',
    fr: 'fr-FR',
    en: 'en-US',
  };

  const locale = locales[lang] || 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'DZD',
    minimumFractionDigits: 2,
  }).format(amount);
};
