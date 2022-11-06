import { ApiLoadingState } from '../../../middleware/api/apiList'

export type getAppraisalCycle = {
  id: number
  name: string
  description: string | null
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

export type AppraisalCycleSliceState = {
  appraisalCycle: getAppraisalCycle[]
  isLoading: ApiLoadingState
  currentPage: number
  pageSize: number
}
