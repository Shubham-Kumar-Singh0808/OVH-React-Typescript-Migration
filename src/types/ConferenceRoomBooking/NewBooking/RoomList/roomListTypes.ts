import { ApiLoadingState } from '../../../../middleware/api/apiList'

export type getAllMeetingRooms = {
  id: number
  roomName: string
  locationId: number
  locationName: string
  roomStatus: boolean
}
export type AddRoomListSliceState = {
  meetingRooms: getAllMeetingRooms[]
  isLoading: ApiLoadingState
  currentPage: number
  pageSize: number
}
