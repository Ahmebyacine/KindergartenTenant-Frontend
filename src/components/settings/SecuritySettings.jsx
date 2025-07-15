import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";

export default function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="p-4  max-w-xl">
      {/* Password Change Section */}
      <div className="mb-12">
        <h2 className="text-l md:text-xl font-semibold mb-8">تغيير كلمة المرور</h2>

        <div className="space-y-6">
          {/* Current Password */}
          <div>
            <Label
              htmlFor="current-password"
              className="font-medium mb-2 block"
            >
              كلمة المرور الحالية *
            </Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                className="text-right border-border focus:border-primary focus:ring-primary"
                readOnly
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <Label htmlFor="new-password" className="font-medium mb-2 block">
              كلمة المرور الجديدة *
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                className="text-right border-border focus:border-primary focus:ring-primary"
                readOnly
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-[#111827]"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <Label
              htmlFor="confirm-password"
              className="font-medium mb-2 block"
            >
              تأكيد كلمة المرور الجديدة *
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                className="text-right border-border focus:border-primary focus:ring-primary"
                readOnly
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground]"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end space-x space-x-4 mt-8">
            <Button>حفظ التغييرات</Button>
            <Button
              variant="outline"
              className="text-muted-foreground border-border hover:bg-backround bg-transparent"
            >
              إلغاء
            </Button>
          </div>
        </div>
      </div>

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
