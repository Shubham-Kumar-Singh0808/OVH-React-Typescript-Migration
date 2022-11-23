import { LoadingState, ValidationError } from '../../commonTypes'

export type EmployeeDetails = {
  activeCyle: string
  designation: string
  employeeId: number
  fullName: string
  joinDate: string
  pan: string
}

export type Invest = {
  investmentId: number
  investmentName: string
  maxLimit: number
  description: string
  requiredDocs: string
  sectionId: number
  sectionName: string
}

export type Sections = {
  sectionId: number
  sectionName: string
  sectionLimit: number
  invests: Invest[]
}

export type ITDeclarationFormSliceState = {
  employeeDetails: EmployeeDetails
  sections: Sections[]
  investments: Invest[]
  isLoading: LoadingState
  error: ValidationError
}
