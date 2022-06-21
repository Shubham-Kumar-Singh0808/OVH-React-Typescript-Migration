import { LoadingState } from '../../commonTypes'

export type EmployeeTable = {
  id: number
  firstName: string
  lastName: string
  middleName?: string | null
  emailId: string
  mobile: string
}

export enum EmploymentStatus {
  'active' = 'Active',
  'inactive' = 'InActive',
}

export type EmployeeReportSliceState = {
  employees: EmployeeTable[]
  selectedEmploymentStatus: EmploymentStatus
  listSize: number
  isLoading: LoadingState
}

export type EmployeeReportApiProps = {
  endIndex?: number
  startIndex?: number
  searchStr?: string
  selectionStatus?: string
}

export type GetEmployeeResponse = {
  emps: EmployeeTable[]
  Empsize: number
}

export type EmployeeReportTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}
