import { LoadingState, ValidationError } from '../../commonTypes'

export type MyReviewTabList = {
  id: number
  tabName: string
  label: string
}

export type PageDetails = {
  country: null
  departmentId: null
  departmentName: null
  description: string
  displayOrder: number
  empCountry: string
  handCountry: []
  id: number
  pageName: string
  sectionId: null
  sectionName: null
  title: string
  type: string
}

export type AppraisalCycle = {
  active: boolean
  appraisalDuration: string
  appraisalEndDate: string
  appraisalStartDate: string
  appraisalType: string
  cycleStartedFlag: boolean
  description: string
  fromDate: string
  id: number
  level: number
  name: string
  servicePeriod: number
  toDate: string
}

export type AverageRatingDTO = {
  adjustedAvgRating: null
  adjustedAvgRatingName: null
  defaultAvgRating: null
  defaultAvgRatingName: null
  departmentName: string
  designationName: string
  discussionSummary: null
  employeeId: number
  employeeName: string
  finalFeedback: null
  iAgree: false
  id: number
  level: number
}

export type Employee = {
  aboutMe: null
  absentCount: number
  acknowledged: null
  address: null
  alternativeMobile: null
  anniversary: null
  bankInformationList: null
  baseLocation: null
  bioAttendanceDtoSet: null
  bloodgroup: null
  candidateId: null
  casualLeaveCount: number
  comments: null
  companyExperience: null
  contractEndDate: null
  contractExists: null
  contractStartDate: null
  country: null
  countryCodeAlternative: null
  countryCodeEmergency: null
  countryCodeHome: null
  countryCodeMobile: null
  countryCodeWork: null
  curentLocation: null
  dateOfJoining: null
  dates: null
  departmentName: string
  designation: string
  designationKrasDTO: null
  dob: null
  emailId: string
  emergencyContact: null
  emergencyContactName: null
  emergencyPhone: null
  emergencyRelationShip: null
  empManager: string
  employeeSubmitted: null
  employmentTypeName: null
  experience: null
  firstName: null
  fullName: string
  gender: null
  grade: null
  holidaysCount: number
  homeCode: null
  homeNumber: null
  hrAssociate: null
  id: number
  imageData: null
  informationList: null
  jobTypeName: null
  lastName: null
  lateComingCount: null
  lopLeaveCount: number
  manager: null
  managerSubmitted: null
  maritalStatus: null
  middleName: null
  mobile: null
  observationDTOList: null
  officialBirthday: null
  passportBackPage: null
  passportBackPagePath: null
  passportExpDate: null
  passportFrontPage: null
  passportFrontPagePath: null
  passportIssuedDate: null
  passportIssuedPlace: null
  passportNumber: null
  percent: null
  permanentAddress: null
  permanentCity: null
  permanentLandMark: null
  permanentZip: null
  personalEmail: null
  presentAddress: null
  presentCity: null
  presentLandMark: null
  presentZip: null
  profilePicGeneratedPath: null
  profilePicPath: string
  projectManager: null
  rbtCvName: null
  rbtCvPath: null
  realBirthday: null
  relievingDate: null
  role: null
  skillList: null
  skypeId: null
  statusName: null
  technology: null
  thumbPicture: string
  timeSlotDTO: null
  token: null
  underNotice: null
  underNoticeDate: null
  updatedExperience: null
  userName: null
  vendorId: null
  vendorName: null
  workCode: null
  workNumber: null
  workStatus: null
}

export type ManagerCommentsDTO = {
  employeeId: number
  employeeName: string
  id: number
  level: number
  managerComments: string
  managerRating: number
  managerRatingName: null
  status: string
}

export type KPI = {
  description: string
  employeeFeedback: string
  employeeRating: string
  employeeRatingName: null
  frequency: string
  id: number
  manager: null
  managerCommentsDtos: ManagerCommentsDTO[]
  managerFeedback: null
  managerRating: null
  name: string
  target: string
}

export type KRA = {
  count: number
  description: null
  designationKraPercentage: number
  id: number
  name: string
  kpis: KPI[]
}

export type EmployeeAppraisalForm = {
  appraisalCycle: AppraisalCycle
  avgRatingsDtos: AverageRatingDTO[]
  employee: Employee
  kra: KRA[]
  adjustedAvgRating: null
  appraisalFormStatus: null
  closedBy: null
  closedOn: null
  closedStatus: null
  closedSummary: null
  discussionOn: null
  discussionSummary: null
  empAvgRating: null
  empAvgRatingName: null
  empDepartmentName: null
  empDesignationName: null
  finalFeedback: null
  finalRating: null
  finalRatingName: null
  formRating: null
  formStatus: string
  formStatusvalue: number
  iAgreeFlag: null
  id: number
  kpis: null
  manager1Name: null
  openForDiscussionFlag: null
  overallAvgRating: string
  overallAvgRatingName: null
  pendingWith: null
  requestDiscussion: boolean
}

export type PerformanceRatings = {
  id: number
  rating: number
  label: null
}

export type KPIReviewDTO = {
  id: null
  kpiName: string
  newValue: string
  oldValue: string
}

export type ReviewComments = {
  appraisalFormId: null
  comments: null
  createdDate: string
  employeeName: string
  id: number
  kpiName: null
  kpiReviewDtos: KPIReviewDTO[]
  newValue: null
  oldValue: null
  status: string
}

export type ReviewCommentsResponse = {
  list: ReviewComments[]
  size: number
}

export type MyReviewSliceState = {
  pageDetails: PageDetails
  employeeAppraisalForm: EmployeeAppraisalForm
  performanceRatings: PerformanceRatings[]
  reviewComments: ReviewComments[]
  appraisalFormId: number
  listSize: number
  isLoading: LoadingState
  isReviewCommentsLoading: LoadingState
  error: ValidationError
  isButtonsVisible?: boolean
  getPerformanceRatings: GetPerformanceRatings[]
}

export type GetPerformanceRatings = {
  id: number
  rating: number
  label: string
}

export type SaveReviewCommentsProps = {
  appraisalFormId: number
  comments: string
}
