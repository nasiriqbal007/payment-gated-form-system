"use client";

import { useSyncExternalStore, useState } from "react";
import { InputField, SelectField, TextareaField } from "./FormFields";
import { StepIndicator } from "./StepIndicator";
import { SuccessScreen } from "./SuccessScreen";
import { formService, GenderType } from "@/services/formService";
import {
  BLOOD_GROUPS,
  GRADES,
  OCCUPATIONS,
  STEPS,
} from "@/constants/formOptions";
import { FormData, validateStep } from "@/utils/formValidation";

const STORAGE_KEY = "publicFormData";
const STEP_STORAGE_KEY = "formCurrentStep";

const createInitialFormData = (): FormData => ({
  id: typeof window !== "undefined" ? crypto.randomUUID() : "",
  full_name: "",
  date_of_birth: "",
  gender: "male",
  blood_group: "",
  parent_name: "",
  phone_number: "",
  email: "",
  occupation: "",
  grade: "",
  previous_school: "",
  address: "",
});

const loadSavedFormData = (): FormData => {
  const initial = createInitialFormData();
  if (typeof window === "undefined") return initial;

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return initial;

  try {
    const parsed = JSON.parse(saved) as Partial<FormData>;
    return { ...initial, ...parsed, id: parsed.id || crypto.randomUUID() };
  } catch (err) {
    console.warn("Failed to parse saved form data", err);
    return initial;
  }
};

export default function PublicForm() {
  const currentStep = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => {
      const savedStep = localStorage.getItem(STEP_STORAGE_KEY);
      const num = Number(savedStep);
      return num >= 1 && num <= 3 ? num : 1;
    },
    () => 1
  );

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState<FormData>(() => loadSavedFormData());
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const changeStep = (step: number) => {
    localStorage.setItem(STEP_STORAGE_KEY, String(step));
    window.dispatchEvent(new Event("storage"));
  };

  const saveFormData = (data: FormData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const resetFormData = () => {
    const resetData = createInitialFormData();
    setFormData(resetData);
    saveFormData(resetData);
    changeStep(1);
    setErrorMsg("");
    setFieldErrors({});
    setSubmitted(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      saveFormData(next);
      return next;
    });

    if (errorMsg) {
      setErrorMsg("");
    }

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const runValidation = (step: number): boolean => {
    const errors = validateStep(step, formData);
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = async () => {
    setErrorMsg("");

    if (!runValidation(currentStep)) {
      return;
    }

    setLoading(true);
    try {
      await formService.saveForm(formData.id, {
        current_step: currentStep,
        full_name: formData.full_name,
        date_of_birth: formData.date_of_birth,
        gender: (formData.gender || undefined) as GenderType | undefined,
        blood_group: formData.blood_group || undefined,
        parent_name: formData.parent_name || undefined,
        phone_number: formData.phone_number || undefined,
        email: formData.email || undefined,
        occupation: formData.occupation || undefined,
        grade: formData.grade || undefined,
        previous_school: formData.previous_school || undefined,
        address: formData.address || undefined,
      });

      if (currentStep < 3) {
        changeStep(currentStep + 1);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to save step draft to backend";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setErrorMsg("");
    setFieldErrors({});
    if (currentStep > 1) {
      changeStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setErrorMsg("");

    if (!runValidation(3)) {
      return;
    }

    setLoading(true);
    try {
      await formService.saveForm(formData.id, {
        current_step: 3,
        full_name: formData.full_name,
        date_of_birth: formData.date_of_birth,
        gender: (formData.gender || undefined) as GenderType | undefined,
        blood_group: formData.blood_group || undefined,
        parent_name: formData.parent_name || undefined,
        phone_number: formData.phone_number || undefined,
        email: formData.email || undefined,
        occupation: formData.occupation || undefined,
        grade: formData.grade || undefined,
        previous_school: formData.previous_school || undefined,
        address: formData.address || undefined,
      });

      await formService.submitForm(formData.id);
      
      window.localStorage.removeItem(STORAGE_KEY);
      if (typeof window !== "undefined") {
        localStorage.removeItem(STEP_STORAGE_KEY);
      }
      setSubmitted(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to submit final form";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl">
      {!submitted && (
        <div className="text-center mb-5">
          <h1 className="text-xl font-bold text-slate-800">
            {STEPS[currentStep - 1].title}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Please complete the required details below
          </p>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8">
        {submitted ? (
          <SuccessScreen onStartNew={resetFormData} />
        ) : (
          <div>
            <StepIndicator currentStep={currentStep} />

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {currentStep === 1 && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <InputField
                      label="Full Name"
                      required
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      error={fieldErrors.full_name}
                      placeholder="Enter full name"
                    />

                    <InputField
                      label="Date of Birth"
                      required
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      error={fieldErrors.date_of_birth}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-end">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Gender
                      </label>
                      <div className="flex items-center gap-5 text-sm text-slate-700 py-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                          />
                          <span className="font-medium text-xs">Male</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                          />
                          <span className="font-medium text-xs">Female</span>
                        </label>
                      </div>
                    </div>

                    <SelectField
                      label="Blood Group"
                      name="blood_group"
                      value={formData.blood_group}
                      onChange={handleChange}
                      options={BLOOD_GROUPS}
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <InputField
                      label="Parent Name"
                      required
                      type="text"
                      name="parent_name"
                      value={formData.parent_name}
                      onChange={handleChange}
                      error={fieldErrors.parent_name}
                      placeholder="Enter parent name"
                    />

                    <InputField
                      label="Phone Number"
                      required
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      error={fieldErrors.phone_number}
                      placeholder="03XXXXXXXXX"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <InputField
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={fieldErrors.email}
                      placeholder="Enter email"
                    />

                    <SelectField
                      label="Occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      options={OCCUPATIONS}
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <SelectField
                      label="Grade"
                      required
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      error={fieldErrors.grade}
                      options={GRADES}
                    />

                    <InputField
                      label="Previous School"
                      type="text"
                      name="previous_school"
                      value={formData.previous_school}
                      onChange={handleChange}
                      placeholder="Enter previous school"
                    />
                  </div>

                  <TextareaField
                    label="Address"
                    required
                    name="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    error={fieldErrors.address}
                    placeholder="Enter full address"
                  />
                </div>
              )}

              <div className="mt-8 flex items-center justify-between gap-3 pt-4 border-t border-slate-50">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors cursor-pointer"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium transition-colors shadow-md shadow-blue-500/20 ml-auto cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Next →</span>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-medium transition-colors shadow-md shadow-emerald-500/20 ml-auto cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>✓ Submit</span>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
