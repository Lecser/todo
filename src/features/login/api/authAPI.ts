import { instance } from '../../../axios'
import { AxiosResponse } from 'axios'
import { FieldErrorType } from '../../../utils/models'

export interface Iresponse<T = {}> {
  resultCode: number
  messages: string[]
  data: T
  fieldsErrors?: Array<FieldErrorType>
}

export interface AuthResponseData {
  id: number
  email: string
  login: string
}
export interface LoginResponseData {
  userId: number
}

export interface LoginRequestPayload {
  email: string
  password: string
  rememberMe: boolean
}
export const enum ResultStatus {
  OK = 0,
  Error = 1,
  captcha = 10
}
export const authAPI = {
  authMe() {
    return instance.get<Iresponse<AuthResponseData>>(`auth/me`)
  },
  loginUser(loginData: LoginRequestPayload) {
    return instance.post<
      null,
      AxiosResponse<Iresponse<LoginResponseData>>,
      LoginRequestPayload
    >(`auth/login`, loginData)
  },
  logoutUser() {
    return instance.delete<'', Iresponse>(`auth/login`)
  }
}
