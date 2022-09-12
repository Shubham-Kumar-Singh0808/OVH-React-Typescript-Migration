import { LoadingState, ValidationError } from '../../commonTypes'

export type provisionPeriodApiProps = {
  employeeId?: number
  endIndex?: number
  startIndex?: number
}

export type ProvisionDetails = {
  joinDate: string
  month: string
  provisionDate: string
  username: string
}

export type UpcomingProvisionPeriodResponse = {
  list: ProvisionDetails[]
  size: number
}

export type ProbationaryListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type EmployeeProvisionPeriodSliceState = {
  upcomingProbationList: ProvisionDetails[]
  listSize: number
  isLoading: LoadingState
  error: ValidationError
}
