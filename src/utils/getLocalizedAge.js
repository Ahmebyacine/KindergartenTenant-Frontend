import i18n from "@/i18n";

export function getLocalizedAge(isoDate) {
  const lang = i18n.language;
  const birthDate = new Date(isoDate);
  const today = new Date();

  if (isNaN(birthDate.getTime()))
    return lang === "ar"
      ? "تاريخ غير صالح"
      : lang === "fr"
      ? "Date invalide"
      : "Invalid date";

  let age = today.getFullYear() - birthDate.getFullYear();
  const isBeforeBirthday =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate());

  if (isBeforeBirthday) age--;

  const translations = {
    en: `${age} year${age !== 1 ? "s" : ""}`,
    fr: `${age} an${age > 1 ? "s" : ""}`,
    ar: `${age} ${
      age === 1 ? "سنة" : age === 2 ? "سنتين" : age < 11 ? "سنوات" : "سنة"
    }`,
  };

  return translations[lang];
}
export function getAge(birthDay, date) {
  const lang = i18n.language;
  const birthDate = new Date(birthDay);
  const today = new Date(date);

  if (isNaN(birthDate.getTime()))
    return lang === "ar"
      ? "تاريخ غير صالح"
      : lang === "fr"
      ? "Date invalide"
      : "Invalid date";

  let age = today.getFullYear() - birthDate.getFullYear();
  const isBeforeBirthday =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate());

  if (isBeforeBirthday) age--;

  const translations = {
    en: `${age} year${age !== 1 ? "s" : ""}`,
    fr: `${age} an${age > 1 ? "s" : ""}`,
    ar: `${age} ${
      age === 1 ? "سنة" : age === 2 ? "سنتين" : age < 11 ? "سنوات" : "سنة"
    }`,
  };

  return translations[lang];
}
