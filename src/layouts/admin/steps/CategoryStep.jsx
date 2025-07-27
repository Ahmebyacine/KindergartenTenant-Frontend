import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Users } from "lucide-react";

const predefinedCategories = [
  {
    name: "حضانة",
    nameAr: "حضانة",
    ageRange: "2-3 years",
  },
  {
    name: "تمهيدي",
    ageRange: "3-4 years",
  },
  {
    name: "تحضيري",
    ageRange: "4-5 years",
  },
];

export function CategoryStep({ categories, onUpdate }) {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customCategory, setCustomCategory] = useState({
    name: "",
    description: "",
    ageRange: "",
  });

  const togglePredefinedCategory = (predefined) => {
    const isSelected = categories.some((cat) => cat.name === predefined.name);
    const newCategory = {
      name: predefined.name,
      ageRange: predefined.ageRange,
    };

    if (isSelected) {
      onUpdate(categories.filter((cat) => cat.name !== predefined.name));
    } else {
      onUpdate([...categories, newCategory]);
    }
  };

  const addCustomCategory = () => {
    if (!customCategory.name.trim()) return;

    const newCategory = {
      name: customCategory.name,
      ageRange: customCategory.ageRange,
    };
    onUpdate([...categories, newCategory]);
    setCustomCategory({ name: "", ageRange: "" });
    setShowCustomForm(false);
  };

  const removeCategory = (id) => {
    onUpdate(categories.filter((cat) => cat.name !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">
          اختر من الفئات المحددة مسبقاً
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predefinedCategories.map((category, index) => (
            <Card
              key={index}
              className={`cursor-pointer hover:shadow-md transition-shadow border-2 ${
                categories.some((cat) => cat.name === category.name)
                  ? "border-primary/50"
                  : "border-transparent"
              }`}
              onClick={() => togglePredefinedCategory(category)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-500" />
                  <div>
                    <h4 className="font-medium">{category.name}</h4>
                    <p className="text-sm text-muted-foreground">{category.ageRange}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <span className="text-muted-foreground">أو</span>
      </div>

      <div>
        <Button
          variant="outline"
          onClick={() => setShowCustomForm(!showCustomForm)}
          className="mb-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          إنشاء فئة مخصصة
        </Button>

        {showCustomForm && (
          <Card>
            <CardHeader>
              <CardTitle>فئة مخصصة جديدة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Label htmlFor="categoryName">اسم الفئة *</Label>
                <Input
                  id="categoryName"
                  value={customCategory.name}
                  onChange={(e) =>
                    setCustomCategory((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="أدخل اسم الفئة"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={addCustomCategory}
                  disabled={!customCategory.name.trim()}
                >
                  إضافة الفئة
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCustomForm(false)}
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {categories.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">الفئات المحددة</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{category.name}</h4>
                    {category.ageRange && (
                      <Badge variant="secondary">{category.ageRange}</Badge>
                    )}
                  </div>
                  {category.description && (
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCategory(category.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {categories.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>يرجى اختيار فئة واحدة على الأقل للمتابعة</p>
        </div>
      )}
    </div>
  );
}
