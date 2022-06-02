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

//AddNewEmployee export as main object
export type AddNewEmployeeState = {
  employeeDepartments?: EmployeeDepartment[]
  technologies?: GetAllTechnology[]
  countries?: GetCountries[]
  error: ValidationError
  isLoading: LoadingState
}
