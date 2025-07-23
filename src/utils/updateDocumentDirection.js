export const updateDocumentDirection = (lng) => {
    document.documentElement.lang = lng;
    const dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    localStorage.setItem("i18n-direction", dir);
  };