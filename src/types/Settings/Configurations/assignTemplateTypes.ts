import { ApiLoadingState } from '../../../middleware/api/apiList'

export type getEmpDepartments = {
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
  allocationSupportFlag: boolean
}

export type getDepartmentNames = {
  id: number
  name: string
  code: null
  departmentName: string
  departmentId: number
}

export type getDesignationWiseKRA = {
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

export type AssignTemplateSliceState = {
  empDepartments: getEmpDepartments[]
  designationDeptIds: getDepartmentNames[]
  designationWiseKRA: getDesignationWiseKRA[]
  isLoading: ApiLoadingState
  kpisForIndividualKra: IndividualKra[]
}

export type IndividualKra = {
  id: number
  name: string
  description: string
  frequencyId: number
  frequency: string
  target: string
  kraDto: kraData
}

export type kraData = {
  id: number
  name: string
  description: null
  kpiLookps: null
  count: 0
  checkType: null
  designationName: null
  designationId: null
  departmentName: null
  departmentId: null
  designationKraPercentage: null
}
