import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import api from "@/api";
import { t } from "i18next";

// Validation schema
const formSchema = z.object({
  className: z.string().min(1, "اسم الفصل مطلوب"),
  category: z.string().min(1, "اختر فئة"),
  capacity: z.number().min(2, "السعة يجب أن تكون رقمًا"),
  price: z.number().min(0, "السعر يجب أن يكون رقمًا"),
});

export default function ClassStep({ onNext, onPrevious }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchCategories = async () => {
      const response = await api.get("/categories");
      return response.data;
    };

  const { data: categories }  = useFetch(fetchCategories)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: "",
      category: "",
      capacity: 20,
      price: 0,
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await api.post("/onboarding/first-class", values);
      onNext();
    } catch {
      setError(t("onboarding.errorSave"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="mb-3">
        <h2 className="text-xl font-semibold">{t("onboarding.class.title")}</h2>
      </div>

      <Card className="max-w-md mx-auto">
        <CardContent className="text-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pt-2"
            >
              <div className="grid grid-cols-1 gap-4">
                {/* Class Name */}
                <FormField
                  control={form.control}
                  name="className"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        {t("onboarding.class.className")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rtl:text-right"
                          placeholder={t("onboarding.class.classNamePlaceholder")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        {t("onboarding.class.category")}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rtl:text-right">
                            <SelectValue placeholder={t("onboarding.class.categoryPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Capacity */}
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        {t("onboarding.class.capacity")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        {t("onboarding.class.price")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min="0"
                          placeholder={t("onboarding.class.pricePlaceholder")}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <Button onClick={onPrevious} disabled={loading} variant="ghost">
          <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          <span className="text-base">{t("common.previous")}</span>
        </Button>

        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={loading}
          className={`flex items-center gap-2 rounded-xl px-8 py-3 text-base font-medium`}
        >
          {loading ? t("common.saving") : t("common.next")}
          {!loading && <ChevronRight className="w-4 h-4 rtl:rotate-180" />}
        </Button>
      </div>
    </div>
  );
}
