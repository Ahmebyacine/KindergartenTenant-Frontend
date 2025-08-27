import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import img from "@/assets/images/logoSignin.png";
import { t } from "i18next";

export default function Signin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorKey, setErrorKey] = useState(null);

  const signInSchema = z.object({
    email: z
      .string()
      .email({ message: t("errorApi.invalidEmail", "Invalid email") }),
    password: z
      .string()
      .min(6, { message: t("errorApi.shortPassword", "Password too short") }),
  });

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorKey(null);

    try {
      await api.post("/auth/signin", data);
      navigate("/");
    } catch (error) {
      const key =
        error.response?.data?.message && t(`errorApi.${error.response.data.message}`, "")
          ? error.response.data.message
          : "defaultError";
      setErrorKey(key);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center my-2">
          <img src={img} alt="rawdayee logo" className="h-32" />
        </div>

        <Card className="bg-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-card-foreground">
              {t("auth.signin.title")}
            </CardTitle>
            <CardDescription className="text-center">
              {t("auth.signin.description")}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {errorKey && (
              <Alert variant="destructive" className="mb-4 text-right">
                <AlertDescription>
                  {t(`errorApi.${errorKey}`)}
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.signin.email")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("auth.signin.placeholderEmail")}
                          type="email"
                          autoComplete="email"
                          className="text-right"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.signin.password")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("auth.signin.placeholderPassword")}
                          type="password"
                          autoComplete="current-password"
                          className="text-right"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      {t("auth.signin.loading")}
                    </>
                  ) : (
                    t("auth.signin.submit")
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
