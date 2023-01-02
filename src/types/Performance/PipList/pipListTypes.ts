import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ValidationError } from '../../commonTypes'

export enum EmployeePipStatus {
  'inactive' = 'Inactive',
  'RemovedFromPIP' = 'Removed From PIP',
  'pip' = 'PIP',
}
export type GetAllPipListApiProps = {
  dateSelection: string
  endIndex?: number
  from: string
  multiSearch: string
  searchByAdded: boolean
  searchByEmployee: boolean
  selectionStatus: string
  startIndex?: number
  to: string
}

export type GetAllPipList = {
  list: GetPipList[]
  size: number
}

export type GetPipList = {
  id: number
  employeeName: string
  startDate: string
  endDate: string
  extendDate: null | string
  rating: string
  remarks: string
  createdBy: string
  createdDate: string
  updatedBy: string
  updatedDate: null | string
  empId: number
  improvement: string
  pipflag: true
}

export type PipListSliceState = {
  isLoading: ApiLoadingState
  error: ValidationError
  pipListData: GetPipList[]
  listSize: number
  selectedEmployeePipStatus: EmployeePipStatus
}

export type EmployeePIPListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  selectDate: string
  toDate?: Date | string
  fromDate?: Date | string
  searchInput?: string
  searchByAdded?: boolean
  searchByEmployee?: boolean
}
