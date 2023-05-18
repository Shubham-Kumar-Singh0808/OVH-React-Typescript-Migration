import { LoadingState, ValidationError } from '../../commonTypes'
import {
  EmployeeDetails,
  Sections,
  SubmitITDeclarationForm,
} from '../ITDeclarationForm/itDeclarationFormTypes'
import { Section } from '../InvestmentCheckList/investmentCheckListTypes'

export type Cycle = {
  active: boolean
  cycleId: number
  cycleName: string
  endDate: string
  startDate: string
}

export type FormInvestment = {
  formInvestmentId: number | null
  investmentId: number
  investmentName: string | null
  customAmount: number | string
}

export type FormSection = {
  isOld: boolean
  itSectionsId: number | null
  maxLimit: number
  sectionId: number
  sectionName: string
  formInvestmentDTO: FormInvestment[]
}

export interface EditITDeclarationEmployeeDetails
  extends Omit<EmployeeDetails, 'pan'> {
  pan: string | null
}

export type ITForm = {
  fromDate: string
  grandTotal: number
  isAgree: null | boolean
  itDeclarationFormId: number
  organisationName: string
  panNumber: string | null
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

export type UpdatedITDeclarationFormDTO = Omit<
  SubmitITDeclarationForm,
  'itDeclarationFormId'
>

export interface ITDeclarationListModal {
  showModal: boolean
  description: string
  confirmButtonFunction?: () => Promise<void> | void
  confirmBtnText?: string
  cancelBtnText?: string
  footerClass?: string
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
  toggle: ITDeclarationFormToggleType
  updatedITDeclarationFormDTO: ITForm
  employeeDetails: EditITDeclarationEmployeeDetails
  sectionsWithInvests: Sections[]
  modal: ITDeclarationListModal
  isUpdateITFormButtonEnabled: boolean
}

export enum ITDeclarationFormToggleType {
  HomePage = '',
  ViewForm = 'viewITDeclarationForm',
  editSection = 'editSections',
  editInvestmentPage = 'editInvestmentPage',
  editInvestmentCycle = 'editInvestmentCycle',
  updateITDeclarationForm = 'updateITDeclarationForm',
}

export interface ITInvestmentTableRowProps {
  investment: FormInvestment
  investmentIndex: number
  sectionsWithInvests: Sections[]
  currentSectionId: number
  investmentChangeHandler: (
    e: React.ChangeEvent<HTMLSelectElement>,
    sectionId: number,
    investment: FormInvestment,
    investmentIndex: number,
  ) => void
  amountChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionId: number,
    investment: FormInvestment,
    investmentIndex: number,
  ) => void
  deleteInvestmentButtonHandler: (
    e: React.MouseEvent<HTMLButtonElement>,
    sectionId: number,
    investmentId: number,
  ) => void
  contentButtonHandler: (
    e: React.MouseEvent<HTMLButtonElement>,
    sectionId: number,
    investmentId: number,
    type: 'query' | 'doc',
  ) => void
}

export type FinalUpdateITFormDTO = Omit<Omit<ITForm, 'filePath'>, 'cycleId'>
