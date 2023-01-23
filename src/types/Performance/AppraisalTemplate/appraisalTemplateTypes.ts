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
