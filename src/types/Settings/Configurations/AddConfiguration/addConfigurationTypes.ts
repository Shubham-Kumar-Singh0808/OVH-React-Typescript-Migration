import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { ValidationError } from '../../../commonTypes'

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
  isLoading: ApiLoadingState
  error: ValidationError
}

export type AddConfigurationProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}
