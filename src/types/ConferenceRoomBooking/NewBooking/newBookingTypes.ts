import { ApiLoadingState } from '../../../middleware/api/apiList'
import { GetAllProjects } from '../../ProjectManagement/AllocateEmployee/allocateEmployeeTypes'
import { GetBookingsForSelection } from '../BookingList/bookingListTypes'

export type NewBookingLoggedEmployeeName = {
  id: number
  profilePicPath: string
  firstName: string
  lastName: string
  emailId: string
  designation: string
  fullName: string
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

export type newBookingSliceState = {
  loggedEmployeeName: NewBookingLoggedEmployeeName
  isLoading: ApiLoadingState
  allEmployeesProfiles: NewBookingLoggedEmployeeName[]
  toggle: ''
  getBookingsForSelection: GetBookingsForSelection[]
}

export type AddRoom = {
  agenda: string
  authorName: Author
  availability: Availability[]
  conferenceType: string
  employeeIds: []
  endTime: string
  fromDate: string
  locationId: number
  projectName: string
  roomId: number
  startTime: string
}

export type ConfirmNewMeetingAppointment = {
  agenda: string
  authorName: Author
  availability: Availability[]
  conferenceType: string
  employeeIds?: []
  endTime: string
  fromDate: string
  locationId: number
  projectName: string | GetAllProjects
  roomId: number | string
  startTime: string
}
export type ShouldResetNewBookingFields = {
  projectName: boolean
  startEndTime: boolean
  trainer?: boolean
}

export type GetBookedRoomParams = {
  date: string
  roomid: number
}
