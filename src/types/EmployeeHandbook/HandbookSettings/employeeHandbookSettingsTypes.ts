import { LoadingState, ValidationError } from '../../commonTypes'

export type EmployeeHandbookTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type EmployeeHandbookPageProps = {
  headerTitle: string
  confirmButtonText: string
  backButtonHandler: () => void
}

export type EmployeeCountry = {
  id: number
  name: string
}

export type AddNewHandbookPage = {
  description: string
  displayOrder: string
  pageName: string
  title: string
  list: number[]
  type: string
}

export type EmployeeHandbook = {
  id?: number
  displayOrder: number
  title: string
  description: string
  pageName: string
  handCountry: EmployeeCountry[]
  departmentName?: string
  departmentId?: number
  type?: string
  sectionId?: number
  sectionName?: string
  country?: string
  empCountry?: string
}

export type TotalHandbookList = {
  id: number
  description: string
  displayOrder: number
  empCountry: string
  handCountry: EmployeeCountry[]
  country: null
  departmentId: null
  departmentName: null
  pageName: string
  sectionId: null
  sectionName: null
  title: string
  type: string
}

export type MockEmployeeHandbook = {
  id: number
  displayOrder: number
  title: string
  description: string
  pageName: string
  handCountry: EmployeeCountry[]
  departmentName?: string
  departmentId?: number
  type?: string
  sectionId?: number
  sectionName?: string
  country?: string
  empCountry?: string
  [key: string]: unknown
}

export type EmployeeHandbookListApiProps = {
  endIndex?: number
  startIndex?: number
}

export type EmployeeHandbookListResponse = {
  list: EmployeeHandbook[]
  size: number
}

export type EmployeeHandbookSettingSliceState = {
  employeeHandbooks: EmployeeHandbook[]
  employeeCountries: EmployeeCountry[]
  totalHandbookList: TotalHandbookList[]
  listSize: number
  isLoading: LoadingState
  error: ValidationError
}
