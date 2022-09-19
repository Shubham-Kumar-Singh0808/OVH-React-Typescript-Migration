import { LoadingState } from '../../commonTypes'

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
  getBookingsForSelection: GetBookingsForSelection[]
  isLoading: LoadingState
}

export type GetBookingsForSelectionProps = {
  location: number
  meetingStatus: string
  room: string
  status: string
}

export type GetBookingsForSelection = {
  id: number
  agenda: string
  roomId: number
  roomName: string
  locationName: string
  fromDate: string
  toDate: null | string
  startTime: string
  endTime: string
  projectName: null
  employeeIds: []
  authorName: {
    id: number
    profilePicPath: string
    firstName: string
    lastName: string
    emailId: string
    designation: string
    fullName: string
  }
  employeeNames: []
  isAuthorisedUser: false
  locationId: number
  employeeAvailability: null
  timeFomrat: string
  disableEdit: false
  meetingEditDTOList: null
  meetingAttendeesDto: null
  availability: null
  meetingStatus: string
  conferenceType: string
  eventTypeName: null
  eventTypeId: null
  eventLocation: string
  eventId: number
  description: string
  eventEditAccess: true
  empDesignations: []
  employeeDto: []
  trainerName: {
    id: number
    profilePicPath: string
    firstName: string
    lastName: string
    emailId: string
    designation: string
    fullName: string
  }
  availableDates: null
}
