import { ApiLoadingState } from '../../../../middleware/api/apiList'

export type getAllMeetingLocations = {
  // id: number
  // locationName: string
  // locationStatus: null
  List: LocationList[]
  size: number
}

export type LocationList = {
  id: number
  locationName: string
  locationStatus: null
}

export type AddLocationSliceState = {
  meetingLocations: getAllMeetingLocations
  isLoading: ApiLoadingState
  currentPage: number
  pageSize: number
  locationList: LocationList[]
}

export type AddLocationProps = {
  startIndex: number
  endIndex: number
}
