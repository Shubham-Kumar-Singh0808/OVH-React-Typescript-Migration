import { ApiLoadingState } from '../../../middleware/api/apiList'
import { EmployeeDTOList } from '../../Leaves/LeaveReports/leaveReportTypes'

export interface EmployeeData extends EmployeeDTOList {
  countryCodeWork: null | string
  countryCodeMobile: null | string
  countryCodeHome: null | string
  countryCodeEmergency: null | string
  countryCodeAlternative: null | string
}

export type UpdateManager = {
  employeeId: number[]
  managerId: number
}

export type ChangeReporteesSliceState = {
  AllReportingManagerList: EmployeeData[]
  AllHRList: EmployeeData[]
  EmployeesUnderManager: EmployeeData[]
  EmployeesUnderHRManager: EmployeeData[]
  isLoading: ApiLoadingState
}

export type ChangeReporteesProps = {
  managersOrHrManagersList: EmployeeData[]
  placeHolder: string
  autoCompleteTarget: string
  setAutoCompleteTarget: React.Dispatch<React.SetStateAction<string>>
  shouldRenderTable: boolean
  setShouldRenderTable: React.Dispatch<React.SetStateAction<boolean>>
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}
