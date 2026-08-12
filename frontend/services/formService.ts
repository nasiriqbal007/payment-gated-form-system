import { apiClient } from "./apiClient";

export type FormStatus = "draft" | "submitted";
export type GenderType = "male" | "female";

export interface FormRecord {
  id: string;
  status: FormStatus;
  current_step: number;
  full_name: string;
  date_of_birth: string;
  gender?: GenderType;
  blood_group?: string;
  parent_name?: string;
  phone_number?: string;
  email?: string;
  occupation?: string;
  grade?: string;
  previous_school?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
  submitted_at?: string | null;
}

export interface SaveFormDto {
  current_step?: number;
  full_name: string;
  date_of_birth: string;
  gender?: GenderType;
  blood_group?: string;
  parent_name?: string;
  phone_number?: string;
  email?: string;
  occupation?: string;
  grade?: string;
  previous_school?: string;
  address?: string;
}

export interface DeleteFormResponse {
  success: boolean;
  message: string;
  deletedForm?: FormRecord;
}

export const formService = {
  getForm: (formId: string) => apiClient.get<FormRecord>(`/forms/${formId}`),
  saveForm: (formId: string, dto: SaveFormDto) =>
    apiClient.patch<FormRecord>(`/forms/${formId}`, dto),
  submitForm: (formId: string) =>
    apiClient.patch<FormRecord>(`/forms/${formId}/submit`),
  listForms: () => apiClient.get<FormRecord[]>("/admin/forms"),
  getAdminForm: (formId: string) =>
    apiClient.get<FormRecord>(`/admin/forms/${formId}`),
  deleteForm: (formId: string) =>
    apiClient.delete<DeleteFormResponse>(`/admin/forms/${formId}`),
};
