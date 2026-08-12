export class ErrorMessages {
  static readonly BAD_REQUEST = 'Bad request';
  static readonly UNAUTHORIZED = 'Access token is missing or expired';
  static readonly FORBIDDEN = 'Forbidden resource';
  static readonly NOT_FOUND = 'Requested resource not found';
  static readonly CONFLICT = 'Conflict';
  static readonly INTERNAL_SERVER_ERROR = 'An internal server error occurred';
  static readonly VALIDATION_FAILED = 'Validation failed';
  static readonly INVALID_CREDENTIALS = 'Invalid email or password';
  static readonly FORM_NOT_FOUND = (id: string) =>
    `Form entry with ID '${id}' was not found.`;
  static readonly PAYMENT_NOT_COMPLETED = 'Payment not completed';
}

export class SuccessMessages {
  static readonly OK = 'Success';
  static readonly LOGIN_SUCCESS = 'Login successful';
  static readonly PROFILE_SUCCESS = 'Profile fetched successfully';
  static readonly DRAFT_SAVED = 'Form step draft saved successfully';
  static readonly FORM_SUBMITTED = 'Form application submitted successfully';
  static readonly FORM_FETCHED = 'Form application retrieved successfully';
  static readonly FORM_DELETED = (name: string) =>
    `Form entry '${name}' was successfully deleted.`;
  static readonly PAYMENT_SESSION_CREATED = 'Payment checkout session created successfully';
  static readonly PAYMENT_VERIFIED = 'Payment verified successfully';
}
