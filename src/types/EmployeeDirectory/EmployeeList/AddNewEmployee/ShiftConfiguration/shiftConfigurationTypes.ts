import { ApiLoadingState } from '../../../../../middleware/api/apiList'

export type EmployeeShiftDetails = {
  id: number
  name: string
  startTimeHour: string
  startTimeMinutes: string
  endTimeHour: string
  endTimeMinutes: string
  graceTime: string
}

export type ShiftConfigurationState = {
  employeeShifts: EmployeeShiftDetails[]
  isLoading: ApiLoadingState
}

export type ShiftListTableProps = {
  employeeShifts: EmployeeShiftDetails[]
}
