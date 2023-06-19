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

export interface IncomingMyReviewEmployeeDetails {
  id: number
  firstName: null
  lastName: null
  middleName: null
  designation: string
  role: null
  manager: null
  designationKrasDTO: null
  employeeSubmitted: null
  managerSubmitted: null
  acknowledged: null
  fullName: string
  profilePicPath: string
  thumbPicture: string
  profilePicGeneratedPath: null
  gender: null
  dob: null
  departmentName: string
  employmentTypeName: null
  jobTypeName: null
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
  emailId: string
  empManager: string
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

export interface IncomingPerformanceRating {
  id: number
  rating: number
  label: null
}

export interface IncomingMyReviewAppraisalCycle {
  id: number
  name: string
  description: null
  toDate: string
  fromDate: string
  active: boolean
  appraisalType: string
  appraisalDuration: string
  level: number
  cycleStartedFlag: boolean
  appraisalStartDate: string
  appraisalEndDate: string
  servicePeriod: number
}

export interface AppraisalFormManagerCommentsDTO {
  id: number
  managerRating: number | null
  managerComments: string | null
  level: number
  status: string
  employeeId: number
  employeeName: string
  managerRatingName: null
}

export interface MyReviewKPI {
  id: number
  name: string
  description: string
  employeeFeedback: null | string
  employeeRating: null | number
  employeeRatingName: null
  manager: null
  managerFeedback: null | string
  managerRating: null | number
  frequency: string
  target: string | null
  managerCommentsDtos: AppraisalFormManagerCommentsDTO[] | null
}

export interface IncomingMyReviewKRA {
  id: number
  name: string
  description: null
  count: number
  designationKraPercentage: number
  kpis: MyReviewKPI[]
}

export interface IncomingAppraisalFormAvgRatingDTO {
  id: number
  employeeName: string
  employeeId: number
  level: number
  defaultAvgRating: null | number
  adjustedAvgRating: null
  finalFeedback: null
  defaultAvgRatingName: null
  adjustedAvgRatingName: null
  iAgree: boolean
  departmentName: string
  designationName: string
  discussionSummary: null
}

export interface IncomingMyReviewAppraisalForm {
  id: number
  appraisalCycle: IncomingMyReviewAppraisalCycle
  kra: IncomingMyReviewKRA[]
  employee: IncomingMyReviewEmployeeDetails
  formStatus: string
  formStatusvalue: number
  formRating: null
  appraisalFormStatus: null | string
  adjustedAvgRating: null
  finalFeedback: null
  avgRatingsDtos: IncomingAppraisalFormAvgRatingDTO[]
  overallAvgRating: string | number
  overallAvgRatingName: null
  finalRating: null
  finalRatingName: null
  discussionOn: null
  discussionSummary: null
  openForDiscussionFlag: null | string
  iAgreeFlag: null | boolean
  closedSummary: null
  closedOn: null
  pendingWith: null | string
  closedStatus: null
  closedBy: null
  empDepartmentName: null | string
  empDesignationName: null | string
  empAvgRating: null | number
  empAvgRatingName: null
  manager1Name: null | string
  requestDiscussion: boolean
  kpis: null
}

export interface IncomingReviewComment {
  id: number
  comments: string
  status: string
  createdDate: string
  employeeName: string
  appraisalFormId: null
  kpiName: null
  oldValue: null
  newValue: null
  kpiReviewDtos: [
    {
      id: null
      kpiName: null
      oldValue: null
      newValue: null
    },
  ]
}

export interface IncomingReviewCommentList {
  size: number
  list: IncomingReviewComment[]
}

export enum MyReviewAppraisalFormStatus {
  NotSubmittedByYou = 'NotSubmittedByYou',
}

export enum MyReviewFormStatus {
  saveForEmployee = 'SAVE',
  submitForEmployee = 'SUBMIT',
  pending = 'PENDING',
  pendingagreement = 'PENDINGAGREEMENT',
  openForDiscussion = 'OPENFORDISCUSSION',
  completed = 'COMPLETED',
}

export interface MyReviewButtonsProps {
  saveButtonApiCall: (finalData: IncomingMyReviewAppraisalForm) => Promise<void>
}

export interface MyReviewModalProps {
  showModal: boolean
  description: JSX.Element | string
  confirmBtnText?: string
  cancelBtnText?: string
  confirmBtnAction?: () => void | Promise<void>
  modalFooterClass?: string
  modalHeaderClass?: string
}

export type MyReviewSliceState = {
  pageDetails: PageDetails
  isLoading: LoadingState
  error: ValidationError
  performanceRatings: IncomingPerformanceRating[]
  appraisalForm: IncomingMyReviewAppraisalForm
  myReviewFormStatus: MyReviewFormStatus
  isEmployeeSubmitButtonEnabled: boolean
  isManagerSubmitButtonEnabled: boolean
  incomingFinalRating: number
  modal: MyReviewModalProps
  reviewComments: IncomingReviewCommentList
}

export interface UpdateMyReviewDataDTO {
  kraId: number
  kpiId: number
  updatedValue: string
}

export enum MyReviewUpdateTypeEnum {
  comments = 'Comments',
  Rating = 'Rating',
}

export enum MyReviewUpdateRoleEnum {
  employee = 'Employee',
  manager = 'Manager',
}

export interface MyReviewKraKpiIndexes {
  kraIndex?: number
  kpiIndex?: number
}

export interface UpdateMyReviewFieldsDTO {
  data: UpdateMyReviewDataDTO
  updateType: MyReviewUpdateTypeEnum
  updateRole: MyReviewUpdateRoleEnum
}

export interface OutgoingSaveReviewCommentsParams {
  appraisalFormId: number
  comments: string
}
