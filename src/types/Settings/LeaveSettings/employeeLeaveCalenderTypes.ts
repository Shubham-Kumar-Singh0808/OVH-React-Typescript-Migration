import { ValidationError } from '../../commonTypes'
export type EmployeeSaveLeaveCalenderTypes = {
  id: string
  leaveCycleMonth: string
  leavesPerYear: number
  maxAccrualPerYear: number
  maxLeavesEarned: number
  payrollCutoffDate: number
  probationPeriod: number
}

export type LeaveSettingsState = {
  employeeLeaveCalender: EmployeeSaveLeaveCalenderTypes
  isLoading: boolean
  error: ValidationError
}
