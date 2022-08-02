import { LoadingState, ValidationError } from '../../commonTypes'

export type EmployeeSaveLeaveCalenderSetting = {
  id: string
  leaveCycleMonth: string
  leavesPerYear?: number | string
  maxAccrualPerYear: number | string
  maxLeavesEarned: number | string
  payrollCutoffDate: number | string
  probationPeriod: number | string
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

export type LeaveSettingsState = {
  employeeSaveLeaveCalender: EmployeeSaveLeaveCalenderSetting
  employeeLeaveCategories: EmployeeLeaveCategory[]
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
