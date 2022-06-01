import { LoadingState, ValidationError } from '../../../commonTypes'

export type EmployeeDepartment = {
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
  allocationSupportFlag: boolean
}
export interface DynamicFormLabelProps {
  dynamicFormLabelProps: (htmlFor: string, className: string) => void
}
export interface DateChangeHandlerProp extends DynamicFormLabelProps {
  onDateChangeHandler: (e: Date) => void
}
export interface EmployeeDepartmentProps extends DynamicFormLabelProps {
  departmentsList: EmployeeDepartment[]
}

export type AddNewEmployeeState = {
  employeeDepartments: EmployeeDepartment[]
  error: ValidationError
  isLoading: LoadingState
}
