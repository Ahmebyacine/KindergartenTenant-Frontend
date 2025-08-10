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

// Updated report schema
const reportSchema = z.object({
  student: z.string().min(1, "مطلوب"),
  classId: z.string().min(1, "مطلوب"),
  languageCommunication: z.string().min(1, "مطلوب"),
  behavior: z.string().min(1, "مطلوب"),
  skills: z.string().min(1, "مطلوب"),
  overall: z.string().min(1, "مطلوب"),
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
    resolver: zodResolver(reportSchema),
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
    { label: "ممتاز", value: "excellent" },
    { label: "جيد جداً", value: "very_good" },
    { label: "جيد", value: "good" },
    { label: "مقبول", value: "acceptable" },
    { label: "ضعيف", value: "weak" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Add size="20" color="currentColor" />
          إضافة تقرير
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-full sm:max-w-2xl bg-card p-2 sm:p-6 rounded-lg sm:rounded-2xl overflow-y-auto">
        <DialogHeader className="border-b-2 pb-4">
          <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground rtl:text-right ltr:text-left w-full">
            إضافة تقرير بيداغوجي
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
                      الفصل
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="اختر الفصل" />
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Language & Communication */}
              <FormField
                control={form.control}
                name="languageCommunication"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-muted-foreground">
                      تقييم اللغة والتواصل
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="اختر التقييم" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {evaluationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
                      تقييم السلوك
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="اختر التقييم" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {evaluationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
                      تقييم المهارات
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="اختر التقييم" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {evaluationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
                      التقييم العام
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="اختر التقييم" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {evaluationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
                    ملاحظات
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="text-right"
                      placeholder="أظهر تحسناً في المهارات الحركية الدقيقة. ننصح بزيادة الأنشطة البدنية."
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
