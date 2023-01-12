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
