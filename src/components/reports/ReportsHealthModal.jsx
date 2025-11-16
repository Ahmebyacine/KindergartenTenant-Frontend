import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Add } from "iconsax-react";
import { useEffect, useState } from "react";
import { t } from "i18next";

// Updated schema with student instead of childName
const healthReportSchema = (t) =>
  z.object({
    student: z.string().min(1, t("common.required")),
    classId: z.string().min(1, t("common.required")),
    observationTime: z.string().min(1, t("common.required")),
    conditionType: z.string().min(1, t("common.required")),
    conditionAssessment: z.string().min(1, t("common.required")),
    actionTaken: z.boolean(),
    actionType: z.string().optional(),
    notes: z.string().optional(),
  });

export default function ReportsHealthModal({ onAddReport, classes, children }) {
  const [filteredChildren, setFilteredChildren] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(healthReportSchema(t)),
    defaultValues: {
      student: "",
      classId: "",
      observationTime: "",
      conditionType: "",
      conditionAssessment: "",
      actionTaken: true,
      actionType: "",
      notes: "",
    },
  });

  const classId = form.watch("classId");
  const actionTaken = form.watch("actionTaken");

  // Filter children based on selected class and search query
  useEffect(() => {
    let result = children || [];

    // Filter by class
    if (classId) {
      result = result.filter((child) => child.class?._id === classId);
    }

    setFilteredChildren(result);
  }, [classId, children]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await onAddReport(data);
      form.reset();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const conditionTypes = [
    { value: "fever" },
    { value: "cough" },
    { value: "fatigue" },
    { value: "nausea" },
    { value: "injury" },
  ];

  // Condition assessments
  const conditionAssessments = [
    { value: "mild" },
    { value: "moderate" },
    { value: "severe" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Add size="20" color="currentColor" />
          {t("reports.addReport")}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-full sm:max-w-2xl bg-card p-6 rounded-lg sm:rounded-2xl">
        <DialogHeader className="border-b-2 pb-4">
          <DialogTitle className="text-lg sm:text-xl rtl:text-right ltr:text-left font-semibold text-foreground">
            {t("reports.health.addHealthReport")}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-h-[70vh] overflow-y-auto pt-2 px-1 sm:px-2"
            dir="rtl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Class Selection */}
              <FormField
                control={form.control}
                name="classId"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.health.class")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rtl:text-right">
                          <SelectValue
                            placeholder={t("reports.health.selectClass")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls._id} value={cls._id}>
                            {cls.className}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Child Selection with Search */}
              <FormField
                control={form.control}
                name="student"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.health.childName")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!classId}
                    >
                      <FormControl>
                        <SelectTrigger className="rtl:text-right">
                          <SelectValue
                            placeholder={t("reports.health.selectChild")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        {filteredChildren?.length > 0 ? (
                          filteredChildren?.map((child) => (
                            <SelectItem
                              key={child.student._id}
                              value={child?.student?._id}
                            >
                              {child?.student?.firstName}{" "}
                              {child?.student?.lastName}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>
                            {t("reports.health.noChildren")}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Observation Time */}
              <FormField
                control={form.control}
                name="observationTime"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.health.observationTime")}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="rtl:text-right" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Condition Type */}
              <FormField
                control={form.control}
                name="conditionType"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.health.conditionType")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rtl:text-right">
                          <SelectValue
                            placeholder={t(
                              "reports.health.selectConditionType"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {conditionTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {t(`reports.health.conditionTypes.${type.value}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Condition Assessment */}
              <FormField
                control={form.control}
                name="conditionAssessment"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.health.conditionAssessment")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rtl:text-right">
                          <SelectValue
                            placeholder={t(
                              "reports.health.selectConditionAssessment"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {conditionAssessments.map((assessment) => (
                          <SelectItem
                            key={assessment.value}
                            value={assessment.value}
                          >
                            {t(
                              `reports.health.conditionAssessments.${assessment.value}`
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Taken */}
              <FormField
                control={form.control}
                name="actionTaken"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.health.actionTaken")}
                    </FormLabel>
                    <div className="flex gap-4">
                      {[
                        { label: t("common.yes"), value: true },
                        { label: t("common.no"), value: false },
                      ].map(({ label, value }) => (
                        <label
                          key={label}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            value={String(value)}
                            checked={field.value === value}
                            onChange={() => field.onChange(value)}
                            className="text-primary"
                          />
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Type (conditional) */}
              {actionTaken && (
                <FormField
                  control={form.control}
                  name="actionType"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-muted-foreground">
                        {t("reports.health.actionType")}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="rtl:text-right" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-muted-foreground">
                    {t("common.notes")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="text-right"
                      placeholder="لاحظت احمراراً في وجه الطفل وتعباً واضحاً. تم قياس حرارته وإراحته في غرفة العيادة، وتم إبلاغ ولي الأمر هاتفياً!"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        {/* Action Buttons */}
        <DialogFooter>
          <div className="flex w-full md:w-1/2 gap-3 pt-4">
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              disabled={loading}
            >
              {loading ? t("common.loading") : t("common.save")}
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 border-border text-muted-foreground hover:bg-background"
                onClick={() => {
                  form.reset();
                }}
              >
                {t("common.cancel")}
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
