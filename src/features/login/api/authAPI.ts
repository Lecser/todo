import { instance } from '../../../axios'
import { AxiosResponse } from 'axios'
import { Iresponse } from '../../../utils/model'
import {
  AuthResponseData,
  LoginRequestPayload,
  LoginResponseData
} from './authModel'

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
