import { LoadingState, ValidationError } from '../../commonTypes'
export type EmployeeSaveLeaveCalenderTypes = {
  id: string
  leaveCycleMonth: string
  leavesPerYear: number
  maxAccrualPerYear: number
  maxLeavesEarned: number
  payrollCutoffDate: number
  probationPeriod: number
}

export type EmployeeLeaveCategories = {
  id: number
  name: string
  leaveType: string
}

export type LeaveSettingsState = {
  employeeLeaveCalender: EmployeeSaveLeaveCalenderTypes
  employeeLeaveCategories: EmployeeLeaveCategories[]
  isLoading: LoadingState
  error: ValidationError
}
