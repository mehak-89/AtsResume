import { useState } from "react";

interface UseStepsOptions {
  initialStep?: number;
  maxSteps: number;
}

export function useSteps({ initialStep = 1, maxSteps }: UseStepsOptions) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const nextStep = () => {
    setCurrentStep((prev) => (prev < maxSteps ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= maxSteps) {
      setCurrentStep(step);
    }
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === maxSteps;

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep,
    isLastStep,
  };
}
