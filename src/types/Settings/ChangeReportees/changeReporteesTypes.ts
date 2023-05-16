import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ValidationError } from '../../commonTypes'

export type EmployeeData = {
  id: number
  firstName: string
  lastName: string
  middleName: string | null
  designation: string
  role: string
  manager: string
  designationKrasDTO: null
  employeeSubmitted: null
  managerSubmitted: null
  acknowledged: null
  fullName: string
  profilePicPath: string
  thumbPicture: null
  profilePicGeneratedPath: null
  gender: string | null
  dob: string
  departmentName: string
  employmentTypeName: null
  jobTypeName: string
  imageData: null
  curentLocation: null
  baseLocation: null
  officialBirthday: null
  realBirthday: null
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
  refreshList: boolean
  isLoading: ApiLoadingState
  currentPage: number
  pageSize: number
  error: ValidationError
}

export type ChangeReporteesProps = {
  managersOrHrManagersList: EmployeeData[]
  placeHolder: string
  autoCompleteTarget: string
  setAutoCompleteTarget: React.Dispatch<React.SetStateAction<string>>
  shouldRenderTable: boolean
  setShouldRenderTable: React.Dispatch<React.SetStateAction<boolean>>
}
