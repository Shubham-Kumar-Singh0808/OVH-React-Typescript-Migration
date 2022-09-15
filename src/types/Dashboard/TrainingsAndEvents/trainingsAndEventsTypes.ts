import { LoadingState, ValidationError } from '../../commonTypes'

export type Author = {
  designation: string
  emailId: string
  firstName: string
  fullName: string
  id: number
  lastName: string
  profilePicPath: string
}

export type Trainer = {
  designation: string
  emailId: string
  firstName: string
  fullName: string
  id: number
  lastName: string
  profilePicPath: string
}

export type TrainingAndEvent = {
  agenda: string
  authorName: Author
  availability: null
  availableDates: null
  conferenceType: string
  description: string
  disableEdit: true
  empDesignations: []
  employeeAvailability: null
  employeeDto: []
  employeeIds: []
  employeeNames: []
  endTime: string
  eventEditAccess: true
  eventId: null
  eventLocation: string
  eventTypeId: number
  eventTypeName: string
  fromDate: string
  id: number
  isAuthorisedUser: boolean
  locationId: number
  locationName: string
  meetingAttendeesDto: null
  meetingEditDTOList: null
  meetingStatus: string
  projectName: null
  roomId: number
  roomName: string
  startTime: string
  timeFomrat: string
  toDate: string
  trainerName: Trainer
}

export type TrainingsAndEventsSliceState = {
  upcomingTrainings: TrainingAndEvent[]
  upcomingEvents: TrainingAndEvent[]
  isLoading: LoadingState
  error: ValidationError
}
