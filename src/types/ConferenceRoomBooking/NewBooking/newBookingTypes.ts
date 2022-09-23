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

export type newBookingSliceState = {
  loggedEmployeeName: NewBookingLoggedEmployeeName[]
  isLoading: ApiLoadingState
}
