import { ApiLoadingState } from '../../../middleware/api/apiList'

export type NewBookingLoggedEmployeeName = {
  id: 1985
  profilePicPath: '../profilepics/Default_Male.jpg'
  firstName: 'Vinesh'
  lastName: 'Merugu'
  emailId: 'test@raybiztech.com'
  designation: 'Associate Software Engineer'
  fullName: 'Vinesh Merugu'
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
  roomId: string
  startTime: string
}
