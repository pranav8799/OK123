import React from 'react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: 'Personal Details' },
    { number: 2, title: 'Documents' },
    { number: 3, title: 'Shop Info' },
    { number: 4, title: 'Business Docs' },
    { number: 5, title: 'Final Review' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isUpcoming = step.number > currentStep;
          
          return (
            <div
              key={step.number}
              className={cn(
                "step-indicator flex flex-col items-center",
                isCompleted && "completed"
              )}
              data-testid={`step-indicator-${step.number}`}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                  isCompleted || isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step.number}
              </div>
              <span className="text-xs mt-2 text-center font-medium">
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
