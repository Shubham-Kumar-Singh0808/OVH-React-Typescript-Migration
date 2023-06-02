import { ApiLoadingState } from '../../../../../middleware/api/apiList'

export type ProjectTimeSheetProps = {
  hiveDate: string
  projectId: string
}

export type ActivityTimes = {
  id: null | string
  hours: null | string
  dayofMonth: number
  projectDate: null | string
  pDate: null | string
  empId: null | string | number
  sprintName: null | string
  taskId: null | string
  startDate: null | string
  endDate: null | string
}

export type EmployeeTimeSheet = {
  id: number
  userName: string
  firstName: string
  lastName: string
  activityTimes: ActivityTimes[]
  totalHiveTime: string
  projectIdentifier: null | string
}

export type ProjectHiveActivityReportSlice = {
  employeeHiveActivityReport: EmployeeTimeSheet[]
  isLoading: ApiLoadingState
}
