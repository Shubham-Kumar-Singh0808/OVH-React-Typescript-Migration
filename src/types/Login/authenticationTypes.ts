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

export type ValidationError = number | null

export type AuthenticationStateType = {
  authenticatedUser: AuthenticatedUserType
  error: ValidationError
  isLoading: boolean
}
