// src/hooks/useMultiStepForm.ts
import { useState } from "react";

export function useMultiStepForm(steps: number) {
  const [currentStep, setCurrentStep] = useState(0);

  function next() {
    setCurrentStep((i) => (i >= steps - 1 ? i : i + 1));
  }

  function back() {
    setCurrentStep((i) => (i <= 0 ? i : i - 1));
  }

  function goTo(step: number) {
    setCurrentStep(step);
  }

  return {
    currentStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps - 1,
    goTo,
    next,
    back,
  };
}
