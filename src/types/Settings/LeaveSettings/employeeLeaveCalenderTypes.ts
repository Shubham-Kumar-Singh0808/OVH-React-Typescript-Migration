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

export type EmployeeLeaveCategory = {
  id: number
  name: string
  leaveType: string
}

export type EmployeeAddUpdateLeaveCategory = {
  id?: number
  name: string
  leaveType: string
}

export type EmployeeLeaveCalender = {
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
  employeeLeaveCategories: EmployeeLeaveCategory[]
  employeeLeaveCalender: EmployeeLeaveCalender
  employeeAddLeaveCategories: EmployeeAddUpdateLeaveCategory
  isLoading: LoadingState
  error: ValidationError
}

export type EmployeeLeaveCategoryProps = {
  confirmButtonText: string
  backButtonHandler: () => void
}

export type EmployeeLeaveCategoriesProps = {
  setToggle: (value: string) => void
}
