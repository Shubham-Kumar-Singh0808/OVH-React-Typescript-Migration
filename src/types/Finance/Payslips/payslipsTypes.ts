import { ValidationError, LoadingState } from '../../commonTypes'

export type EmployeePayslips = {
  empId: number
  year: string
  month: string
}
export type PaySlipsState = {
  error: ValidationError
  isLoading: LoadingState
  employeePaySlips: EmployeePayslips[]
}
