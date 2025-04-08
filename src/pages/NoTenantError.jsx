import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield } from "lucide-react";

export default function NoTenantError({
  title = "لا تتوفر صفحة مستأجر لهذا العنوان",
  description = "يرجى الدخول الى عنوان مستأجر صالح",
}) {
  return (
    <div className="flex items-center justify-center min-h-[80vh]" dir="rtl">
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
            <Shield className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-right">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="rounded-md border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm flex items-center gap-3 text-destructive w-full text-right">
            <AlertTriangle className="h-4 w-4" />
            <div>خطأ: لا مستأجر</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
