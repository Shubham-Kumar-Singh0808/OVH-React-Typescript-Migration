import { LoadingState, ValidationError } from '../../../commonTypes'

export type EmployeeDesignation = {
  id: number
  fullName: string
  emailId: string
  mobile: string
  bloodgroup: string
  departmentName: string
  designation: string
  contractStartDate: string | null
  country: string | null
}

export type MockEmployeeDesignation = {
  id: number
  fullName: string
  emailId: string
  mobile: string
  bloodgroup: string
  departmentName: string
  designation: string
  contractStartDate: string | null
  country: string | null
  [key: string]: unknown
}

export type EmployeeDesignationReportApiProps = {
  endIndex?: number
  startIndex?: number
  selectedDesignation?: string
}

export type GetEmployeeDesignationResponse = {
  emps: EmployeeDesignation[]
  Empsize: number
}

export type Designation = {
  id: number
  name: string
}

export type EmployeeDesignationReportState = {
  getAllDesignation: Designation[]
  selectedDesignation: string
  empDesignation: EmployeeDesignation[]
  listSize: number
  isLoading: LoadingState
  error: ValidationError
}

export type EmployeeDesignationReportTableProps = {
  designation: string
  setDesignation: (value: string) => void
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type EmployeeDesignationOptionsProps = {
  designation: string
  setDesignation: (value: string) => void
}

export type mockEmpDepartment = {
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
  allocationSupportFlag: boolean
}
