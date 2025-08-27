import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryModal from "../categories/CategoryModal";
import api from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { t } from "i18next";

export default function CategoryStep({ onNext, onPrevious }) {
  const { config } = useAuth();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setCategories([
      { name: t("onboarding.categories.nursery") },
      { name: t("onboarding.categories.preparatory") },
      { name: t("onboarding.categories.kindergarten") },
    ]);
  }, []);
  const handleCategoryToggle = (categoryName) => {
    if (typeof categoryName !== "string") return;

    setSelectedCategories((prev) => {
      const alreadySelected = prev.includes(categoryName);

      // If already selected → remove it
      if (alreadySelected) {
        return prev.filter((name) => name !== categoryName);
      }

      // If adding exceeds the limit → block it
      if (prev.length >= config.limits.categories) {
        toast.warning(t("onboarding.limitReached", { limit: config.limits.categories }));
        return prev;
      }

      // Otherwise, add it
      return [...prev, categoryName];
    });
  };

  const handleAddCustomCategory = (customCategory) => {
    const name = String(customCategory?.name || "").trim();
    if (!name) return;

    // Prevent adding more than the limit
    if (selectedCategories.length >= config.limits.categories) {
      toast.warning(t("onboarding.limitReached", { limit: config.limits.categories }));
      return;
    }

    setCategories((prev) =>
      prev.some((cat) => cat.name === name) ? prev : [...prev, { name }]
    );

    setSelectedCategories((prev) =>
      prev.includes(name) ? prev : [...prev, name]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/onboarding/categories", {
        categories: selectedCategories,
      });
      onNext();
    } catch {
      setError(t("onboarding.errorSave"));
    } finally {
      setLoading(false);
    }
  };
  console.log(selectedCategories);
  return (
    <div className="text-center">
      <div className="mb-3">
        <h2 className="text-xl font-semibold">
          {t("onboarding.categories.title")}
        </h2>
      </div>

      <Card className="max-w-md mx-auto">
        <CardContent className="text-center">
          <div className="space-y-3">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.name);

              return (
                <div
                  key={category.name}
                  className={`flex items-center px-4 py-3 border rounded-xl cursor-pointer gap-3 transition-colors duration-150
            ${isSelected ? "bg-muted border-primary" : "hover:bg-muted/50"}
          `}
                  onClick={() => handleCategoryToggle(category.name)}
                >
                  <Checkbox
                    id={category.name}
                    checked={isSelected}
                    onCheckedChange={() => handleCategoryToggle(category.name)}
                    className="rounded-md border-2 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className="text-base font-medium">{category.name}</span>
                </div>
              );
            })}

            <div className="pt-2">
              <CategoryModal
                onAddCategory={handleAddCustomCategory}
                isLimited={
                  selectedCategories.length >= config.limits.categories
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
      {error && <p className="text-destructive mb-4">{error}</p>}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <Button onClick={onPrevious} disabled={loading} variant="ghost">
          <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          <span className="text-base">{t("common.previous")}</span>
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={loading || !selectedCategories}
          className={`flex items-center gap-2 rounded-xl px-8 py-3 text-base font-medium`}
        >
          {loading ? t("common.saving") : t("common.next")}
          {!loading && <ChevronRight className="w-4 h-4 rtl:rotate-180" />}
        </Button>
      </div>
    </div>
  );
}
