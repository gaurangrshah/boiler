/**
 * Utlity function to populate error messages for each field
 */
type ZodErrorMessages = {
  required_error?: string;
  invalid_type_error: string;
};
export function errorMessages(field: string, type: string): ZodErrorMessages {
  return {
    required_error: `${field} is required`,
    invalid_type_error: `${field} must be a ${type}`,
  };
}
export function typeErrorMessage(
  field: string,
  type: string
): ZodErrorMessages {
  return {
    invalid_type_error: `${field} must be a ${type}`,
  };
}
