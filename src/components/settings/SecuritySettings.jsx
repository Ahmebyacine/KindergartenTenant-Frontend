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
import api from "@/api";
import { toast } from "sonner";
import { t } from "i18next";

// Zod schema for password validation
const passwordSchema = (t) => z.object({
  currentPassword: z.string().min(1, { message: t("settings.security.validation.currentPassword") }),
  newPassword: z.string()
    .min(8, { message: t("settings.security.validation.newPassword.minLength") })
    .regex(/[A-Z]/, { message: t("settings.security.validation.newPassword.uppercase") })
    .regex(/[a-z]/, { message: t("settings.security.validation.newPassword.lowercase") })
    .regex(/\d/, { message: t("settings.security.validation.newPassword.number") })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: t("settings.security.validation.newPassword.special") }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: t("settings.security.validation.confirmPassword"),
  path: ["confirmPassword"],
});

export default function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const form = useForm({
    resolver: zodResolver(passwordSchema(t)),
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
      toast.success(t("settings.security.success"));
    } catch (error) {
      console.log(error)
      toast.error(t("settings.security.error"));
    }
    form.reset();
  };

  return (
    <div className="p-4 max-w-xl">
      {/* Password Change Section */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-12">
            <h2 className="text-l md:text-xl font-semibold mb-8">{t("settings.security.changePassword")}</h2>

            <div className="space-y-6">
              {/* Current Password */}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium mb-2 block">
                      {t("settings.security.currentPassword")} *
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="password"
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
                      {t("settings.security.newPassword")} *
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="password"
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
                      {t("settings.security.confirmPassword")} *
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="password"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex justify-end space-x space-x-4 mt-8">
                <Button type="submit">{t("common.save")}</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  className="text-muted-foreground border-border hover:bg-backround bg-transparent"
                >
                  {t("common.cancel")}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>

      {/* Two-Factor Authentication Section */}
      <div className="border-t border-border pt-8 hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-l md:text-xl font-semibold">{t("settings.security.twoFactorAuthentication")}</h3>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={setTwoFactorEnabled}
            className="data-[state=checked]:bg-primary"
          />
        </div>
        <div className="flex items-start space-x-reverse space-x-3">
          <div className="text-muted-foreground leading-relaxed">
            {t("settings.security.twoFactorDescription")}
          </div>
        </div>
        <div className="mt-4">
          <span className="font-medium">{t("settings.security.enableTwoFactor")}</span>
        </div>
      </div>
    </div>
  );
}