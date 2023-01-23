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

export type GetAllCycleList = {
  list: GetCycleList[]
  size: number
}

export type AppraisalTemplateSliceState = {
  isLoading: ApiLoadingState
  error: ValidationError
  listSize: number
  cycleList: GetCycleList[]
}
