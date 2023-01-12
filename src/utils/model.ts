export interface FieldErrorType {
  field: string
  error: string
}

export interface Iresponse<T = {}> {
  resultCode: number
  messages: string[]
  data: T
  fieldsErrors?: Array<FieldErrorType>
}

export const enum ResultStatus {
  OK = 0,
  Error = 1,
  captcha = 10
}

export interface ThunkError {
  rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> }
}
