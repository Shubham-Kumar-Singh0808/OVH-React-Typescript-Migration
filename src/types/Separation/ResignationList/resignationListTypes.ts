import { ApiLoadingState } from '../../../middleware/api/apiList'

export type ResignationList = {
  separationId: number
  relievingDate: string
  resignationDate: string
  employeeId: number
  employeeName: string
  separationComments: null
  employeeComments: null
  managerComments: null
  withdrawComments: null
  primaryReasonId: null
  primaryReasonName: string
  reasonComments: null
  status: string
  canberevoked: null
  isRevoked: null
  isprocessInitiated: false
  adminCcCss: string
  hrCcCss: string
  managerCcCss: string
  itCcCss: string
  finanaceCcCss: string
  showCommentsBox: null
  showEditButton: null
  certificateDTO: null
  relievingLetterPath: null
  managerName: string
  exitFeedbackFormPath: null
  separationExist: null
  showManagerClearance: false
  showTimeline: true
  isPIP: null
  pipAuditDTO: null
  contractExists: null
  contractStartDate: null
  contractEndDate: null
  personalEmailFlag: false
  initiatedDate: null
  empStatus: string
  certificate: null
  seperationComments: null
}

export type ResignationListResponse = {
  size: number
  list: ResignationList[]
}

export type GetResignationListProps = {
  dateSelection: number | string
  empStatus: string
  endIndex?: number
  from: string
  multiplesearch: string
  startIndex?: string | number
  status: string
  to: string
}

export type ResignationListSliceState = {
  resignationList: ResignationListResponse
  separationTimeLine: SeparationTimeLine
  clearanceDetails: ClearanceDetails[]
  separationChart: SeparationChart
  isLoading: ApiLoadingState
  currentPage: number
  pageSize: number
  toggle: string
  checkExitFeedBackForm: CheckExitFeedBackForm
  getEmpDetailsType: GetEmpDetailsType
  submitExitFeedBackForm: SubmitExitFeedBackForm
  selectMonthValue: string
  statusValue: string
  employeeStatusValue: string
  fromDate: string | Date
  toDate: string | Date
}

export type ExportResignationListDataProps = {
  dateSelection: number | string
  empStatus: string
  endIndex: number
  from: string
  multiplesearch: string
  startIndex: string | number
  status: string
  to: string
}

export type SeparationComments = {
  commentId: number
  employeeId: number
  employeeName: string
  comments: null | string
  relievingDate: null
  createdDate: string
  status: string
  withdrawComments: string
}

export type SeparationTimeLine = {
  separationId: number
  relievingDate: string
  resignationDate: string
  employeeId: number
  employeeName: string
  separationComments: SeparationComments[]
  employeeComments: string
  managerComments: string
  withdrawComments: null
  primaryReasonId: null
  primaryReasonName: string
  reasonComments: string
  status: string | number
  canberevoked: false
  isRevoked: boolean
  isprocessInitiated: null
  adminCcCss: null
  hrCcCss: null
  managerCcCss: null
  itCcCss: null
  finanaceCcCss: null
  showCommentsBox: boolean
  showEditButton: true
  certificateDTO: CertificateDTO[]
  relievingLetterPath: null
  managerName: null
  exitFeedbackFormPath: null
  separationExist: null
  showManagerClearance: null
  showTimeline: null
  isPIP: null
  pipAuditDTO: null
  contractExists: null
  contractStartDate: null
  contractEndDate: null
  personalEmailFlag: null
  initiatedDate: null
  empStatus: null
  certificate: null
  seperationComments: SeparationComments[]
}

export type submitClearanceCommentsProps = {
  addedBy: string
  comments: string
  employeeId: number
  employeeName: string
  isDue: string
  seperationId: number
}

export type ClearanceDetails = {
  ccId: number
  employeeId: number
  employeeName: string
  comments: string
  isDue: boolean
  createdDate: string
  seperationId: number
  seperationEmpId: number
  seperationEmpName: string
  addedBy: string
}

export type ClearanceDetailsProps = {
  separationId: number
  submittedBy: string
}

export type UpdateClearanceDetails = {
  addedBy: string
  ccId: number
  comments: string
  createdDate: string | Date
  employeeId: number
  employeeName: string
  isDue: boolean
  seperationEmpId: number
  seperationEmpName: string
  seperationId: number
}

export type CheckExitFeedBackForm = {
  exitFeedBackId: number
  employeeId: number
  separationId: number
  primaryReasonId: number
  primaryReasonName: string
  otherCommnets: string
  salary: string
  opportunityForGrowth: string
  recognitionOfwork: string
  promotion: string
  educationalBackground: string
  personelPolicies: string
  organisationCulture: string
  roleClarity: string
  superiorGuidance: string
  expectations: string
  expectationsFulfilled: string
  likeAboutCompany: string
  dislikeAboutCompany: string
  joinLater: string
  employeeName: string
}

export type Chart = {
  caption: string
  subcaption: null
  startingangle: string
  showlabels: string
  showlegend: string
  enablemultislicing: string
  slicingdistance: string
  showpercentvalues: string
  showpercentintooltip: string
  plottooltext: string
  theme: string
}

export type Data = {
  label: string
  value: string
}

export type SeparationChartProps = {
  dateSelection: string
  from: string
  to: string
}

export type SeparationChart = {
  chart: Chart
  data: Data[]
}
export type GetEmpDetailsType = {
  separationId: number
  relievingDate: null
  resignationDate: null
  employeeId: number
  employeeName: string
  separationComments: null
  employeeComments: null
  managerComments: null
  withdrawComments: null
  primaryReasonId: number
  primaryReasonName: string
  reasonComments: null
  status: null
  canberevoked: null
  isRevoked: null
  isprocessInitiated: null
  adminCcCss: null
  hrCcCss: null
  managerCcCss: null
  itCcCss: null
  finanaceCcCss: null
  showCommentsBox: null
  showEditButton: null
  certificateDTO: null
  relievingLetterPath: null
  managerName: null
  exitFeedbackFormPath: null
  separationExist: null
  showManagerClearance: null
  showTimeline: null
  isPIP: null
  pipAuditDTO: null
  contractExists: null
  contractStartDate: null
  contractEndDate: null
  personalEmailFlag: null
  initiatedDate: null
  empStatus: null
  certificate: null
  seperationComments: null
}

export type SubmitExitFeedBackForm = {
  dislikeAboutCompany: string
  educationalBackground: string
  employeeId: number
  employeeName: string
  expectations: string
  expectationsFulfilled: string
  joinLater: string
  likeAboutCompany: string
  opportunityForGrowth: string
  organisationCulture: string
  personelPolicies: string
  primaryReasonId: number
  promotion: string
  recognitionOfwork: string
  roleClarity: string
  salary: string
  separationId: number
  superiorGuidance: string
}

export type CertificateDTO = {
  addedBy: string
  ccId: number
  comments: string
  createdDate: string
  employeeId: number
  employeeName: string
  isDue: boolean
  seperationEmpId: null
  seperationEmpName: null
  seperationId: null
}
