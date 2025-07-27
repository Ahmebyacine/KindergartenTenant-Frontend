import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";

export function ClassStep({ classes, categories, onUpdate }) {
  const [newClass, setNewClass] = useState({
    name: "",
    categoryId: "",
    capacity: 20,
    price: 0,
  });

  const addClass = () => {
    if (!newClass.name.trim() || !newClass.categoryId) return;

    const classToAdd = {
      name: newClass.name,
      categoryId: newClass.categoryId,
      capacity: newClass.capacity,
      price: newClass.price,
    };
    onUpdate([...classes, classToAdd]);
    setNewClass({ name: "", categoryId: "", capacity: 20,price: 0 });
  };

  const removeClass = (id) => {
    onUpdate(classes.filter((cls) => cls.name !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            إضافة فصل جديد
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Label htmlFor="className">اسم الفصل *</Label>
            <Input
              id="className"
              value={newClass.name}
              onChange={(e) =>
                setNewClass((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="مثال: الفصل الأزرق"
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="category">الفئة *</Label>
            <Select
              value={newClass.categoryId}
              onValueChange={(value) =>
                setNewClass((prev) => ({ ...prev, categoryId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label htmlFor="capacity">السعة القصوى</Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              max="50"
              value={newClass.capacity}
              onChange={(e) =>
                setNewClass((prev) => ({
                  ...prev,
                  capacity: Number.parseInt(e.target.value) || 20,
                }))
              }
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="price">السعر</Label>
            <Input
              id="price"
              type="number"
              value={newClass.price}
              onChange={(e) =>
                setNewClass((prev) => ({
                  ...prev,
                  price: Number.parseInt(e.target.value) || 0,
                }))
              }
            />
          </div>

          <Button
            onClick={addClass}
            disabled={!newClass.name.trim()}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            إضافة الفصل
          </Button>
        </CardContent>
      </Card>

      {classes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">الفصول المضافة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-8 h-8 text-green-500" />
                      <div>
                        <h4 className="font-medium">{classItem.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">
                            السعة: {classItem.capacity}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            السعر: {formatCurrencyDZD(classItem.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeClass(classItem.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {classes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>يرجى إضافة فصل واحد على الأقل للمتابعة</p>
        </div>
      )}
    </div>
  );
}
