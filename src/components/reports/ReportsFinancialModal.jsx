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

// Updated schema with student instead of childName
const financialReportSchema = z.object({
  student: z.string().min(1, "مطلوب"),
  classId: z.string().min(1, "مطلوب"),
  month: z.string().min(1, "مطلوب"),
  amount: z.number().min(1, "يجب أن يكون المبلغ أكبر من 0"),
  status: z.enum(["paid", "unpaid"]),
  notes: z.string().optional(),
});

export default function ReportsFinancialModal({onAddReport, classes, children }) {
  const [filteredChildren, setFilteredChildren] = useState([]);

  const form = useForm({
    resolver: zodResolver(financialReportSchema),
    defaultValues: {
      student: "",
      classId: "",
      month: "",
      amount: null,
      status: "",
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

  const onSubmit = (data) => {
    onAddReport(data);
    form.reset();
  };

  const academicYearMonths = getAcademicYearMonths();
  return (
    <div className="bg-background px-2 flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2 flex items-center gap-2">
            <Add size="20" color="currentColor" />
            إضافة تقرير
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full max-w-full sm:max-w-2xl bg-card p-6 rounded-lg sm:rounded-2xl">
          <DialogHeader className="border-b-2 pb-4">
              <DialogTitle className="text-lg sm:text-xl font-semibold rtl:text-right ltr:text-left text-foreground">
                إضافة تقرير مالي
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                      <div className="space-y-2">
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
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Month */}
                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-muted-foreground">
                        الشهر
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-right">
                            <SelectValue placeholder="اختر الشهر" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {academicYearMonths.map((month) => (
                            <SelectItem key={month.iso} value={month.iso}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        المبلغ (دج)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="text-right"
                          placeholder="8000"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
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
                        الحالة
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-right">
                            <SelectValue placeholder="اختر الحالة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="paid">مدفوع</SelectItem>
                          <SelectItem value="unpaid">غير مدفوع</SelectItem>
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
                      ملاحظات
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="text-right min-h-[100px]"
                        placeholder="بانتظار السداد من ولي الأمر"
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
    </div>
  );
}
