import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";

// Zod schema for password validation
const passwordSchema = z.object({
  currentPassword: z.string().min(1, { message: "كلمة المرور الحالية مطلوبة" }),
  newPassword: z.string()
    .min(8, { message: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل" })
    .regex(/[A-Z]/, { message: "يجب أن تحتوي على حرف كبير واحد على الأقل" })
    .regex(/[a-z]/, { message: "يجب أن تحتوي على حرف صغير واحد على الأقل" })
    .regex(/\d/, { message: "يجب أن تحتوي على رقم واحد على الأقل" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "يجب أن تحتوي على رمز خاص واحد على الأقل" }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "كلمات المرور الجديدة غير متطابقة",
  path: ["confirmPassword"],
});

export default function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  });

  const onSubmit = async (data) => {
    try{
      await api.patch("/auth/update-password", data)
      form.reset();
      toast.success("تم تحديث كلمة المرور بنجاح!");
    } catch (error) {
      console.log(error)
      toast.error("فشل في تحديث كلمة المرور")
    }
    form.reset();
  };

  return (
    <div className="p-4 max-w-xl">
      {/* Password Change Section */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-12">
            <h2 className="text-l md:text-xl font-semibold mb-8">تغيير كلمة المرور</h2>

            <div className="space-y-6">
              {/* Current Password */}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium mb-2 block">
                      كلمة المرور الحالية *
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="password"
                          className="text-right border-border focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium mb-2 block">
                      كلمة المرور الجديدة *
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="password"
                          className="text-right border-border focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm New Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium mb-2 block">
                      تأكيد كلمة المرور الجديدة *
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="password"
                          className="text-right border-border focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex justify-end space-x space-x-4 mt-8">
                <Button type="submit">حفظ التغييرات</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  className="text-muted-foreground border-border hover:bg-backround bg-transparent"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>

      {/* Two-Factor Authentication Section */}
      <div className="border-t border-border pt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-l md:text-xl font-semibold">التحقق بخطوتين</h3>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={setTwoFactorEnabled}
            className="data-[state=checked]:bg-primary"
          />
        </div>
        <div className="flex items-start space-x-reverse space-x-3">
          <div className="text-muted-foreground leading-relaxed">
            في حالة التفعيل، يتم إرسال رمز مؤقت للهاتف عند تسجيل الدخول
          </div>
        </div>
        <div className="mt-4">
          <span className="font-medium">تفعيل التحقق بخطوتين</span>
        </div>
      </div>
    </div>
  );
}