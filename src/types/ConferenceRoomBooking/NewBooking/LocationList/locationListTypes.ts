import { ApiLoadingState } from '../../../../middleware/api/apiList'

export type getAllMeetingLocations = {
  id: number
  locationName: string
  locationStatus: null
}
export type AddLocationSliceState = {
  meetingLocations: getAllMeetingLocations[]
  isLoading: ApiLoadingState
  currentPage: number
  pageSize: number
}
