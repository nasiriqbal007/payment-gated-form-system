

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    PROFILE: "/auth/profile",
  },
  FORMS: {
    GET_FORM: (formId: string) => `/forms/${formId}`,
    SAVE_FORM: (formId: string) => `/forms/${formId}`,
    SUBMIT_FORM: (formId: string) => `/forms/${formId}/submit`,
  },
  ADMIN: {
    LIST_FORMS: "/admin/forms",
    GET_FORM: (formId: string) => `/admin/forms/${formId}`,
    DELETE_FORM: (formId: string) => `/admin/forms/${formId}`,
  },
} as const;
