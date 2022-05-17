import { ValidationError } from '../../commonTypes'

export type EmployeeGeneralInformation = {
  id?: number
  baseLocation?: string
  bloodgroup?: string
  departmentName?: string
  designation?: string
  emailId?: string
  anniversary?: string
  curentLocation?: string
  country?: string
  employmentTypeName?: string
  address?: string
  emergencyContact?: string
  fullName?: string
  gender?: string
  jobTypeName?: string
  maritalStatus?: string
  officialBirthday?: string
  thumbPicture?: string
  personalEmail?: string
  realBirthday?: string
  projectManager?: string
  empManager?: string
  rbtCvPath?: string
  aboutMe?: string
  skypeId?: string
  rbtCvName?: string
}

export type EmployeeGeneralInformationState = {
  generalInformation: EmployeeGeneralInformation
  error: ValidationError
  isLoading: boolean
}
