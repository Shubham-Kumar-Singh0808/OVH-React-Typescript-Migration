import { LoadingState, ValidationError } from '../../commonTypes'

export type MeetingLocations = {
  id: number
  locationName: string
  locationStatus: null | string
}

export type RoomsOfLocation = {
  id: number
  roomName: string
  locationId: number
  locationName: string
  roomStatus: boolean
}

export type BookingListSliceState = {
  meetingLocation: MeetingLocations[]
  roomsOfLocation: RoomsOfLocation[]
  isLoading: LoadingState
}

export type getBookingsForSelectionProps = {
  location: number
  meetingStatus: string
  room: string
  status: string
}

export type BookingList = {
  location: number
  locationName: string
  meetingStatus: string
  room: string
  status: string
}
