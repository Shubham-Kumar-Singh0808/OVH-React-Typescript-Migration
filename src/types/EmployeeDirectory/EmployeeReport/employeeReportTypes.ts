import { LoadingState } from '../../commonTypes'

export type EmployeeReport = {
  id: number
  fullName: string
  emailId: string
  mobile: string
  country?: string | null
}

export type MockEmployeeReport = {
  id: number
  fullName: string
  emailId: string
  mobile: string
  country?: string | null
  [key: string]: unknown
}

export enum EmploymentStatus {
  'active' = 'Active',
  'inactive' = 'InActive',
}

export type EmployeeReportSliceState = {
  employees: EmployeeReport[]
  selectedEmploymentStatus: EmploymentStatus
  listSize: number
  isLoading: LoadingState
  country: string
  selectedCategory: string
  searchEmployee: string
}

export type EmployeeReportApiProps = {
  endIndex?: number
  startIndex?: number
  searchStr?: string
  selectionStatus?: string
  selectedCategory?: string
  searchEmployee?: string
}

export type GetEmployeeResponse = {
  emps: EmployeeReport[]
  Empsize: number
}

export type EmployeeReportTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type EmployeeReportOptionsProps = {
  category: string
  setCategory: (value: string) => void
}
