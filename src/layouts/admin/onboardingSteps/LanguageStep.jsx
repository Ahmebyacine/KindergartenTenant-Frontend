import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { ChevronRight } from "lucide-react";
import api from "@/api";
import i18n from "@/i18n";
import { updateDocumentDirection } from "@/utils/updateDocumentDirection";
import { t } from "i18next";

export default function LanguageStep({ onNext }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const languages = [
    { id: "ar", name: "العربية", flag: "DZ" },
    { id: "en", name: "English", flag: "US" },
    { id: "fr", name: "Français", flag: "FR" },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/onboarding/language", { language: selectedLanguage });
      i18n.changeLanguage(selectedLanguage)
      updateDocumentDirection(selectedLanguage);
      onNext();
    } catch {
      setError(t("onboarding.errorSave"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{t("onboarding.language.title")}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {languages.map((language) => (
          <Card
            key={language.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 rounded-2xl ${
              selectedLanguage === language.id
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
            onClick={() => {
              setSelectedLanguage(language.id);
              setError("");
            }}
          >
            <CardContent className="py-2 text-center">
              <ReactCountryFlag
                countryCode={language.flag}
                svg
                style={{ width: "2em", height: "2em" }}
              />
              <div className="text-l font-medium mt-2">{language.name}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {error && <p className="text-descrutive mb-4">{error}</p>}

      {/* Navigation Buttons */}
      <div className="flex justify-end items-center mt-8">
        <Button
          onClick={handleSubmit}
          disabled={loading || !selectedLanguage}
          className={`flex items-center gap-2 rounded-xl px-8 py-3 text-base font-medium`}
        >
          {loading ? t("common.saving") : t("common.next")}
          {!loading && <ChevronRight className="w-4 h-4 rtl:rotate-180" />}
        </Button>
      </div>
    </div>
  );
}
