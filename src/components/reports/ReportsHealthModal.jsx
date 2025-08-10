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

// Updated schema with student instead of childName
const healthReportSchema = z.object({
  student: z.string().min(1, "مطلوب"),
  classId: z.string().min(1, "مطلوب"),
  observationTime: z.string().min(1, "مطلوب"),
  conditionType: z.string().min(1, "مطلوب"),
  conditionAssessment: z.string().min(1, "مطلوب"),
  actionTaken: z.boolean(),
  actionType: z.string().optional(),
  notes: z.string().optional(),
});

export default function ReportsHealthModal({ onAddReport, classes, children }) {
  const [filteredChildren, setFilteredChildren] = useState([]);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(healthReportSchema),
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
    await onAddReport(data);
    form.reset();
  };

  const conditionTypes = [
    { value: "fever", label: "حرارة" },
    { value: "cough", label: "سعال" },
    { value: "fatigue", label: "إعياء" },
    { value: "nausea", label: "غثيان" },
    { value: "injury", label: "إصابة" },
  ];

  // Condition assessments
  const conditionAssessments = [
    { value: "mild", label: "خفيفة" },
    { value: "moderate", label: "متوسطة" },
    { value: "severe", label: "شديدة" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Add size="20" color="currentColor" />
          إضافة تقرير
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-full sm:max-w-2xl bg-card p-6 rounded-lg sm:rounded-2xl">
        <DialogHeader className="border-b-2 pb-4">
          <DialogTitle className="text-lg sm:text-xl rtl:text-right ltr:text-left font-semibold text-foreground">
            إضافة تقرير صحي
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
                      الفصل
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="اختر الفصل" />
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
                      اسم الطفل
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!classId}
                    >
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="اختر الطفل" />
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
                            لا يوجد أطفال
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
                      وقت الملاحظة
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-right"
                        placeholder="صباحاً 10:00"
                      />
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
                      نوع الحالة
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="اختر نوع الحالة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {conditionTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
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
                      تقييم الحالة
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="اختر التقييم" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {conditionAssessments.map((assessment) => (
                          <SelectItem
                            key={assessment.value}
                            value={assessment.value}
                          >
                            {assessment.label}
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
                      تم اتخاذ إجراء؟
                    </FormLabel>
                    <div className="flex gap-4">
                      {[
                        { label: "نعم", value: true },
                        { label: "لا", value: false },
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
                        نوع الإجراء
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-right"
                          placeholder="راحة في العيادة لمدة ساعة"
                        />
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
                    ملاحظات
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
            >
              حفظ
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 border-border text-muted-foreground hover:bg-background"
                onClick={() => {
                  form.reset();
                }}
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
