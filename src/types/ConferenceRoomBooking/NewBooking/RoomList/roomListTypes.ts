import { ApiLoadingState } from '../../../../middleware/api/apiList'

export type getAllMeetingRooms = {
  id: number
  roomName: string
  locationId: number
  locationName: string
  roomStatus: boolean
}
export type getAllMeetingLocations = {
  id: number
  locationName: string
  locationStatus: null
}
export type AddRoomListSliceState = {
  meetingRooms: getAllMeetingRooms[]
  meetingLocations: getAllMeetingLocations[]
  isLoading: ApiLoadingState
  currentPage: number
  pageSize: number
}
