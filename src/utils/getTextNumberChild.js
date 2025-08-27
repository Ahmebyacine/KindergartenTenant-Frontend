import { t } from "i18next";

export const getTextNumberChild = (num) => {
  if (num === 0) return t("children.zero", { count: num });
  if (num === 1) return t("children.one", { count: num });
  if (num === 2) return t("children.two", { count: num });
  if (num >= 3 && num <= 10) return t("children.few", { count: num });
  return t("children.many", { count: num });
};