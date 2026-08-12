import React from "react";

type StepIndicatorProps = {
  currentStep: number;
};

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => (
  <div className="flex flex-col items-center mb-6">
    <div className="flex items-center gap-4">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${currentStep >= 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}
      >
        1
      </div>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${currentStep >= 2 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}
      >
        2
      </div>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${currentStep >= 3 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}
      >
        3
      </div>
    </div>
    <span className="text-xs text-slate-400 font-medium mt-2">
      Step {currentStep} of 3
    </span>
  </div>
);
