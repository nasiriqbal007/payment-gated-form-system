export const STEPS = [
  {
    title: "Step 1 – Personal Information",
    fields: ["full_name", "date_of_birth", "gender", "blood_group"],
  },
  {
    title: "Step 2 – Parent Information",
    fields: ["parent_name", "phone_number", "email", "occupation"],
  },
  {
    title: "Step 3 – Academic Information",
    fields: ["grade", "previous_school", "address"],
  },
];

export const BLOOD_GROUPS = [
  { label: "Select blood group", value: "" },
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
];

export const GRADES = [
  { label: "Select grade", value: "" },
  { label: "Grade 9", value: "Grade 9" },
  { label: "Grade 10", value: "Grade 10" },
  { label: "Grade 11", value: "Grade 11" },
  { label: "Grade 12", value: "Grade 12" },
];

export const OCCUPATIONS = [
  { label: "Enter occupation", value: "" },
  { label: "Engineer", value: "Engineer" },
  { label: "Doctor", value: "Doctor" },
  { label: "Teacher", value: "Teacher" },
  { label: "Business", value: "Business" },
  { label: "Other", value: "Other" },
];
