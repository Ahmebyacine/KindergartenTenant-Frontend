import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import CategoryStep from "@/layouts/admin/onboardingSteps/CategoryStep";
import ClassStep from "@/layouts/admin/onboardingSteps/ClassStep";
import CurrencyStep from "@/layouts/admin/onboardingSteps/CurrencyStep";
import LanguageStep from "@/layouts/admin/onboardingSteps/LanguageStep";
import SuccesStep from "@/layouts/admin/onboardingSteps/succesStep";
import { useState } from "react";

export default function Onboarding() {
  const { config } = useAuth();
  const [currentStep, setCurrentStep] = useState(config.onboardingStep);
  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    const stepProps = {
      currentStep,
      totalSteps,
      onNext: handleNext,
      onPrevious: handlePrevious,
    };

    switch (currentStep) {
      case 1:
        return <LanguageStep {...stepProps} />;
      case 2:
        return <CurrencyStep {...stepProps} />;
      case 3:
        return <CategoryStep {...stepProps} />;
      case 4:
        return <ClassStep {...stepProps} />;
      case 5:
        return <SuccesStep {...stepProps} />;
      default:
        return <LanguageStep {...stepProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#e2e8f0] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-card rounded-3xl shadow-lg border-0">
        <CardContent>
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-primary mb-8">
              Rawdatee
            </h1>

            {/* Progress indicators */}
            <div className="flex justify-center gap-2 mb-16">
              {Array.from({ length: totalSteps }, (_, index) => (
                <div
                  key={index}
                  className={`w-32 h-1 rounded-full transition-colors duration-300 ${
                    index + 1 <= currentStep ? "bg-primary" : "bg-[#dadada]"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
}
