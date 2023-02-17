import { LoadingState, ValidationError } from '../../commonTypes'
import { Section } from '../InvestmentCheckList/investmentCheckListTypes'

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

export type FormInvestmentDTOProps = {
  formInvestmentDTO: FormInvestment[]
  isOld: boolean
  itSectionsId: number
  maxLimit: number
  sectionId: number
  sectionName: string
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
  searchname?: string
  investmentCycle?: string | number
}

export type ITDeclarationListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  viewDeclarationFormButtonHandler: (viewForm: ITForm) => void
  editDeclarationFormButtonHandler: (editForm: ITForm) => void
}

export type ITDeclarationListOptionsProps = {
  investmentCycle: string | undefined
  setInvestmentCycle: (value: string) => void
  searchInput: string
  setSearchInput: (value: string) => void
}

export type AddSection = {
  sectionLimit: string
  sectionName: string
}

export type Invests = {
  description: string
  investmentId: number
  investmentName: string
  maxLimit: number
  requiredDocs: string
  sectionId: number
  sectionName: string
}

export type UpdateSection = {
  invests: Invests[]
  sectionId: number
  sectionLimit: string | number
  sectionName: string
}

export type Investment = {
  investmentId: number
  investmentName: string
  maxLimit: number | string
  description: string
  requiredDocs: string
  sectionId: number
  sectionName: string
}

export type AddInvestmentData = {
  description?: string
  investmentName: string
  maxLimit: string
  requiredDocs: string
  sectionId?: number | string
  investmentId?: number
}

export type ITDeclarationListSliceState = {
  itDeclarationForms: ITForm[]
  listSize: number
  searchEmployee: string
  isLoading: LoadingState
  error: ValidationError
  cycles: Cycle[]
  sections: Section[]
  investments: Investment[]
  currentPage: number
  pageSize: number
  toggle: string
  editDeclarationForm: ITForm
  isEditITForm: boolean
}
