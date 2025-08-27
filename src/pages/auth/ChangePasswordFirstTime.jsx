import { useState } from "react";
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
import api from "@/api";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { t } from "i18next";

// Zod schema for password validation with translation
const passwordSchema = (t) =>
  z
    .object({
      newPassword: z
        .string()
        .min(8, t("changePassword.validation.min"))
        .regex(/[A-Z]/, t("changePassword.validation.upper"))
        .regex(/[a-z]/, t("changePassword.validation.lower"))
        .regex(/\d/, t("changePassword.validation.number"))
        .regex(
          /[!@#$%^&*(),.?":{}|<>]/,
          t("changePassword.validation.special")
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("changePassword.validation.mismatch"),
      path: ["confirmPassword"],
    });

export default function ChangePasswordFirstTime() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(passwordSchema(t)),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = form.watch("newPassword");
  const confirmPasswordValue = form.watch("confirmPassword");

  const passwordRequirements = [
    {
      text: t("changePassword.requirements.min"),
      met: newPasswordValue.length >= 8,
    },
    {
      text: t("changePassword.requirements.upper"),
      met: /[A-Z]/.test(newPasswordValue),
    },
    {
      text: t("changePassword.requirements.lower"),
      met: /[a-z]/.test(newPasswordValue),
    },
    {
      text: t("changePassword.requirements.number"),
      met: /\d/.test(newPasswordValue),
    },
    {
      text: t("changePassword.requirements.special"),
      met: /[!@#$%^&*(),.?":{}|<>]/.test(newPasswordValue),
    },
  ];

  const isPasswordValid = passwordRequirements.every((req) => req.met);
  const doPasswordsMatch =
    newPasswordValue === confirmPasswordValue && confirmPasswordValue !== "";

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      await api.post("/auth/change-default-password", data);
      setSuccess(true);
      setUser((prev) => ({ ...prev, changedDefaultPassword: true }));
      toast.success(t("changePassword.success"));
    } catch (error) {
      form.setError("root", {
        message: t(
          `errorApi.${error?.response?.data?.message || "defaultError"}`
        ),
      });
      toast.error(t("changePassword.error"), {
        description: t(
          `errorApi.${error?.response?.data?.message || "defaultError"}`
        ),
      });
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
                  {t("changePassword.successTitle")}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {t("changePassword.successDescription")}
                </p>
              </div>
              <Button>
                <Link to="/" className="w-full">
                  {t("changePassword.goToDashboard")}
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
          <CardTitle className="text-2xl">
            {t("changePassword.title")}
          </CardTitle>
          <CardDescription>{t("changePassword.description")}</CardDescription>
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
                    <FormLabel>{t("changePassword.newPassword")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder={t("changePassword.newPasswordPlaceholder")}
                        className="text-left"
                      />
                    </FormControl>
                    <FormMessage />

                    {field.value && (
                      <div className="space-y-2 mt-3">
                        <p className="text-sm font-medium text-gray-700">
                          {t("changePassword.requirements.title")}
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
                    <FormLabel>{t("changePassword.confirmPassword")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder={t(
                          "changePassword.confirmPasswordPlaceholder"
                        )}
                        className="text-left"
                      />
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
                            ? t("changePassword.match")
                            : t("changePassword.mismatch")}
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
                {isLoading
                  ? t("changePassword.loading")
                  : t("changePassword.submit")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
