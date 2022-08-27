import { LoadingState, ValidationError } from '../../commonTypes'

export type EmployeeHandbookTableProps = {
  editHandbookButtonHandler: (id: number) => void
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type EmployeeHandbookPageProps = {
  isEditHandbook?: boolean
  headerTitle: string
  confirmButtonText: string
  backButtonHandler: () => void
  handbookId?: number
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

export type UpdateHandbookPage = {
  country?: string
  departmentId?: number
  departmentName?: string
  description: string
  displayOrder: number
  empCountry?: string
  handCountry?: EmployeeCountry[]
  id: number
  pageName: string
  sectionId?: number
  sectionName?: string
  title: string
  type?: string
  list?: number[]
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
  country: string
  departmentId: number
  departmentName: string
  pageName: string
  sectionId: number
  sectionName: string
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
  selectedCountries: EmployeeCountry[]
  totalHandbookList: TotalHandbookList[]
  updateHandbookPage: UpdateHandbookPage
  selectedHandbook: EmployeeHandbook[]
  listSize: number
  isLoading: LoadingState
  error: ValidationError
}
