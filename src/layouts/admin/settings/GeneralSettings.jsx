import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/themeProvider";
import i18n from "@/i18n";
import api from "@/api";
import { toast } from "sonner";
import { updateDocumentDirection } from "@/utils/updateDocumentDirection";
import useFetch from "@/hooks/useFetch";
import { fetchCategories } from "@/api/categoriesApi";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import CategoryModal from "../categories/CategoryModal";
import { useAuth } from "@/contexts/AuthContext";
import { t } from "i18next";

export function GeneralSettings() {
  const { theme, setTheme } = useTheme();
  const { config } = useAuth();

  const [autoTimeZone, setAutoTimeZone] = useState(true);
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const { data: categories, setData: setCategories } =
    useFetch(fetchCategories);
  useEffect(() => {
    const onLangChange = (lng) => setSelectedLang(lng);
    i18n.on("languageChanged", onLangChange);
    return () => i18n.off("languageChanged", onLangChange);
  }, []);

  const handleLanguageChange = async (lang) => {
    try {
      i18n.changeLanguage(lang);
      updateDocumentDirection(lang);
      setSelectedLang(lang);
      await api.put("/auth/update-info", { language: lang });
      toast.success(t("settings.general.languageChangeSuccess"));
    } catch (error) {
      console.error("Error updating language:", error);
      toast.error(t("settings.general.languageChangeError"));
    }
  };

  const handleThemeChange = async (themeValue) => {
    try {
      await api.put("/auth/update-info", { theme: themeValue });
      setTheme(themeValue);
      toast.success(t("settings.general.themeChangeSuccess"));
    } catch (error) {
      console.error("Error updating theme:", error);
      toast.error(t("settings.general.themeChangeError"));
    }
  };

  const handleAddCategory = async (data) => {
    try {
      const response = await api.post("/categories", data);

      setCategories((prev) => [response.data, ...prev]);

      toast.success(t("settings.general.addCategory"));
    } catch (error) {
      toast.error(t("settings.general.addCategoryError"));
      console.error("Add category error:", error);
    }
  };

  const handleUpdateCategory = async (data) => {
    try {
      const response = await api.put(`/categories/${data._id}`, data);

      setCategories((prev) =>
        prev.map((cat) => (cat._id === data._id ? response.data : cat))
      );

      toast.success(t("settings.general.updateCategorySuccess"));
    } catch (error) {
      toast.error(t("settings.general.updateCategoryError"));
      console.error("Update category error:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      toast.success(t("settings.general.deleteCategorySuccess"));
    } catch (error) {
      toast.error(t("settings.general.deleteCategoryError"));
      console.error("Delete category error:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Preferences Section */}
      <div>
        <h2 className="text-l md:text-xl font-semibold mb-4 rtl:text-right">
          {t("settings.general.preferences")}
        </h2>
      </div>

      {/* Appearance Section */}
      <div className="space-y-4">
        <div className="flex flex-col justify-start">
          <h3 className="text-xl font-medium">{t("settings.general.theme")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("settings.general.themeDescription")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-start gap-6 mt-4">
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "w-[200px] h-[120px] border rounded-lg overflow-hidden cursor-pointer",
                theme === "dark" ? "border-primary border-2" : "border-border"
              )}
              onClick={() => handleThemeChange("dark")}
            >
              <div className="flex h-full">
                <div className="w-1/3 bg-[#1e2939] p-2">
                  <div className="w-full h-2 bg-gray-600 rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-gray-600 rounded mb-1"></div>
                  <div className="w-1/2 h-2 bg-gray-600 rounded"></div>
                </div>
                <div className="w-2/3 bg-[#020618] p-2">
                  <div className="w-full h-16 bg-[#1e2939] rounded"></div>
                </div>
              </div>
            </div>
            <span className="text-sm">{t("settings.general.dark")}</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "w-[200px] h-[120px] border rounded-lg overflow-hidden cursor-pointer",
                theme === "light" ? "border-primary border-2" : "border-border"
              )}
              onClick={() => handleThemeChange("light")}
            >
              <div className="flex h-full">
                <div className="w-1/3 bg-[#f8fafc] p-2">
                  <div className="w-full h-2 bg-[#e2e8f0] rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-[#e2e8f0] rounded mb-1"></div>
                  <div className="w-1/2 h-2 bg-[#e2e8f0] rounded"></div>
                </div>
                <div className="w-2/3 bg-[#f5f3ff] p-2">
                  <div className="w-full h-16 bg-[#ffffff] rounded"></div>
                </div>
              </div>
            </div>
            <span className="text-sm">{t("settings.general.light")}</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "w-[200px] h-[120px] border rounded-lg overflow-hidden cursor-pointer",
                theme === "system" ? "border-primary border-2" : "border-border"
              )}
              onClick={() => handleThemeChange("system")}
            >
              <div className="flex h-full">
                <div className="w-1/3 bg-[#f8fafc] p-2">
                  <div className="w-full h-2 bg-[#e2e8f0] rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-[#e2e8f0] rounded mb-1"></div>
                  <div className="w-1/2 h-2 bg-[#e2e8f0] rounded"></div>
                </div>
                <div className="w-2/3 bg-[#111827] p-2">
                  <div className="w-full h-16 bg-[#1e2939] rounded"></div>
                </div>
              </div>
            </div>
            <span className="text-sm">{t("settings.general.system")}</span>
          </div>
        </div>
      </div>

      {/* Language and Time Section */}
      <div>
        <h2 className="text-l md:text-xl font-semibold mb-4 text-right">
          {t("settings.general.languageAndTime")}
        </h2>
        <div className="border-t border-border mb-6"></div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-medium">
                {t("settings.general.language")}
              </h3>
              <p className="text-sm text-muted-foreground w-full md:w-auto">
                {t("settings.general.languageDescription")}
              </p>
            </div>
            <div className="flex gap-6 mt-3 md:m-0">
              <RadioGroup
                value={selectedLang}
                onValueChange={(lang) => handleLanguageChange(lang)}
                className="flex gap-8"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="ar" id="arabic" />
                  <Label htmlFor="arabic">العربية</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="fr" id="french" />
                  <Label htmlFor="french">Français</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="en" id="english" />
                  <Label htmlFor="english">English</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="justify-between items-center pt-4 hidden">
            <div className="flex flex-col items-end">
              <h3 className="text-l font-medium">
                تحديد المنطقة الزمنية تلقائيا باستخدام الموقع
              </h3>
              <p className="text-sm text-muted-foreground">
                سيتم ضبط التوقيت والإشعارات تلقائيا حسب موقعك الجغرافي
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={autoTimeZone}
                onCheckedChange={setAutoTimeZone}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Kindergarten Information Section */}
      <div>
        <h2 className="text-l md:text-xl font-semibold mb-4 rtl:text-right">
          {t("settings.general.kindergartenInfo")}
        </h2>
        <div className="border-t border-border mb-6"></div>

        <div className="space-y-6 max-w-lg">
          <div className="flex justify-between">
            <h3 className="md:text-lg font-medium">{t("settings.general.kindergartenCategories")}</h3>
            <CategoryModal
              onAddCategory={handleAddCategory}
              isLimited={categories.length >= config?.limits?.categories}
            />
          </div>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category._id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted"
              >
                <span className="text-sm font-medium">{category.name}</span>
                <div className="flex gap-2">
                  <CategoryModal
                    editingCategory={category}
                    onUpdateCategory={handleUpdateCategory}
                  />
                  <DeleteAlertDialog
                    item={category._id}
                    onDelete={handleDeleteCategory}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
