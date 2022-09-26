import { ApiLoadingState } from '../../../middleware/api/apiList'

export type TrainerDetails = {
  designation: string
  emailId: string
  firstName: string
  fullName: string
  id: number
  lastName: string
  profilePicPath: string
}

export type Author = {
  designation: string
  emailId: string
  firstName: string
  fullName: string
  id: number
  lastName: string
  profilePicPath: string
}

export type Availability = {
  id: number
  availability: string
}

export type AddEvent = {
  agenda: string
  authorName: Author
  availability: Availability[]
  conferenceType: string
  description: string
  endTime: string
  eventLocation: string
  eventTypeId: number
  fromDate: string
  locationId: number
  projectName: string
  roomId: number
  startTime: string
  toDate: string
  trainerName: TrainerDetails
}

export type LoggedEmployee = {
  id: number
  profilePicPath: string
  firstName: string
  lastName: string
  emailId: string
  designation: string
  fullName: string
}

export type RoomsByLocation = {
  id: number
  roomName: string
  locationId: number
  locationName: string
  roomStatus: boolean
}

export type InitialNewEventSliceState = {
  isLoading: ApiLoadingState
  loggedEmployee: LoggedEmployee
  roomsByLocation: RoomsByLocation[]
  allEmployeesProfiles: LoggedEmployee[]
}

export type EventTypeList = {
  id: number
  name: string
}
