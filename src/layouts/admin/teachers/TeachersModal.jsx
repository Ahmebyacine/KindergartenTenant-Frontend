import { useForm } from "react-hook-form";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Add } from "iconsax-react";
import ImageUpload from "@/components/ImageUpload";
import { generateRandomPassword } from "@/utils/generateRandomPassword";

const teacherSchema = z.object({
  name: z.string().min(3, "يجب أن يكون الاسم على الأقل 3 أحرف"),
  email: z.string().email("بريد إلكتروني غير صحيح"),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, "رقم هاتف غير صحيح"),
  assignedClass: z.string().min(1, "يجب اختيار القسم").optional(),
  image: z.any().optional(),
});

export default function TeachersModal({
  onAddTeacher,
  onUpdateTeacher,
  editingTeacher = null,
  classes,
}) {
  const form = useForm({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      name: editingTeacher?.name || "",
      email: editingTeacher?.email || "",
      phone: editingTeacher?.phone || "",
      assignedClass: editingTeacher?.assignedClass?._id || "",
      image: editingTeacher?.image || null,
    },
  });

  const onSubmit = async (data) => {
    if (editingTeacher) {
      await onUpdateTeacher({ ...editingTeacher, ...data });
    } else {
      const teacherData = {
        ...data,
        role: "teacher",
        password: generateRandomPassword(12),
      };
      await onAddTeacher(teacherData);
    }
    form.reset();
  };

  return (
    <div className="bg-background flex items-center">
      <Dialog>
        <DialogTrigger asChild>
          {editingTeacher ? (
            <Button
              variant="link"
              size="sm"
              className="text-primary hover:text-primary/80 p-1 h-auto underline text-xs sm:text-sm justify-start sm:justify-center"
            >
              تعديل
            </Button>
          ) : (
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2 flex items-center gap-2">
              <Add size="20" color="currentColor" />
              اضافة معلم
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="w-full sm:max-w-2xl bg-card p-2 sm:p-6 rounded-lg sm:rounded-2xl overflow-y-auto">
          <DialogHeader className="border-b-2 pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
              <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground rtl:text-right ltr:text-left w-full">
                {editingTeacher ? "تعديل معلومات المعلم" : "إضافة معلم جديد"}
              </DialogTitle>
            </div>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 max-h-[70vh] overflow-y-auto pt-2 px-1 sm:px-2"
            >
              {/* Tabs for Basic Info and Image */}
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="w-full flex justify-between bg-transparent border-b border-border px-1">
                  <TabsTrigger
                    value="basic"
                    className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
                  >
                    معلومات أساسية
                  </TabsTrigger>
                  <TabsTrigger
                    value="image"
                    className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
                  >
                    معلومات إضافية
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 pt-4">
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-muted-foreground">
                          الاسم الكامل
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="text-right" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-muted-foreground">
                          البريد الإلكتروني
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            dir="ltr"
                            className="text-right"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-muted-foreground">
                          رقم الهاتف
                        </FormLabel>
                        <FormControl>
                          <Input {...field} dir="ltr" className="text-right" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* assignedClass */}
                  <FormField
                    control={form.control}
                    name="assignedClass"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>القسم</FormLabel>
                        {!classes || classes.length === 0 ? (
                          <Select disabled>
                            <FormControl>
                              <SelectTrigger className="text-right">
                                <SelectValue
                                  placeholder={
                                    classes === undefined
                                      ? "جاري تحميل الأقسام..."
                                      : "لا يوجد أقسام متاحة"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                          </Select>
                        ) : (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="text-right">
                                <SelectValue placeholder="اختر القسم" />
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
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Information */}
                  {!editingTeacher && (
                    <div>
                      <div className="text-base font-medium text-muted-foreground">
                        معلومات الدخول
                      </div>
                      <div className="bg-muted/50 p-1 rounded-lg">
                        <div className="text-sm text-muted-foreground">
                          سيتم إنشاء كلمة مرور عشوائية وإرسالها إلى بريد المعلم
                          الإلكتروني
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="image" className="pt-4">
                  <div className="text-base font-medium text-muted-foreground pb-2">
                    صورة المعلم (اختياري)
                  </div>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>
            </form>
          </Form>

          <DialogFooter>
            <div className="flex flex-col sm:flex-row w-full md:w-1/2 gap-3 pt-4">
              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                disabled={editingTeacher && !form.formState.isDirty}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium disabled:opacity-50"
              >
                {editingTeacher ? "تحديث" : "حفظ"}
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
    </div>
  );
}
