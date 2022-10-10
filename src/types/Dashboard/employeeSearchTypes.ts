import { LoadingState } from '../../types/commonTypes'

export type employeeProfileData = {
  designation: string
  emailId: string
  firstName: string
  fullName: string
  id: number
  lastName: string
  profilePicPath: string
}

export type employeeProfileProps = {
  searchStr?: string
}

export type employeeProfileSearchState = {
  isLoading: LoadingState
  employeeProfile: employeeProfileData[]
}
