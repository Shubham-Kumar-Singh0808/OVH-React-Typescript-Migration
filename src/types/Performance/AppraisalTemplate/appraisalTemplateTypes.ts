import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ValidationError } from '../../commonTypes'

export type GetCycleList = {
  id: number
  name: string
  description: string
  toDate: string
  fromDate: string
  active: boolean
  appraisalType: string
  appraisalDuration: string
  level: number
  cycleStartedFlag: boolean
  appraisalStartDate: string
  appraisalEndDate: string
  servicePeriod: number
}

export type AppraisalTemplateSliceState = {
  isLoading: ApiLoadingState
  error: ValidationError
  listSize: number
  cycleList: GetCycleList[]
  designationsUnderCycle: GetDesignationsUnderCycle[]
  currentPage: number
  pageSize: number
  designationsUnderCycleProps: DesignationsUnderCycleResponse
  designationWiseKRAs: GetDesignationWiseKRAs[]
  searchKRAData: SearchKRAList
  kpiForIndividualKra: KpiForIndividualKra[]
}

export type AppraisalCycleDto = {
  id: number
  name: string
  description: string
  toDate: string
  fromDate: string
  active: boolean
  appraisalType: string
  appraisalDuration: string
  level: number
  cycleStartedFlag: boolean
  appraisalStartDate: string
  appraisalEndDate: string
  servicePeriod: number
}
export type Designation = {
  id: number
  name: string
  code: string
  departmentName: string
  departmentId: number
}
export type KraLookups = {
  id: number
  name: string
  description: null
  kpiLookps: null
  count: 1
  checkType: null
  designationName: string
  designationId: number
  departmentName: string
  departmentId: number
  designationKraPercentage: number
}

export type GetDesignationsUnderCycle = {
  id: number
  designation: Designation
  appraisalCycleDto: AppraisalCycleDto
  kraLookups: KraLookups[]
}

export type DesignationsUnderCycleProps = {
  cycleId: number
  endIndex: number
  startIndex: number
}

export type DesignationsUnderCycleResponse = {
  list: GetDesignationsUnderCycle[]
  size: number
}

export type GetDesignationWiseKRAs = {
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

export type DesignationWiseKRAsProps = {
  departmentId: number
  designationId: number
}

export type DesignationWiseKRAsWithNumber = {
  id: 153
  name: 'Bankers and Lawyer Management'
  description: null
  kpiLookps: null
  count: 1
  checkType: null
  designationName: 'Finance and Account Executive '
  designationId: 51
  departmentName: 'Accounts'
  departmentId: 4
  designationKraPercentage: 5.0
}

export type SearchKRA = {
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

export type SearchKRAList = {
  size: number
  list: SearchKRA[]
}

export type KpiForIndividualKra = {
  id: number
  name: string
  description: string
  frequencyId: number
  frequency: string
  target: string
  kraDto: kraDto
}

export type kraDto = {
  id: number
  name: string
  description: null
  kpiLookps: null
  count: number
  checkType: null
  designationName: null
  designationId: null
  departmentName: null
  departmentId: null
  designationKraPercentage: null
}
