export interface FormData {
  id: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  blood_group: string;
  parent_name: string;
  phone_number: string;
  email: string;
  occupation: string;
  grade: string;
  previous_school: string;
  address: string;
}

export const validateStep = (step: number, formData: FormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (step === 1) {
    if (!formData.full_name.trim()) {
      errors.full_name = "Full Name is required.";
    }
    if (!formData.date_of_birth) {
      errors.date_of_birth = "Date of Birth is required.";
    }
  }

  if (step === 2) {
    if (!formData.parent_name.trim()) {
      errors.parent_name = "Parent Name is required.";
    }
    if (!formData.phone_number.trim()) {
      errors.phone_number = "Phone Number is required.";
    }
    if (
      formData.email.trim() !== "" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (step === 3) {
    if (!formData.grade.trim()) {
      errors.grade = "Grade is required.";
    }
    if (!formData.address.trim()) {
      errors.address = "Address is required.";
    }
  }

  return errors;
};
