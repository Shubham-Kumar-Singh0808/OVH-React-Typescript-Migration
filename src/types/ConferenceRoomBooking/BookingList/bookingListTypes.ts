import { LoadingState } from '../../commonTypes'
import { Author, Availability } from '../NewBooking/newBookingTypes'
import { TrainerDetails } from '../NewEvent/newEventTypes'

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
  currentPage: number
  pageSize: number
  editMeetingRequest: EditMeetingRequest

  LocationValue: string
  RoomValue: string
  MeetingStatus: string
  SelectCustom: string
  FromDateValue: string | Date
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
  projectName: null | string
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
  isAuthorisedUser: boolean
  locationId: number
  employeeAvailability: null
  timeFomrat: string
  disableEdit: boolean
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
  employeeDto: [
    {
      id: number
      profilePicPath: string
      firstName: string
      lastName: string
      emailId: string
      designation: string
      fullName: string
    },
  ]
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

export type handleModelProps = {
  agenda: string
  fullName: string
  startTime: string
  endTime: string
  fromDate: string
  roomName: string
  locationName: string
  description: string
}

export type MeetingEditDTOList = {
  flag?: string
  fullName?: string
  id: number
  availability: string
}

export type EditMeetingRequest = {
  id: number
  agenda: string
  roomId: number
  roomName: string
  locationName: string
  fromDate: string
  toDate: string
  startTime: string
  endTime: string
  projectName: string
  employeeIds: null
  authorName: Author
  employeeNames: []
  isAuthorisedUser: boolean
  locationId: number
  employeeAvailability: null
  timeFomrat: null
  disableEdit: null
  meetingEditDTOList: MeetingEditDTOList[]
  meetingAttendeesDto: null
  availability: Availability[]
  meetingStatus: null
  conferenceType: string
  eventTypeName: null
  eventTypeId: number
  eventLocation: string
  eventId: number
  description: string
  eventEditAccess: null
  empDesignations: null
  employeeDto: null
  trainerName: TrainerDetails
  availableDates: string
}

export type UpdateRoomBooking = {
  agenda: string
  authorName: Author
  availability: null
  availableDates: null
  conferenceType: string
  description: null
  disableEdit: null
  empDesignations: null
  employeeAvailability: null
  employeeDto: null
  employeeIds: null
  employeeNames: []
  endTime: string
  eventEditAccess: null
  eventId: null
  eventLocation: null
  eventTypeId: null
  eventTypeName: null
  fromDate: string
  id: number
  isAuthorisedUser: boolean
  locationId: string | number
  locationName: string
  meetingAttendeesDto: null
  meetingEditDTOList: MeetingEditDTOList[]
  meetingStatus: null
  projectName: string
  roomId: number
  roomName: string
  startTime: string
  timeFomrat: null
  toDate: null
  trainerName: null
}
