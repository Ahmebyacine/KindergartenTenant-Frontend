export const isArabic = (text) => {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text);
}