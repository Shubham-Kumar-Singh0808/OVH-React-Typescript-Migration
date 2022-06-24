import { LoadingState, ValidationError } from '../../commonTypes'
export type EmployeeSaveLeaveCalenderSetting = {
  id: string
  leaveCycleMonth: string
  leavesPerYear: number | string
  maxAccrualPerYear: number | string
  maxLeavesEarned: number | string
  payrollCutoffDate: number
  probationPeriod: number
}

export type EmployeeLeaveCategories = {
  id: number
  name: string
  leaveType: string
}

export type EmployeeAddLeaveCategories = {
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
  employeeSaveLeaveCalender: EmployeeSaveLeaveCalenderSetting
  employeeLeaveCategories: EmployeeLeaveCategories[]
  employeeLeaveCalender: EmployeeLeaveCalenderTypes
  employeeAddLeaveCategories: EmployeeAddLeaveCategories
  isLoading: LoadingState
  error: ValidationError
}

export type EmployeeLeaveCategoryProps = {
  confirmButtonText: string
  backButtonHandler: () => void
}
