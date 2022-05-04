import { ValidationErrorType } from '../commonTypes'

export type AuthenticatedUserType = {
  employeeName: string
  employeeId: string
  userName: string
  role: string
  tenantKey: string
  token: string
  designation: string
}

export type LoginCredentials = {
  username: string
  password: string
  tenantKey: string
}

export type AuthenticationStateType = {
  authenticatedUser: AuthenticatedUserType
  error: ValidationErrorType
  isLoading: boolean
}
