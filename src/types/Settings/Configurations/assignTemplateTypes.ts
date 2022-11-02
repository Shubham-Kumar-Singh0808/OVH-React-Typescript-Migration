import { ApiLoadingState } from '../../../middleware/api/apiList'

export type getEmpDepartments = {
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
  allocationSupportFlag: boolean
}

export type getdesignationdeptId = {
  id: number
  name: string
  code: null
  departmentName: string
  departmentId: number
}

export type AssignTemplateSliceState = {
  empDepartments: getEmpDepartments[]
  designationdeptIds: getdesignationdeptId[]
  isLoading: ApiLoadingState
}
