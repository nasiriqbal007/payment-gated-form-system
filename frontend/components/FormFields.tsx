import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export function InputField({ label, required, error, ...props }: InputFieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors bg-white ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
        }`}
      />
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  required?: boolean;
  error?: string;
  options: SelectOption[];
}

export function SelectField({ label, required, error, options, ...props }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...props}
        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none transition-colors bg-white cursor-pointer ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export function TextareaField({ label, required, error, ...props }: TextareaFieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        {...props}
        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors resize-none ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
        }`}
      />
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}
