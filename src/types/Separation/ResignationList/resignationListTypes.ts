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
  endIndex: number
  from: string
  multiplesearch: string
  startIndex: string | number
  status: string
  to: string
}

export type ResignationListSliceState = {
  resignationList: ResignationListResponse
  isLoading: ApiLoadingState
  currentPage: number
  pageSize: number
}
