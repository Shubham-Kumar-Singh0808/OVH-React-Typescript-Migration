import { ApiLoadingState } from '../../../middleware/api/apiList'

export type EmpDepartments = {
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
  allocationSupportFlag: boolean
}

export type Designations = {
  id: number
  name: string
  code: null
  departmentName: string
  departmentId: number
}

export type DesignationWiseKRA = {
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
  empDepartments: EmpDepartments[]
  designationDeptIds: Designations[]
  designationWiseKRA: DesignationWiseKRA[]
  isLoading: ApiLoadingState
  kpisForIndividualKra: KpiForIndividualKra[]
  kraList: SearchKRAData
  empDesignations: Designations
}

export type KpiForIndividualKra = {
  id: number
  name: string
  description: string
  frequencyId: number
  frequency: string
  target: string
  kraDto: EmpKraList
}

export type EmpKraList = {
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

export type SearchKRAData = {
  size: number
  list: DesignationWiseKRA[]
}

export type AssignTemplateOptions = {
  selectDepartment: number
  selectDesignation: number
}
