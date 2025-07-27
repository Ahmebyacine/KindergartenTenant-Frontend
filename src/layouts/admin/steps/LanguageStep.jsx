import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import i18n from "@/i18n";
import { updateDocumentDirection } from "@/utils/updateDocumentDirection";
import { Globe, DollarSign, Languages } from "lucide-react";

const languages = [
  { code: "en", name: "English", nameNative: "English" },
  { code: "ar", name: "Arabic", nameNative: "العربية" },
  { code: "fr", name: "French", nameNative: "Français" },
];

export function LanguageStep({ language, onUpdate }) {

  const handleLanguageChange =async (newLanguage) => {
    onUpdate(newLanguage);
    i18n.changeLanguage(newLanguage);
    updateDocumentDirection(newLanguage);
  };

  const selectedLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">مرحباً بك في Rawdatee!</h3>
        <p className="text-muted-foreground">
          لنبدأ بإعداد اللغة والعملة المفضلة لديك لتخصيص تجربتك
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language Selection */}
        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-primary" />
              اختيار اللغة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="language">اللغة المفضلة *</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="اختر اللغة" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{lang.code}</span>
                        <div>
                          <div className="font-medium">{lang.nameNative}</div>
                          <div className="text-sm text-muted-foreground">
                            {lang.name}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedLanguage && (
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{selectedLanguage.flag}</span>
                    <span className="font-medium">
                      {selectedLanguage.nameNative}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      {language && (
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-2 border-dashed border-blue-200">
          <CardContent className="p-6">
            <div className="text-center">
              <h4 className="font-semibold mb-3 flex items-center justify-center gap-2">
                <DollarSign className="w-5 h-5" />
                معاينة الإعدادات
              </h4>
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-primary" />
                  <span className="text-sm">
                    اللغة: <strong>{selectedLanguage?.nameNative}</strong>
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                يمكنك تغيير هذه الإعدادات لاحقاً من إعدادات النظام
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h4 className="font-medium mb-2">لماذا نحتاج هذه المعلومات؟</h4>
        <ul className="text-sm text-muted-foreground dark:text-gray-300 space-y-1">
          <li>• اللغة: لعرض واجهة النظام باللغة المفضلة لديك</li>
          <li>• العملة: لعرض الرسوم والمدفوعات بالعملة المحلية</li>
          <li>• "هذا يساعد في تخصيص تجربة أفضل لك وللأهالي"</li>
        </ul>
      </div>
    </div>
  );
}
