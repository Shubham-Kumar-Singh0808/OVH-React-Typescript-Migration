export type UserDataType = {
  employeeName: string
  employeeId: string
  userName: string
  role: string
  tenantKey: string
  token: string
  designation: string
}

export type UserCredentials = {
  username: string
  password: string
  tenantKey: string
}

export type ValidationError = number | null

export interface AuthenticationStateType extends UserDataType {
  error: ValidationError
  isLoading: boolean
}
