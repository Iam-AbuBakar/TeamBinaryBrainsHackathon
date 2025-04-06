import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        
        return (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className={`
              relative flex items-center justify-center w-12 h-12 rounded-full
              ${isCompleted ? 'bg-blue-600' : isCurrent ? 'bg-blue-500' : 'bg-gray-200'}
              ${index !== steps.length - 1 ? 'after:content-[""] after:absolute after:w-full after:h-1 after:left-full after:bg-gray-200' : ''}
            `}>
              <Icon className={`w-6 h-6 ${isCompleted || isCurrent ? 'text-white' : 'text-gray-500'}`} />
            </div>
            <div className="mt-2 text-center">
              <p className={`text-sm font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.title}
              </p>
              <p className="text-xs text-gray-400 hidden md:block">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}