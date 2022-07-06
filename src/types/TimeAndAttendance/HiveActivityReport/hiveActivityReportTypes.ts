import { ApiLoadingState } from '../../../middleware/api/apiList'
import { SelectedView } from '../TimeInOfficeReport/timeInOfficeReportTypes'

export type ActivityTimes = {
  id: null | string
  hours: null | string
  dayofMonth: number
  projectDate: null | string
  pDate: null | string
  empId: null | string
  sprintName: null | string
  taskId: null | string
  startDate: null | string
  endDate: null | string
}

export type EmployeeHiveReport = {
  id: number
  userName: string
  firstName: string
  lastName: string
  activityTimes: ActivityTimes[]
  totalHiveTime: string
  projectIdentifier: null | string
}

export type GetManagerHiveActivityReportResponse = {
  size: number
  list: EmployeeHiveReport[]
}

export type GetHiveActivityReportProps = {
  endIndex?: number
  date: string
  startIndex?: number
  loggedInEmployeeId?: number
  searchText?: string
}

export type HiveActivityReportSliceState = {
  selectedView: SelectedView
  managerHiveActivityReport: GetManagerHiveActivityReportResponse
  employeeHiveActivityReport: EmployeeHiveReport
  isLoading: ApiLoadingState
}
