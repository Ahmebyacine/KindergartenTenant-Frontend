import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Users,
  GraduationCap,
  UserCheck,
  Globe,
} from "lucide-react";
import { CategoryStep } from "@/layouts/admin/steps/CategoryStep";
import { ClassStep } from "@/layouts/admin/steps/ClassStep";
import { TeacherStep } from "@/layouts/admin/steps/TeacherStep";
import { CompletionStep } from "@/layouts/admin/steps/CompletionStep";
import { LanguageStep } from "@/layouts/admin/steps/LanguageStep";
import i18n from "@/i18n";

const steps = [
  { id: 1, title: "Language", icon: Globe, required: true },
  { id: 2, title: "Categories", icon: Users, required: true },
  { id: 3, title: "Classes", icon: GraduationCap, required: true },
  { id: 4, title: "Teachers", icon: UserCheck, required: false },
  { id: 5, title: "Complete", icon: CheckCircle, required: false },
];

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({
    language: i18n.language,
    categories: [],
    classes: [],
    teachers: [],
  });

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep === 4) {
      setCurrentStep(5);
    }
  };

  const updateData = (updates) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.language;
      case 2:
        return data.categories.length > 0;
      case 3:
        return data.classes.length > 0;
      default:
        return true;
    }
  };
  return (
    <div
      className={`container mx-auto px-4 py-8 max-w-4xl`}
    >
      <div className="mb-8 text-center">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Welcome to Rawdatee</h1>
        </div>
        <p className="text-muted-foreground mb-6">
          دعنا نقوم بإعداد نظام إدارة الروضة الخاص بك في بضع خطوات بسيطة
        </p>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    index < steps.length - 1 ? "flex-1" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted
                        ? "bg-secondary text-accent-foreground"
                        : isActive
                        ? "bg-primary text-accent-foreground"
                        : "bg-card text-muted-foreground"
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.id === 1
                      ? "اللغة والعملة"
                      : step.id === 2
                      ? "الفئات"
                      : step.id === 3
                      ? "الفصول"
                      : step.id === 4
                      ? "المعلمون"
                      : "مكتمل"}
                  </span>
                  {!step.required && (
                    <span className="text-xs text-muted-foreground">
                      اختياري
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {(() => {
              const StepIcon = steps[currentStep - 1]?.icon;
              return StepIcon ? <StepIcon className="w-6 h-6" /> : null;
            })()}
            {currentStep === 1
              ? "اختيار اللغة والعملة"
              : currentStep === 2
              ? "إعداد الفئات"
              : currentStep === 3
              ? "إضافة الفصول"
              : currentStep === 4
              ? "إضافة المعلمين"
              : "اكتمل الإعداد!"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <LanguageStep
              language={data.language}
              onUpdate={(language, currency) =>
                updateData({ language, currency })
              }
            />
          )}
          {currentStep === 2 && (
            <CategoryStep
              categories={data.categories}
              onUpdate={(categories) => updateData({ categories })}
            />
          )}
          {currentStep === 3 && (
            <ClassStep
              classes={data.classes}
              categories={data.categories}
              onUpdate={(classes) => updateData({ classes })}
            />
          )}
          {currentStep === 4 && (
            <TeacherStep
              teachers={data.teachers}
              classes={data.classes}
              categories={data.categories}
              onUpdate={(teachers, classes) =>
                updateData({ teachers, classes })
              }
            />
          )}
          {currentStep === 5 && <CompletionStep data={data} />}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              السابق
            </Button>

            <div className="flex gap-2">
              {currentStep === 4 && (
                <Button variant="ghost" onClick={handleSkip}>
                  تخطي
                </Button>
              )}
              {currentStep < 5 && (
                <Button onClick={handleNext} disabled={!canProceed()}>
                  التالي
                </Button>
              )}
              {currentStep === 5 && (
                <Button onClick={() => window.location.reload()}>
                  ابدأ الاستخدام
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
