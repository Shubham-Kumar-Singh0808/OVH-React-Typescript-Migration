import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ValidationError } from '../../commonTypes'

export type TrainerDetails = {
  designation: string
  emailId: string
  firstName: string
  fullName: string
  id: number
  lastName: string
  profilePicPath: string
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
  name?: string
}

export type AddEvent = {
  agenda: string
  authorName: Author
  availability: Availability[]
  conferenceType: string
  description?: string
  endTime: string
  eventLocation?: string
  eventTypeId?: number
  fromDate: string
  locationId: number
  projectName: string
  roomId: number
  startTime: string
  toDate?: string
  trainerName?: TrainerDetails
}

export type LoggedEmployee = {
  id: number
  profilePicPath: string
  firstName: string
  lastName: string
  emailId: string
  designation: string
  fullName: string
}

export type RoomsByLocation = {
  id: number
  roomName: string
  locationId: number
  locationName: string
  roomStatus: boolean
}

export type InitialNewEventSliceState = {
  isLoading: ApiLoadingState
  loggedEmployee: LoggedEmployee
  roomsByLocation: RoomsByLocation[]
  allEmployeesProfiles: LoggedEmployee[]
  projectMembers: ProjectMember[]
  error: ValidationError
  allBookedDetailsForEvent: GetAllBookedDetailsForEvent[]
  trainer: TrainerDetails
}

export type EventTypeList = {
  id: number
  name: string
}

export type ProjectMember = {
  availability?: string
  id: number
  firstName: string
  lastName: string
  middleName: string
  designation: string
  role: string
  manager: string
  designationKrasDTO: null
  employeeSubmitted: null
  managerSubmitted: null
  acknowledged: null
  fullName: string
  profilePicPath: null
  thumbPicture: string
  profilePicGeneratedPath: string
  gender: string
  dob: string
  departmentName: string
  employmentTypeName: string
  jobTypeName: string
  imageData: null
  curentLocation: null
  baseLocation: string
  officialBirthday: string
  realBirthday: null
  maritalStatus: null
  emergencyContactName: string
  emergencyPhone: string
  emergencyRelationShip: string
  grade: string
  aboutMe: string
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
  candidateId: number
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

export type UniqueAttendeeParams = {
  attendeeId: number
  attendeeName: string
  endTime: string
  startTime: string
  meetingRequestId?: number
}

export type GetBookedEventsParams = {
  fromDate: string
  roomId: number
  toDate: string
}

export type GetAllBookedDetailsForEvent = {
  date: string
  timings: string[]
}
