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
import { getAcademicYearMonths } from "@/utils/getAcademicYear";
import { t } from "i18next";
import { MultiSelect } from "../ui/multi-select";

// Updated schema with student instead of childName
const financialReportSchema = (t) =>
  z.object({
    student: z.string().min(1, t("common.required")),
    classId: z.string().min(1, t("common.required")),
    months: z.array(z.string().min(1, t("common.required"))),
    amount: z.number().min(1, t("reports.financial.amountMin")),
    status: z.enum(["paid", "unpaid"]),
    notes: z.string().optional(),
  });

export default function ReportsFinancialModal({
  onAddReport,
  classes,
  children,
}) {
  const [filteredChildren, setFilteredChildren] = useState([]);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(financialReportSchema(t)),
    defaultValues: {
      student: "",
      classId: "",
      months: [],
      amount: null,
      status: "paid",
      notes: "",
    },
  });

  const classId = form.watch("classId");

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
    await onAddReport(data);
    form.reset();
    setOpen(false);
  };

  const academicYearMonths = getAcademicYearMonths();
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
          <DialogTitle className="text-lg sm:text-xl font-semibold rtl:text-right text-foreground">
            {t("reports.financial.addReportFinancial")}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-h-[70vh] overflow-y-auto pt-2 px-1 sm:px-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Class Selection */}
              <FormField
                control={form.control}
                name="classId"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.financial.className")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rtl:text-right">
                          <SelectValue
                            placeholder={t("reports.financial.selectClass")}
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
                      {t("reports.financial.studentName")}
                    </FormLabel>
                    <div className="space-y-2">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!classId}
                      >
                        <FormControl>
                          <SelectTrigger className="rtl:text-right">
                            <SelectValue
                              placeholder={t("reports.financial.selectChild")}
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
                              {t("reports.financial.noChildren")}
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="months"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.financial.months")}
                    </FormLabel>

                    <FormControl>
                      <MultiSelect
                        options={academicYearMonths.map((month) => ({
                          label: month.label,
                          value: month.iso,
                        }))}
                        selected={
                          field.value?.map((v) => ({
                            label:
                              academicYearMonths.find((m) => m.iso === v)
                                ?.label || v,
                            value: v,
                          })) || []
                        }
                        onChange={(selectedOptions) =>
                          field.onChange(
                            selectedOptions.map((opt) => opt.value)
                          )
                        }
                        placeholder={t("reports.financial.selectMonth")}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.financial.amount")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="rtl:text-right"
                        placeholder="8000"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground">
                      {t("reports.financial.status")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rtl:text-right">
                          <SelectValue
                            placeholder={t("reports.financial.selectStatus")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="paid">
                          {t("reports.financial.paid")}
                        </SelectItem>
                        <SelectItem value="unpaid">
                          {t("reports.financial.unpaid")}
                        </SelectItem>
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
                <FormItem className="space-y-2">
                  <FormLabel className="text-muted-foreground">
                    {t("common.notes")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="rtl:text-right min-h-[100px]"
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
              {t("common.save")}
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
