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

export type ITDeclarationListApiProps = {
  cycleId?: number
  employeeName?: string
  endIndex?: number
  startIndex?: number
  searchEmployee?: string
}

export type ITDeclarationListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type ITDeclarationListSliceState = {
  itDeclarationForms: ITForm[]
  listSize: number
  searchEmployee: string
  isLoading: LoadingState
  error: ValidationError
  cycles: Cycle[]
}
