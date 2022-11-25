import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ValidationError } from '../../SidebarMenu/sidebarMenuType'

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
export type getCycle = {
  active: boolean
  appraisalDuration: string
  appraisalEndDate: string
  appraisalStartDate: string
  appraisalType: string
  cycleStartedFlag: boolean
  description: string | null
  fromDate: string
  id: number
  level: number
  name: string
  servicePeriod: number
  toDate: string
}

export type AppraisalCycleSliceState = {
  appraisalCycle: getAppraisalCycle[]
  editAppraisalCycle: getCycle
  isLoading: ApiLoadingState
  currentPage: number
  pageSize: number
  error: ValidationError
}
