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
  profilePicPath?: string
  homeNumber?: string
  mobile?: string
  alternativeMobile?: string
  workNumber?: string
  updatedExperience?: string | number
  homeCode?: string
  workCode?: string
  emergencyContactName?: string
  emergencyPhone?: string
  emergencyRelationShip?: string
  presentAddress?: string
  presentCity?: string
  presentZip?: string
  presentLandMark?: string
  permanentAddress?: string
  permanentCity?: string
  permanentZip?: string
  permanentLandMark?: string
  passportNumber?: string
  passportIssuedPlace?: string
  passportIssuedDate?: string
  passportExpDate?: string
  passportFrontPagePath?: string
  passportBackPagePath?: string
  imageData?: string
}
export type ProfileDetailsProps = {
  employeeGeneralInformation: EmployeeGeneralInformation
}
export type EmployeeGeneralInformationState = {
  generalInformation: EmployeeGeneralInformation
  selectedEmployeeInformation: EmployeeGeneralInformation
  error: ValidationError
  isLoading: boolean
}

export type EmployeeContactInformation = {
  mobile: string | undefined
  alternativeMobile: string | undefined
  homeCode: string | undefined
  homeNumber: string | undefined
  workCode: string | undefined
  workNumber: string | undefined
}

export type EmployeeEmergencyContactInformation = {
  emergencyContactName: string | undefined
  emergencyPhone: string | undefined
  emergencyRelationShip: string | undefined
}

export type EmployeePassportDetails = {
  passportNumber: string | undefined
  passportIssuedPlace: string | undefined
  passportIssuedDate: string | undefined
  passportExpDate: string | undefined
  passportFrontPagePath: string | undefined
  passportBackPagePath: string | undefined
}
