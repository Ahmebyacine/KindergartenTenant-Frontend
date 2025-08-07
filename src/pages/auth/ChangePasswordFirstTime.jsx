import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, AlertCircle, CheckCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import api from "@/api";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Zod schema for password validation
const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل")
      .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
      .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
      .regex(/\d/, "يجب أن تحتوي على رقم واحد على الأقل")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "يجب أن تحتوي على رمز خاص واحد على الأقل"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمات المرور الجديدة غير متطابقة",
    path: ["confirmPassword"],
  });

export default function ChangePasswordFirstTime() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = form.watch("newPassword");
  const confirmPasswordValue = form.watch("confirmPassword");

  const passwordRequirements = [
    { text: "8 أحرف على الأقل", met: newPasswordValue.length >= 8 },
    { text: "يحتوي على حرف كبير", met: /[A-Z]/.test(newPasswordValue) },
    { text: "يحتوي على حرف صغير", met: /[a-z]/.test(newPasswordValue) },
    { text: "يحتوي على رقم", met: /\d/.test(newPasswordValue) },
    {
      text: "يحتوي على رمز خاص",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(newPasswordValue),
    },
  ];

  const isPasswordValid = passwordRequirements.every((req) => req.met);
  const doPasswordsMatch =
    newPasswordValue === confirmPasswordValue && confirmPasswordValue !== "";

  const onSubmit = async (data) => {
    setIsLoading(true);

    // Simulate API call
    try {
      await api.post("/auth/change-default-password", data);
      setSuccess(true);
      setUser((prev) => ({ ...prev, changedDefaultPassword: true }));
      toast.success("تم تحديث كلمة المرور بنجاح!");
    } catch {
      form.setError("root", {
        message: "فشل في تحديث كلمة المرور. يرجى المحاولة مرة أخرى.",
      });
      toast.error("فشل في تحديث كلمة المرور. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  تم تحديث كلمة المرور بنجاح!
                </h2>
                <p className="text-muted-foreground mt-2">
                  يمكنك الآن الوصول إلى حسابك بكلمة المرور الجديدة.
                </p>
              </div>
              <Button>
                <Link to="/" className="w-full">
                  المتابعة إلى لوحة التحكم
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">تغيير كلمة المرور</CardTitle>
          <CardDescription>
            أهلاً بك! يرجى تعيين كلمة مرور جديدة لإكمال إعداد حسابك.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {form.formState.errors.root && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {form.formState.errors.root.message}
                  </AlertDescription>
                </Alert>
              )}

              {/* New Password Field */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة المرور الجديدة</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="password"
                          placeholder="أدخل كلمة المرور الجديدة"
                          className="text-left"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />

                    {field.value && (
                      <div className="space-y-2 mt-3">
                        <p className="text-sm font-medium text-gray-700">
                          متطلبات كلمة المرور:
                        </p>
                        <ul className="space-y-1">
                          {passwordRequirements.map((req, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm"
                            >
                              <div
                                className={`w-4 h-4 rounded-full ml-2 flex items-center justify-center ${
                                  req.met ? "bg-green-100" : "bg-gray-100"
                                }`}
                              >
                                {req.met && (
                                  <CheckCircle className="w-3 h-3 text-secondary" />
                                )}
                              </div>
                              <span
                                className={
                                  req.met
                                    ? "text-secondary"
                                    : "text-muted-foreground"
                                }
                              >
                                {req.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تأكيد كلمة المرور الجديدة</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="password"
                          placeholder="أكد كلمة المرور الجديدة"
                          className="text-left"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />

                    {field.value && (
                      <div className="flex items-center text-sm mt-1">
                        <div
                          className={`w-4 h-4 rounded-full ml-2 flex items-center justify-center ${
                            doPasswordsMatch ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {doPasswordsMatch && (
                            <CheckCircle className="w-3 h-3 text-secondary" />
                          )}
                        </div>
                        <span
                          className={
                            doPasswordsMatch
                              ? "text-secondary"
                              : "text-destructive"
                          }
                        >
                          {doPasswordsMatch
                            ? "كلمات المرور متطابقة"
                            : "كلمات المرور غير متطابقة"}
                        </span>
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={!isPasswordValid || !doPasswordsMatch || isLoading}
              >
                {isLoading ? "جاري تحديث كلمة المرور..." : "تحديث كلمة المرور"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
