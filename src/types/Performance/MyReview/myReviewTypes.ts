import React from 'react'
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
  jobTypeName: null
  firstName: null
  lastName: null
  mobile: null
  passportExpDate: null
  middleName: null
  address: null
  lateComingCount: null
  designation: string
  role: null
  maritalStatus: null
  manager: null
  designationKrasDTO: null
  departmentName: string
  employeeSubmitted: null
  managerSubmitted: null
  curentLocation: null
  acknowledged: null
  alternativeMobile: null
  fullName: string
  aboutMe: null
  thumbPicture: string
  profilePicGeneratedPath: null
  profilePicPath: string
  gender: null
  dob: null
  employmentTypeName: null
  imageData: null
  baseLocation: null
  officialBirthday: null
  realBirthday: null
  emergencyContactName: null
  emergencyPhone: null
  grade: null
  countryCodeEmergency: null
  workNumber: null
  presentAddress: null
  vendorName: null
  presentLandMark: null
  permanentCity: null
  permanentZip: null
  permanentLandMark: null
  homeCode: null
  workCode: null
  skillList: null
  userName: null
  holidaysCount: number
  dateOfJoining: null
  informationList: null
  presentZip: null
  anniversary: null
  presentCity: null
  bankInformationList: null
  emergencyContact: null
  bioAttendanceDtoSet: null
  dates: null
  statusName: null
  relievingDate: null
  skypeId: null
  percent: null
  passportNumber: null
  passportIssuedPlace: null
  homeNumber: null
  passportIssuedDate: null
  token: null
  underNoticeDate: null
  candidateId: null
  underNotice: null
  emailId: string
  empManager: string
  bloodgroup: null
  timeSlotDTO: null
  technology: null
  hrAssociate: null
  emergencyRelationShip: null
  passportFrontPagePath: null
  observationDTOList: null
  passportBackPagePath: null
  passportFrontPage: null
  projectManager: null
  casualLeaveCount: number
  lopLeaveCount: number
  contractExists: null
  contractStartDate: null
  contractEndDate: null
  personalEmail: null
  experience: null
  rbtCvName: null
  companyExperience: null
  updatedExperience: null
  country: null
  workStatus: null
  comments: null
  absentCount: number
  vendorId: null
  passportBackPage: null
  countryCodeWork: null
  countryCodeMobile: null
  rbtCvPath: null
  countryCodeHome: null
  countryCodeAlternative: null
  permanentAddress: null
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
  closedSummary: null | string
  closedOn: null | string
  pendingWith: null | string
  closedStatus: null | string
  closedBy: null | string
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
  closed = 'CLOSED',
}

export interface MyReviewButtonsProps {
  saveButtonApiCall: (finalData: IncomingMyReviewAppraisalForm) => Promise<void>
  submitButtonHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
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
