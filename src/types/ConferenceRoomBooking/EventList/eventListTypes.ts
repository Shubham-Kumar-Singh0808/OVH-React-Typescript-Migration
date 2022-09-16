import { LoadingState, ValidationError } from '../../commonTypes'

export type EventListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type EventListApiProps = {
  startIndex?: number
  endIndex?: number
  dateSelection?: string
  eventTypeId?: number
  searchFromDate?: string
  searchToDate?: string
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

export type Event = {
  agenda: string
  authorName: Author
  availability: null
  availableDates: null
  conferenceType: string
  description: string
  disableEdit: boolean
  empDesignations: []
  employeeAvailability: null
  employeeDto: []
  employeeIds: []
  employeeNames: []
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

export type GetEventListResponse = {
  list: Event[]
  size: number
}

export type EventListSliceState = {
  events: Event[]
  selectedMonth: string
  listSize: number
  isLoading: LoadingState
  error: ValidationError
}
