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
import { User, Mail, Phone } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Add } from "iconsax-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { generateRandomPassword } from "@/utils/generateRandomPassword";
import { useEffect } from "react";
import ImageUpload from "@/components/ImageUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the form schema with validation
const userSchema = z.object({
  name: z.string().min(1, "الاسم الكامل مطلوب"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, "رقم هاتف غير صحيح"),
  role: z.enum(["teacher", "supervisor"], {
    required_error: "الدور مطلوب",
  }),
  image: z.any().optional(),
});

export default function UserModal({
  onAddUser,
  onUpdateUser,
  editingUser = null,
  open,
  onOpenChange,
}) {
  // Initialize the form
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: editingUser?.name || "",
      email: editingUser?.email || "",
      phone: editingUser?.phone || "",
      role: editingUser?.role || "teacher",
      image: editingUser?.image || null,
    },
  });
  useEffect(() => {
    form.reset({
      name: editingUser?.name || "",
      email: editingUser?.email || "",
      phone: editingUser?.phone || "",
      role: editingUser?.role || "teacher",
      image: editingUser?.image || null,
    });
  }, [editingUser, form]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("role", data.role);
    if (data.image && data.image instanceof File) {
      if (editingUser?.image){
        formData.append("oldImage",editingUser?.image)
      }
      formData.append("image", data.image);
    }
    if (editingUser.image && !data.image){
      formData.append("deleteImage", "true");
      formData.append("oldImage", editingUser.image);
    }
    if (!editingUser) {
      formData.append("password", generateRandomPassword(12));
    }
    if (editingUser) {
      onUpdateUser(formData, editingUser._id);
    } else {
      onAddUser(formData);
    }
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2 flex items-center gap-2">
          <Add size="20" color="currentColor" />
          إنشاء حساب جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-card border-border p-0">
        <div className="p-6">
          {/* Header */}
          <DialogHeader className="border-b-2 mb-4 pb-4">
            <DialogTitle className="text-lg sm:text-xl rtl:text-right font-semibold text-foreground">
              {editingUser ? "تعديل الحساب" : "إنشاء حساب جديد"}
            </DialogTitle>
          </DialogHeader>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    صورة المستخدم
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-2 pt-2">
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          الاسم الكامل
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-right border-border focus:border-primary focus:ring-primary"
                            placeholder="أحمد محمد"
                          />
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
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          البريد الإلكتروني
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="text-right border-border focus:border-primary focus:ring-primary"
                            placeholder="ahmed@example.com"
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
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          رقم الهاتف
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="text-right border-border focus:border-primary focus:ring-primary"
                            placeholder="+1234567890"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Role */}
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          الدور
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="text-right border-border focus:border-primary focus:ring-primary">
                              <SelectValue placeholder="اختر الدور" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="teacher">معلم</SelectItem>
                            <SelectItem value="supervisor">مراقب</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!editingUser && (
                    <div>
                      <div className="text-base font-medium text-muted-foreground">
                        معلومات الدخول
                      </div>
                      <div className="bg-muted/50 p-1 rounded-lg">
                        <div className="text-sm text-muted-foreground">
                          سيتم إنشاء كلمة مرور عشوائية وإرسالها إلى البريد
                          الإلكتروني
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="image" className="pt-4">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          صورة المستخدم (اختياري)
                        </FormLabel>
                        <FormControl>
                          <ImageUpload value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              {/* Buttons */}
              <DialogFooter>
                <div className="flex flex-row md:w-1/2 gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={editingUser && !form.formState.isDirty}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    {editingUser ? "حفظ التعديلات" : "حفظ"}
                  </Button>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="flex-1 border-border text-muted-foreground hover:bg-background"
                      onClick={() => form.reset()}
                    >
                      إلغاء
                    </Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
