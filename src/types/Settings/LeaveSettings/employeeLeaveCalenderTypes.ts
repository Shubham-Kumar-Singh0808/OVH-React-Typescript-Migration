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

export type EmployeeLeaveCalenderTypes = {
  id: string
  leaveCycleMonth: string
  leavesPerYear: number
  maxAccrualPerYear: number
  maxLeavesEarned: number
  payrollCutoffDate: number
  probationPeriod: number
}

export type LeaveSettingsState = {
  employeeSaveLeaveCalender: EmployeeSaveLeaveCalenderTypes
  employeeLeaveCategories: EmployeeLeaveCategories[]
  employeeLeaveCalender: EmployeeLeaveCalenderTypes
  isLoading: LoadingState
  error: ValidationError
}
