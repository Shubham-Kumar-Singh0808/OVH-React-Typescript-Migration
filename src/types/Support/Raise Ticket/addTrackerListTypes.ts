import { ApiLoadingState } from '../../../middleware/api/apiList'

export type Tracker = {
  id: number
  name: string
  permission: boolean
}

export type AddTrackerSliceState = {
  isLoading: ApiLoadingState
  trackerList: Tracker[]
}
