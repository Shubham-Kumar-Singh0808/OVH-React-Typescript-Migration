import { ValidationError } from '../../commonTypes'
export type EmployeeReportees = {
  managerId: number
  managerName: string
  reporteeId: number
  reporteeName: string
  allcoationDetails: string
  mobile: null
  personId: number
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

export type ReporteesState = {
  employeeReportees: EmployeeReportees[]
  employeeReporteesKRAs: EmployeeReporteesKRAs[]
  isLoading: boolean
  error: ValidationError
}
