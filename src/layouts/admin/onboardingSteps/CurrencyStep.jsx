import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { t } from "i18next";

export default function CurrencyStep({ onNext, onPrevious }) {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const currencys = [
    { id: "DZD", name: t("onboarding.currency.dzd"), flag: "DZ" },
    { id: "LYD", name: t("onboarding.currency.lyd"), flag: "LY" },
    //{ id: "USD", name: t("onboarding.currency.usd"), flag: "US" },
    //{ id: "EUR", name: t("onboarding.currency.eur"), flag: "EU" },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/onboarding/currency", { currency: selectedCurrency });
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
        <h2 className="text-xl font-semibold">
          {t("onboarding.currency.title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:px-25 gap-6 mb-16">
        {currencys.map((currency) => (
          <Card
            key={currency.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 rounded-2xl  ${
              //if add other languges delete  col-start-2 col-end-3
              selectedCurrency === currency.id
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
            onClick={() => setSelectedCurrency(currency.id)}
          >
            <CardContent className="py-2 text-center">
              <ReactCountryFlag
                countryCode={currency.flag}
                svg
                style={{ width: "2em", height: "2em" }}
              />
              <div className="text-l font-medium mt-2">{currency.name}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <Button
          onClick={onPrevious}
          disabled={loading}
          variant="ghost"
        >
          <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          <span className="text-base">{t("common.previous")}</span>
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={loading || !selectedCurrency}
          className={`flex items-center gap-2 rounded-xl px-8 py-3 text-base font-medium`}
        >
          {loading
            ? t("common.saving")
            : t("common.next")}
          {!loading && <ChevronRight className="w-4 h-4 rtl:rotate-180" />}
        </Button>
      </div>
    </div>
  );
}
