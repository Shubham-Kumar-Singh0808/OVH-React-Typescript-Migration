import { ApiLoadingState } from '../../../middleware/api/apiList'

export type LoggedEmployeeName = {
  id: 1985
  profilePicPath: '../profilepics/Default_Male.jpg'
  firstName: 'Vinesh'
  lastName: 'Merugu'
  emailId: 'test@raybiztech.com'
  designation: 'Associate Software Engineer'
  fullName: 'Vinesh Merugu'
}

export type AddLocationSliceState = {
  loggedEmployeeName: LoggedEmployeeName[]
  isLoading: ApiLoadingState
}
