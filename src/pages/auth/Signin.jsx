import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

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

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function Signin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      await api.post("/auth/signin", data);
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center my-8">
          <div className="flex items-center gap-2 text-primary">
            <Calendar className="h-8 w-8" />
            <span className="text-2xl font-bold">Rawdati Platform</span>
          </div>
        </div>

        <Card className="bg-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-card-foreground">
              تسجيل الدخول
            </CardTitle>
            <CardDescription className="text-center">
              أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى حسابك
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 text-right">
                <AlertDescription>{error}</AlertDescription>
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
                      <FormLabel className="text-foreground">
                        البريد الإلكتروني
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل بريدك الإلكتروني"
                          type="email"
                          autoComplete="email"
                          className="text-right bg-background text-foreground"
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
                      <FormLabel className="text-foreground">
                        كلمة المرور
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="أدخل كلمة المرور"
                            type="password"
                            autoComplete="current-password"
                            className="text-right bg-background text-foreground"
                            {...field}
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  aria-disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جاري التسجيل...
                    </>
                  ) : (
                    "تسجيل الدخول"
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
