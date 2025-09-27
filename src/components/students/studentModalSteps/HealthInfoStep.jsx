import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { t } from "i18next";

export default function HealthInfoStep({ form }) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="healthStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("students.healthStatus")}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("students.selectHealthStatus")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="good">{t("students.good")}</SelectItem>
                <SelectItem value="needs_followup">
                  {t("students.needs_followup")}
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("healthStatus") === "needs_followup" && (
        <FormField
          control={form.control}
          name="illnessOrAllergy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("students.illnessOrAllergy")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="takesMedicineRegularly"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("students.takesMedicineRegularly")}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(val) => field.onChange(val === "yes")}
                value={field.value ? "yes" : "no"}
                className="flex rtl:justify-end gap-4"
              >
                <div className="flex items-center  space-x-2">
                  <RadioGroupItem value="yes" id="medicine-yes" />
                  <Label htmlFor="medicine-yes">{t("common.yes")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="medicine-no" />
                  <Label htmlFor="medicine-no">{t("common.no")}</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("takesMedicineRegularly") && (
        <FormField
          control={form.control}
          name="medicineDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("students.medicineDetails")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
