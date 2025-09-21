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

// Updated report schema
const reportSchema = (t) => z.object({
  student: z.string().min(1, t("common.required")),
  classId: z.string().min(1, t("common.required")),
  languageCommunication: z.string().min(1, t("common.required")),
  behavior: z.string().min(1, t("common.required")),
  skills: z.string().min(1, t("common.required")),
  overall: z.string().min(1, t("common.required")),
  notes: z.string().optional(),
});

export default function ReportsPedagogicalModal({
  onAddReport,
  classes,
  children,
}) {
  const [filteredChildren, setFilteredChildren] = useState([]);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(reportSchema(t)),
    defaultValues: {
      student: "",
      classId: "",
      languageCommunication: "",
      behavior: "",
      skills: "",
      overall: "",
      notes: "",
    },
  });

  const classId = form.watch("classId");

  // Filter children based on selected class and search query
  useEffect(() => {
    let result = children;

    // Filter by class
    if (classId) {
      result = result?.filter((child) => child?.class?._id === classId);
    }
    setFilteredChildren(result);
  }, [classId, children]);

  const onSubmit = async (data) => {
    await onAddReport(data);
    form.reset();
    setOpen(false);
  };

  const evaluationOptions = [
    { value: "excellent" },
    { value: "very_good" },
    { value: "good" },
    { value: "acceptable" },
    { value: "weak" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Add size="20" color="currentColor" />
          {t("reports.addReport")}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-full sm:max-w-2xl bg-card p-2 sm:p-6 rounded-lg sm:rounded-2xl overflow-y-auto">
        <DialogHeader className="border-b-2 pb-4">
          <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground rtl:text-right ltr:text-left w-full">
            {t("reports.pedagogical.addPedagogicalReport")}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-h-[70vh] overflow-y-auto pt-2 px-1 sm:px-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Class Selection */}
              <FormField
                control={form.control}
                name="classId"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.pedagogical.class")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rtl:text-right">
                          <SelectValue placeholder={t("reports.pedagogical.selectClass")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {classes?.map((cls) => (
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
                  <FormItem className="space-y-1">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.pedagogical.childName")}
                    </FormLabel>
                    <div className="space-y-2">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!classId}
                      >
                        <FormControl>
                          <SelectTrigger className="rtl:text-right">
                            <SelectValue placeholder={t("reports.pedagogical.selectChild")} />
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
                              {t("reports.pedagogical.noChildren")}
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Language & Communication */}
              <FormField
                control={form.control}
                name="languageCommunication"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.pedagogical.languageAndCommunication")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rtl:text-right">
                          <SelectValue placeholder={t("reports.pedagogical.selectLanguageAndCommunication")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {evaluationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(`reports.pedagogical.evaluationOptions.${option.value}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Behavior */}
              <FormField
                control={form.control}
                name="behavior"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.pedagogical.behavior")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rtl:text-right">
                          <SelectValue placeholder={t("reports.pedagogical.selectBehavior")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {evaluationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(`reports.pedagogical.evaluationOptions.${option.value}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Skills */}
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.pedagogical.skills")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rtl:text-right">
                          <SelectValue placeholder={t("reports.pedagogical.selectSkills")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {evaluationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(`reports.pedagogical.evaluationOptions.${option.value}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Overall */}
              <FormField
                control={form.control}
                name="overall"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.pedagogical.overall")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rtl:text-right">
                          <SelectValue placeholder={t("reports.pedagogical.selectOverall")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {evaluationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(`reports.pedagogical.evaluationOptions.${option.value}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-muted-foreground">
                    {t("common.notes")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="rtl:text-right"
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
            >
              حفظ
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 border-border text-muted-foreground hover:bg-background"
              >
                إلغاء
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
