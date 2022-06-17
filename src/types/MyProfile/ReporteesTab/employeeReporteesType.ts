import { ValidationError, LoadingState } from '../../commonTypes'

export type EmployeeReportee = {
  managerId: number
  managerName: string
  reporteeId: number
  reporteeName: string
  allcoationDetails: string
  mobile: string | null
}

export type EmployeeReporteesKRAs = {
  personId: number
  id: number
  name: string
  description: string
  kpiLookps: null
  count: number
  checkType: null
  designationName: string
  designationId: number
  departmentName: string
  departmentId: number
  designationKraPercentage: number
}
export type EmployeeReporteesKPIs = {
  id: number
  name: string
  description: string
}
export type ReporteesState = {
  employeeReportees: EmployeeReportee[]
  employeeReporteesKRAs: EmployeeReporteesKRAs[]
  employeeReporteesKPIs: EmployeeReporteesKPIs[]
  isLoading: LoadingState
  error: ValidationError
}
