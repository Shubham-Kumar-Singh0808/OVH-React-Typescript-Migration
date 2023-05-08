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
  id: number | string
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
  pipflag: boolean
}

export type PipListSliceState = {
  isLoading: ApiLoadingState
  error: ValidationError
  pipListData: GetPipList[]
  listSize: number
  selectedEmployeePipStatus: EmployeePipStatus
  performanceRatings: PerformanceRatings[]
  activeEmployee: ActiveEmployee[]
  employeePIPTimeline: GetPIPHistory
  list: GetPipList
  pipListValue?: string
  fromDate: string | Date
  toDate: string | Date
}

export type EmployeePIPListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  // selectDate: string
  toDate?: Date | string
  fromDate?: Date | string
  searchInput?: string
  searchByAdded?: boolean
  setToggle: (value: string) => void
  searchByEmployee?: boolean
  // setSelectDate: (value: string) => void
  setFromDate: React.Dispatch<React.SetStateAction<string | Date>>
  setToDate: React.Dispatch<React.SetStateAction<string | Date>>
  // getPIPValue: string
  selectDay: string
}

export type PerformanceRatings = {
  id: number
  rating: number
  label: null
}

export type ActiveEmployee = {
  employeeId: number
  empFirstName: string
  empLastName: string
  projectName: null
  projectId: null
  startDate: null
  endDate: null
  billable: boolean
  comments: null
  department: null
  desigination: null
  userName: null
  isAllocated: null
  duration: null
  count: null
  rate: null
  role: null
  amount: null
  empName: null
  status: null
  monthWorkingDays: null
  holidays: null
  leaves: null
  totalDays: null
  hours: null
  totalValue: null
  allocation: null
}

export type PipHistory = {
  id: null
  rating: string
  remarks: string
  startDate: string
  endDate: string
  extendDate: null
  employee: string
  improvement: string
  oldRating: null
  oldRemarks: null
  oldStartDate: null
  oldEndDate: null
  oldExtendDate: null
  oldEmployee: null
  oldPIPFlag: null
  oldImprovement: null
  modifiedDate: string
  modifiedBy: string
  persistType: string
  columnName: null
  additionalInfo: null
  pipflag: string
}

export type GetPIPHistory = {
  list: PipHistory[]
  size: number
}

export type PipHistoryProps = {
  filterName: string
  pipId: number
}
