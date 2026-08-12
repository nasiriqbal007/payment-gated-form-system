import React from "react";

type SuccessScreenProps = {
  onStartNew: () => void;
};

export const SuccessScreen = ({ onStartNew }: SuccessScreenProps) => (
  <div className="text-center py-6">
    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
      ✓
    </div>
    <h2 className="text-2xl font-bold text-slate-800 mb-2">Form Submitted!</h2>
    <p className="text-sm text-slate-500 mb-6">
      Your information has been saved successfully.
    </p>
    <button
      onClick={onStartNew}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
    >
      Start New Entry
    </button>
  </div>
);
