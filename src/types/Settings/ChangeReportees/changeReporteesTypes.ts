import { ApiLoadingState } from '../../../middleware/api/apiList'

export type EmployeeData = {
  id: number
  firstName: string
  lastName: string
  middleName: string | null
  designation: string
  role: string | null
  manager: string | null
  designationKrasDTO: string | null
  employeeSubmitted: string | null
  managerSubmitted: string | null
  acknowledged: string | null
  fullName: string
  profilePicPath: string | null
  thumbPicture: string | null
  profilePicGeneratedPath: string | null
  gender: string | null
  dob: string | null
  departmentName: string
  employmentTypeName: null
  jobTypeName: string | null
  imageData: string | null
  curentLocation: string | null
  baseLocation: string | null
  officialBirthday: null
  realBirthday: string | null
  maritalStatus: null
  emergencyContactName: null
  emergencyPhone: null
  emergencyRelationShip: null
  grade: null
  aboutMe: null
  homeNumber: null
  workNumber: null
  presentAddress: null
  presentCity: null
  presentZip: null
  presentLandMark: null
  permanentAddress: null
  permanentCity: null
  permanentZip: null
  permanentLandMark: null
  mobile: null
  homeCode: null
  workCode: null
  skillList: null
  userName: null
  alternativeMobile: null
  dateOfJoining: null
  informationList: null
  anniversary: null
  bankInformationList: null
  bioAttendanceDtoSet: null
  dates: null
  absentCount: number
  statusName: null
  emergencyContact: null
  relievingDate: null
  observationDTOList: null
  skypeId: null
  percent: null
  passportNumber: null
  passportExpDate: null
  passportIssuedPlace: null
  passportIssuedDate: null
  token: null
  underNoticeDate: null
  candidateId: null
  underNotice: null
  emailId: null
  empManager: null
  bloodgroup: null
  rbtCvPath: null
  rbtCvName: null
  timeSlotDTO: null
  technology: null
  hrAssociate: null
  lateComingCount: null
  passportFrontPagePath: null
  passportBackPagePath: null
  passportFrontPage: null
  passportBackPage: null
  projectManager: null
  casualLeaveCount: number
  lopLeaveCount: number
  holidaysCount: number
  contractExists: null
  contractStartDate: null
  contractEndDate: null
  personalEmail: null
  experience: null
  companyExperience: null
  updatedExperience: null
  country: null
  workStatus: null
  comments: null
  vendorId: null
  vendorName: null
  countryCodeWork: null
  countryCodeMobile: null
  countryCodeHome: null
  countryCodeEmergency: null
  countryCodeAlternative: null
  address: null
}

export type UpdateManager = {
  employeeId: number[]
  managerId: number
}

export type ChangeReporteesSliceState = {
  AllReportingManagerList: EmployeeData[]
  AllHRList: EmployeeData[]
  EmployeesUnderManager: EmployeeData[]
  EmployeesUnderHRManager: EmployeeData[]
  isLoading: ApiLoadingState
}

export type ChangeReporteesProps = {
  managersOrHrManagersList: EmployeeData[]
  placeHolder: string
  autoCompleteTarget: string
  setAutoCompleteTarget: React.Dispatch<React.SetStateAction<string>>
  shouldRenderTable: boolean
  setShouldRenderTable: React.Dispatch<React.SetStateAction<boolean>>
}
