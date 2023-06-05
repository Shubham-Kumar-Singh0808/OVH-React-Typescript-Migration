import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ValidationError } from '../../SidebarMenu/sidebarMenuType'

export type GetAppraisalCycle = {
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
export type GetCycle = {
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
  appraisalCycle: GetAppraisalCycle[]
  editAppraisalCycle: GetCycle
  isLoading: ApiLoadingState
  error: ValidationError
  listSize: number
}

export type AppraisalCycleTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type AppraisalCycleApiProps = {
  startIndex?: number
  endIndex?: number
}
