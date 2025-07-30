import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/services/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";

export default function CurrencyStep({ onNext, onPrevious }) {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const currencys = [
    { id: "DZD", name: "دينار جزائري (DZD)", flag: "DZ" },
    //{ id: "USD", name: "English", flag: "US" },
    //{ id: "EUR", name: "Français", flag: "EU" },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/onboarding/currency", { currency: selectedCurrency });
      onNext();
    } catch {
      setError("حدث خطأ أثناء الحفظ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="mb-6">
        <h2 className="text-xl font-semibold ">
          ما هي العملة التي تستخدمها في الروضة الخاصة بك؟
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {currencys.map((currency) => (
          <Card
            key={currency.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 rounded-2xl col-start-2 col-end-3 ${
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
          <span className="text-base">السابق</span>
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={loading || !selectedCurrency}
          className={`flex items-center gap-2 rounded-xl px-8 py-3 text-base font-medium`}
        >
          {loading
            ? "جاري الحفظ..."
            : "التالي"}
          {!loading && <ChevronRight className="w-4 h-4 rtl:rotate-180" />}
        </Button>
      </div>
    </div>
  );
}
