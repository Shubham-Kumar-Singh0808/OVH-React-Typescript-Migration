import { ValidationError } from '../../commonTypes'
export type EmployeeReportees = {
  managerId: number
  managerName: string
  reporteeId: number
  reporteeName: string
  allcoationDetails: string
  mobile: null
}

export type ReporteesState = {
  employeeReportees: EmployeeReportees[]
  isLoading: boolean
  error: ValidationError
}
