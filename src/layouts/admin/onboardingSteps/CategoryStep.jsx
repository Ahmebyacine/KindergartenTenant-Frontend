import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryModal from "../categories/CategoryModal";
import api from "@/services/api";

export default function CategoryStep({ onNext, onPrevious }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([
    { name: "حضانة" },
    { name: "تمهيدي" },
    { name: "تحضيري" },
  ]);

  const handleCategoryToggle = (categoryName) => {
  setSelectedCategories((prev) =>
    prev.includes(categoryName)
      ? prev.filter((name) => name !== categoryName)
      : [...prev, categoryName]
  );
};

  const handleAddCustomCategory = (customCategory) => {
    if (!categories.some((cat) => cat.name === customCategory.name)) {
      setCategories((prev) => [...prev, { name: customCategory.name }]);
    }
    if (!selectedCategories.includes(customCategory.name)) {
      setSelectedCategories((prev) => [...prev, customCategory.name]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/onboarding/categories", {
        categories: selectedCategories,
      });
      onNext();
    } catch {
      setError("حدث خطأ أثناء الحفظ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="mb-3">
        <h2 className="text-xl font-semibold">
          ما هي الفئات الموجودة في الروضة الخاصة بك؟
        </h2>
      </div>

      <Card className="max-w-md mx-auto">
        <CardContent className="text-center">
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`flex items-center px-3 py-2 border border-border rounded-xl cursor-pointer transition-colors gap-4 ${
                  selectedCategories.includes(category.name)
                    ? "bg-gray-100 border-primary"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleCategoryToggle(category.name)}
              >
                <Checkbox
                  id={category.name}
                  checked={selectedCategories.includes(category.name)}
                  onCheckedChange={handleCategoryToggle}
                  className="rounded-md border-2 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-l font-medium">{category.name}</span>
              </div>
            ))}
            <CategoryModal onAddCategory={handleAddCustomCategory} />
          </div>
        </CardContent>
      </Card>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <Button onClick={onPrevious} disabled={loading} variant="ghost">
          <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          <span className="text-base">السابق</span>
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={loading || !selectedCategories}
          className={`flex items-center gap-2 rounded-xl px-8 py-3 text-base font-medium`}
        >
          {loading ? "جاري الحفظ..." : "التالي"}
          {!loading && <ChevronRight className="w-4 h-4 rtl:rotate-180" />}
        </Button>
      </div>
    </div>
  );
}
