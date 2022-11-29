import { LoadingState, ValidationError } from '../../commonTypes'

export type Cycle = {
  active: boolean
  cycleId: number
  cycleName: string
  endDate: string
  startDate: string
}

export type FormInvestment = {
  formInvestmentId: number
  investmentId: number
  investmentName: string
  customAmount: number
}

export type FormSection = {
  isOld: boolean
  itSectionsId: number
  maxLimit: number
  sectionId: number
  sectionName: string
  formInvestmentDTO: FormInvestment[]
}
export type ITForm = {
  fromDate: string
  grandTotal: number
  isAgree: null
  itDeclarationFormId: number
  organisationName: string
  panNumber: string
  toDate: string
  cycleId: number
  designation: string
  employeeId: number
  employeeName: string
  filePath: null
  formSectionsDTOs: FormSection[]
}

export type ITDeclarationFormListResponse = {
  itformlistsize: number
  itforms: ITForm[]
}
export type ITDeclarationListSliceState = {
  isLoading: LoadingState
  error: ValidationError
  cycles: Cycle[]
}
