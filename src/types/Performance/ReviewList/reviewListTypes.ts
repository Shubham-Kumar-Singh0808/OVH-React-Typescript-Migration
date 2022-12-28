import { LoadingState, ValidationError } from '../../commonTypes'

export type EmpDepartments = {
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
  allocationSupportFlag: boolean
}

export type ReviewListSliceState = {
  employeeDepartments: EmpDepartments[]
  isLoading: LoadingState
  error: ValidationError
}
