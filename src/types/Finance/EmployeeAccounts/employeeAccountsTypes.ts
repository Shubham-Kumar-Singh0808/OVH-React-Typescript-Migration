import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ValidationError } from '../../commonTypes'

export type FinanceInformation = {
  financeId: number
  pfAccountNumber: null | string
  panCardAccountNumber: string
  uaNumber: null | string
  employeeId: number
  aadharCardNumber: null | string
  financeFilePath: null | string
  financeFileName: null | string
}

export type BankDetails = {
  bankId: number
  bankName: string
  bankAccountNumber: string
  ifscCode: null | string
  employeeId: number
}

export type FinanceDetails = {
  id: null | number
  employeeId: number
  employeeName: string
  financeDetails: FinanceInformation
  bankDetails: BankDetails[]
}
export type GetFinanceDetailsResponse = {
  list: FinanceDetails[]
  size: number
}

export type EmployeeAccountSliceState = {
  isLoading: ApiLoadingState
  error: ValidationError
  financeData: FinanceDetails[]
  listSize: number
}

export type EmployeeAccountApiProps = {
  startIndex?: number
  endIndex?: number
  employeeName: string
}

export type EmployeeAccountExpandableTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type DownloadFinanceList = {
  employeeNameSearch?: string
  token?: string
}
