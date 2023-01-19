import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { EmployeeHiveReport } from '../../../../TimeAndAttendance/HiveActivityReport/hiveActivityReportTypes'

export type ProjectTimeSheetProps = {
  hiveDate: string
  projectId: string
}

export type ProjectHiveActivityReportSlice = {
  employeeHiveActivityReport: EmployeeHiveReport
  isLoading: ApiLoadingState
}
