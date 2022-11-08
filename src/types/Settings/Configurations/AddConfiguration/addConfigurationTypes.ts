import { ApiLoadingState } from '../../../../middleware/api/apiList'

export enum ActiveStatus {
  'active' = 'Active',
  'inactive' = 'InActive',
}

export type AddCycle = {
  active: string
  appraisalDuration: number
  appraisalEndDate: string
  appraisalStartDate: string
  appraisalType: string
  description: string
  fromDate: string
  level: number
  name: string
  servicePeriod: string
  toDate: string
}

export type AddConfigurationSliceState = {
  cycleRecords: AddCycle
  isLoading: ApiLoadingState
}
