import ImageUpload from "@/components/ImageUpload";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { t } from "i18next";

export default function PhotoReviewStep({ form }) {
  return (
    <div className="space-y-6">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("students.studentPhoto")}</FormLabel>
              <FormControl>
                <ImageUpload value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    </div>
  );
}