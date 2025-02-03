import React from 'react';
import { Check, Clock, ArrowRight } from 'lucide-react';

type Step = 'details' | 'review' | 'complete';

export default function TransferProgress({ currentStep }: { currentStep: Step }) {
  const steps = [
    { id: 'details', label: 'Details', icon: Clock },
    { id: 'review', label: 'Review', icon: ArrowRight },
    { id: 'complete', label: 'Complete', icon: Check }
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = step.id === currentStep;
        const isComplete = steps.findIndex(s => s.id === currentStep) > index;

        return (
          <React.Fragment key={step.id}>
            {index > 0 && (
              <div className={`h-1 w-16 mx-2 ${isComplete ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
            <div className={`flex flex-col items-center ${isActive ? 'text-blue-600' : isComplete ? 'text-green-500' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isActive ? 'bg-blue-100 text-blue-600' : 
                isComplete ? 'bg-green-100 text-green-500' : 
                'bg-gray-100'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm mt-2">{step.label}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
