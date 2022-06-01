import { ApiLoadingState } from '../../../../../middleware/api/apiList'

export type EmployeeShiftDetails = {
  id: number
  name: string | number
  startTimeHour: string | number
  startTimeMinutes: string | number
  endTimeHour: string | number
  endTimeMinutes: string | number
  graceTime: string | number
}

export type ShiftConfigurationState = {
  employeeShifts: EmployeeShiftDetails[]
  isLoading: ApiLoadingState
}

export type ShiftListTableProps = {
  employeeShifts: EmployeeShiftDetails[]
}
