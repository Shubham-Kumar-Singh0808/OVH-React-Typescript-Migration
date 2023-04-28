import { LoadingState, ValidationError } from '../../commonTypes'
import { Availability } from '../NewEvent/newEventTypes'

export type EventListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  selectDate: string
}

export type EventListApiProps = {
  startIndex?: number
  endIndex?: number
  dateSelection?: string
  eventTypeId?: number
  searchFromDate?: string
  searchToDate?: string
}

export type FeedbackFormApiProps = {
  endIndex?: number
  eventId?: number
  startIndex?: number
}

export type EventListOptions = {
  selectDate: string
  setSelectDate: (value: string) => void
  eventFromDate: string
  setEventFromDate: (value: string) => void
  eventToDate: string
  setEventToDate: (value: string) => void
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

export type Trainer = {
  designation: string
  emailId: string
  firstName: string
  fullName: string
  id: number
  lastName: string
  profilePicPath: string
}

export type EmployeeDTO = {
  designation: string
  emailId: string
  firstName: string
  fullName: string
  id: number
  lastName: string
  profilePicPath: string
}

export type Event = {
  agenda: string
  authorName: Author
  availability: null
  availableDates: null
  conferenceType: string
  description: string
  disableEdit: boolean
  empDesignations: string[]
  employeeAvailability: null
  employeeDto: EmployeeDTO[]
  employeeIds: []
  employeeNames: string[]
  endTime: string
  eventEditAccess: boolean
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

export type FeedbackForm = {
  id: number
  createdBy: string
  createdDate: string
  employeeId: null
  eventId: number
  feedBackFormName: string
  feedbackFormPath: string
}

export type FeedbackFormTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type GetEventListResponse = {
  list: Event[]
  size: number
}

export type GetFeedbackFormResponse = {
  list: FeedbackForm[]
  size: number
}

export type DownloadFeedbackFormInterface = {
  fileName?: string
  tenantKey?: string
  token?: string
}

export type UploadFeedbackFormInterface = {
  eventId: number
  file: FormData
}

export type MeetingEditDTOList = {
  availability: string
  flag?: string
  fullName?: string
  id: number
}

export type EditExistingEventDetails = {
  agenda: string
  authorName: Author
  availability: Availability[]
  availableDates: null
  conferenceType: string
  description: string
  disableEdit: null
  empDesignations: null
  employeeAvailability: null
  employeeDto: null
  employeeIds: null
  employeeNames: []
  endTime: string
  eventEditAccess: null
  eventId: null
  eventLocation: string
  eventTypeId: number
  eventTypeName: string
  fromDate: string
  id: number
  isAuthorisedUser: true
  locationId: number
  locationName: string
  meetingAttendeesDto: null
  meetingEditDTOList: MeetingEditDTOList[]
  meetingStatus: null
  projectName: string
  roomId: number
  roomName: string
  startTime: string
  timeFomrat: null
  toDate: string
  trainerName: Trainer
}

export type UpdateEventDetails = {
  agenda: string
  authorName: Author
  availability: Availability[]
  availableDates: null
  conferenceType: string
  description: string
  disableEdit: null
  empDesignations: null
  employeeAvailability: null
  employeeDto: null
  employeeIds: null
  employeeNames: []
  endTime: string
  eventEditAccess: null
  eventId: null
  eventLocation: string
  eventTypeId: number
  eventTypeName: string
  fromDate: string
  id: number
  isAuthorisedUser: true
  locationId: number
  locationName: string
  meetingAttendeesDto: null
  meetingEditDTOList: MeetingEditDTOList[]
  meetingStatus: null
  projectName: string
  roomName: string
  startTime: string
  timeFomrat: null
  toDate: string
  trainerName: Trainer
}

export type EventListSliceState = {
  events: Event[]
  feedbackFormDetails: FeedbackForm[]
  selectedMonth: string
  listSize: number
  feedbackFormListSize: number
  editExistingEventData: EditExistingEventDetails
  updateEventData: UpdateEventDetails
  isLoading: LoadingState
  error: ValidationError
  SelectCustom: string
  FromDateFilter: string | Date
  ToDateFilter: string | Date
}
