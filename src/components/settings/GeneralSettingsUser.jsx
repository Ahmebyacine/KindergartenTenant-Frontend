import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/themeProvider";
import i18n from "@/i18n";
export function GeneralSettingsUser() {
  const { theme, setTheme } = useTheme();
  const [autoTimeZone, setAutoTimeZone] = useState(true);
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  useEffect(() => {
    const onLangChange = (lng) => setSelectedLang(lng);
    i18n.on("languageChanged", onLangChange);
    return () => i18n.off("languageChanged", onLangChange);
  }, []);

  const updateDocumentDirection = (lng) => {
    document.documentElement.lang = lng;
    const dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    localStorage.setItem("i18n-direction", dir);
  };
  
  return (
    <div className="space-y-8">
      {/* Preferences Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-right">التفضيلات</h2>
      </div>

      {/* Appearance Section */}
      <div className="space-y-4">
        <div className="flex flex-col justify-start">
          <h3 className="text-xl font-medium">المظهر</h3>
          <p className="text-sm text-muted-foreground">
            اختر المظهر الافتراضي للنظام
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-start gap-6 mt-4">
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "w-[200px] h-[120px] border rounded-lg overflow-hidden cursor-pointer",
                theme === "dark" ? "border-primary border-2" : "border-border"
              )}
              onClick={() => setTheme("dark")}
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
            <span className="text-sm">داكن</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "w-[200px] h-[120px] border rounded-lg overflow-hidden cursor-pointer",
                theme === "light" ? "border-primary border-2" : "border-border"
              )}
              onClick={() => setTheme("light")}
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
            <span className="text-sm">فاتح</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "w-[200px] h-[120px] border rounded-lg overflow-hidden cursor-pointer",
                theme === "system" ? "border-primary border-2" : "border-border"
              )}
              onClick={() => setTheme("system")}
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
            <span className="text-sm">النظام</span>
          </div>
        </div>
      </div>

      {/* Language and Time Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-right">اللغة والوقت</h2>
        <div className="border-t border-border mb-6"></div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-medium">اللغة</h3>
              <p className="text-sm text-muted-foreground w-full md:w-auto">
                قم بتغيير لغة واجهة النظام
              </p>
            </div>
            <div className="flex gap-6 mt-3 md:m-0">
              <RadioGroup
                value={selectedLang}
                onValueChange={(lang) => {
                  i18n.changeLanguage(lang);
                  updateDocumentDirection(lang);
                  setSelectedLang(lang);
                }}
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

          <div className="flex justify-between items-center pt-4">
            <div className="flex flex-col items-end">
              <h3 className="text-lg font-medium">
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
    </div>
  );
}
