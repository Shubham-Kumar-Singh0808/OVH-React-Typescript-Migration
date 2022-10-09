import { LoadingState } from '../../types/commonTypes'

export type employeeProfileData = {
  designation: 'Senior Project Manager'
  emailId: 'test@raybiztech.com'
  firstName: 'Venkata Ananda '
  fullName: 'Venkata Ananda  Chanapathi'
  id: 1541
  lastName: 'Chanapathi'
  profilePicPath: '../profilepics/1541.jpeg'
}

export type BirthdayListTableSliceState = {
  isLoading: LoadingState
  employeeProfile: employeeProfileData[]
}
