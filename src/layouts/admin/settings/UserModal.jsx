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
import { User, Mail, Phone, Group } from "lucide-react";
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

// Define the form schema with validation
const userSchema = z.object({
  name: z.string().min(1, "الاسم الكامل مطلوب"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, "رقم هاتف غير صحيح"),
  role: z.enum(["teacher", "supervisor"], {
    required_error: "الدور مطلوب",
  }),
});

export default function UserModal({
  editingUser = null,
  onAddUser,
  onUpdateUser,
  open = false,
  setOpen,
}) {
  // Initialize the form
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "teacher",
    },
  });

  useEffect(() => {
    if (editingUser) {
      form.reset({
        name: editingUser?.name || "",
        email: editingUser?.email || "",
        phone: editingUser?.phone || "",
        role: editingUser?.role || "teacher",
      });
    }
  }, [editingUser, form]);

  const onSubmit = (data) => {
    const userData = {
      ...data,
      ...(editingUser ? {} : { password: generateRandomPassword(12) }),
    };

    if (editingUser) {
      onUpdateUser({ ...editingUser, ...userData });
    } else {
      onAddUser(userData);
    }

    form.reset();
    setOpen(false);
  };

  const handleOpenDialog = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {editingUser ? (
        <Button
          onClick={handleOpenDialog}
          className="w-full justify-start text-foreground hover:text-destructive border-b border-border"
          variant="ghost"
        >
          تعديل الحساب
        </Button>
      ) : (
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2 flex items-center gap-2">
            <Add size="20" color="currentColor" />
            إنشاء حساب جديد
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="max-w-md bg-card border-border">
        {/* Header */}
        <DialogHeader className="border-b-2">
          <DialogTitle className="text-lg mb-2 sm:text-xl rtl:text-right font-semibold text-foreground">
            {editingUser ? "تعديل حساب المستخدم" : "إنشاء حساب جديد"}
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    سيتم إنشاء كلمة مرور عشوائية وإرسالها إلى البريد الإلكتروني
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <DialogFooter>
              <div className="flex md:w-1/2 w-full gap-3">
                <Button
                  type="submit"
                  disabled={editingUser && !form.formState.isDirty}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  {editingUser ? "تحديث" : "حفظ"}
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
      </DialogContent>
    </Dialog>
  );
}
