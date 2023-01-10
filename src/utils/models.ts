export interface FieldErrorType {
  field: string
  error: string
}

export interface ThunkError {
  rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> }
}
