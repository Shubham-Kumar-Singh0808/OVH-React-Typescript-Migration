import { ApiLoadingState } from '../../../middleware/api/apiList'

export type InOfficeDTO = {
  spentHours: string
  dayOfMonth: number
  colorForTime: string
}

export type GetTimeInOfficeEmployeeReportResponse = {
  empID: string
  empName: string
  totalSpentHours?: number | null
  totalTimeInOfficeHours?: string
  date?: string | null
  month?: string | null
  week?: string | null
  dayList: number[] | null
  inOfficeDTOs: InOfficeDTO[]
}

export type GetTimeInOfficeManagerReportResponse = {
  size: number
  dayList: number[]
  list: GetTimeInOfficeEmployeeReportResponse[]
}

export type GetTimeInOfficeEmployeeReportProps = {
  date: string
  loggedInEmployeeId: number
  startIndex?: number
  endIndex?: number
  search?: string
}

export type SelectedView = 'Me' | 'All'

export type TimeInOfficeReportSliceState = {
  selectedDate: string
  selectedView: SelectedView
  timeInOfficeEmployeeReport: GetTimeInOfficeEmployeeReportResponse
  timeInOfficeManagerReport: GetTimeInOfficeManagerReportResponse
  isLoading: ApiLoadingState
  monthDisplay: string
  searchResult: SearchResultResponse
}

export type ManagerTimeInOfficeReportProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type exportAttendanceReportProps = {
  hiveDate: string
  search: string
}

export type GetTimeInOfficeProps = {
  date: string
  endIndex: number
  loggedInEmployeeId: number
  search: string
  startIndex: number
}

export type SearchResultResponse = {
  size: number
  list: GetTimeInOfficeEmployeeReportResponse[]
}
