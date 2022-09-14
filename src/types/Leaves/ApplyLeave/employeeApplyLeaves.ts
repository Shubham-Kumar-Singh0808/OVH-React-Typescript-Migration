import { LoadingState, ValidationError } from '../../commonTypes'

export type EmployeeLeaveApply = {
  employeeComments: string
  employeeId?: number | string
  fromDate?: string
  id?: string
  leaveAppliedOn?: string | number | Date
  leaveCategoryName: string
  toDate?: string
}
export type EmployeeLeaveType = {
  id: number
  name: string
  leaveType: string
}

export type EmployeeLeaveApplyState = {
  employeeLeaveApply: EmployeeLeaveApply
  employeeLeaveType: EmployeeLeaveType[]
  isLoading: LoadingState
  error: ValidationError
}
