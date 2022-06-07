import { LoadingState, ValidationError } from '../../../commonTypes'

//AddNewEmployee child component types
export type EmployeeDepartment = {
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
  allocationSupportFlag: boolean
}

export type GetAllTechnology = {
  id: number
  name: string
}
export type GetCountries = {
  id: number
  name: string
}

export type GetHrData = {
  id: number
  fullName: string
}

export type GetAllReportingManagers = {
  id: number
  fullName: string
}
//AddNewEmployee functions and Props types for child components
export interface DynamicFormLabelProps {
  dynamicFormLabelProps: (htmlFor: string, className: string) => void
}
export interface DateChangeHandlerProp extends DynamicFormLabelProps {
  onDateChangeHandler: (e: Date) => void
}

export interface EmployeeDepartmentProps extends DynamicFormLabelProps {
  departmentsList: EmployeeDepartment[]
}
export interface TechnologyProps extends DynamicFormLabelProps {
  technologyList: GetAllTechnology[]
}
export interface CountryProps extends DynamicFormLabelProps {
  countryList: GetCountries[]
}

export interface HrDataProps extends DynamicFormLabelProps {
  hrDataList: GetHrData[]
}
export interface ReportingManagerProps extends DynamicFormLabelProps {
  reportingManagersList: GetAllReportingManagers[]
}

//AddNewEmployee export as main object
export type AddNewEmployeeState = {
  employeeDepartments?: EmployeeDepartment[]
  technologies?: GetAllTechnology[]
  countries?: GetCountries[]
  hrData?: GetHrData[]
  reportingManagers?: GetAllReportingManagers[]
  error: ValidationError
  isLoading: LoadingState
}
