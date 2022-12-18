import { LoadingState, ValidationError } from '../../commonTypes'

export type EmployeeDetails = {
  activeCyle: string
  designation: string
  employeeId: number
  fullName: string
  joinDate: string
  pan: string
}

export type Investment = {
  id?: number
  investmentId: string
  customAmount: string
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

export type FormInvestmentDTO = {
  customAmount: string
  investmentId: number
}

export type FormSectionsDTO = {
  isOld: boolean
  itSectionsId: null
  sectionId: number
  sectionName: string
  formInvestmentDTO: FormInvestmentDTO[]
}

export type submitITDeclarationForm = {
  designation: string
  employeeId: number
  employeeName: string
  fromDate: string
  grandTotal: number
  isAgree: boolean
  itDeclarationFormId: null
  organisationName: string
  panNumber: string
  toDate: string
  formSectionsDTOs: FormSectionsDTO[]
}

export type ITDeclarationFormSliceState = {
  employeeDetails: EmployeeDetails
  sections: Sections[]
  investments: Invest[]
  submitITDeclarationForm: submitITDeclarationForm
  itDeclarationFormId: number
  itDeclarationFormExist: boolean
  isLoading: LoadingState
  error: ValidationError
  grandTotal: number
}

export type formSectionList = {
  formInvestmentDTO: Investment[]
  sectionId: number
  sectionName: string
  sectionLimit: number
  invests: Invest[]
}
