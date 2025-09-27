import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { t } from "i18next";

export default function ParentInfoStep({ form }) {
  return (
    <div className="space-y-6">
      {/* Father Info */}
      <div className="space-y-4">
        <h4 className="font-medium text-muted-foreground">
          {t("students.fatherInfo")}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="parents.father.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("students.fatherName")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parents.father.profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("students.fatherProfession")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Mother Info */}
      <div className="space-y-4">
        <h4 className="font-medium text-muted-foreground">
          {t("students.motherInfo")}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="parents.mother.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("students.motherName")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parents.mother.profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("students.motherProfession")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Guardian & Contact Info */}
      <div className="space-y-4">
        <h4 className="font-medium text-muted-foreground">
          {t("students.contactInfo")}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="parents.guardian.relation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("students.guardianRelation")}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("students.selectRelation")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="father">
                      {t("students.father")}
                    </SelectItem>
                    <SelectItem value="mother">
                      {t("students.mother")}
                    </SelectItem>
                    <SelectItem value="other">{t("students.other")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("parents.guardian.relation") === "other" && (
            <FormField
              control={form.control}
              name="parents.guardian.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("students.guardianName")}</FormLabel>
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
            name="parents.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("students.parentEmail")}</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parents.contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("students.primaryContact")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parents.secondaryContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("students.secondaryContact")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parents.thirdContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("students.thirdContact")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
