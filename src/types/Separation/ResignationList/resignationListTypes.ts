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
  isLoading: ApiLoadingState
  currentPage: number
  pageSize: number
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
  managerComments: null
  withdrawComments: null
  primaryReasonId: null
  primaryReasonName: string
  reasonComments: string
  status: string
  canberevoked: false
  isRevoked: boolean
  isprocessInitiated: null
  adminCcCss: null
  hrCcCss: null
  managerCcCss: null
  itCcCss: null
  finanaceCcCss: null
  showCommentsBox: false
  showEditButton: true
  certificateDTO: []
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
