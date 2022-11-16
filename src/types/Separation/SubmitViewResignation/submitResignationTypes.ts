import { LoadingState } from '../../commonTypes'

export type SeparationFormLookup = {
  reasonId: number
  reasonName: string
}

export type SeparationForm = {
  separationId: null
  relievingDate: null
  resignationDate: string
  employeeId: number
  employeeName: string
  separationComments: null
  employeeComments: string
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
  separationExist: false
  showManagerClearance: null
  showTimeline: null
  isPIP: null
  pipAuditDTO: null
  contractExists: false
  contractStartDate: null
  contractEndDate: null
  personalEmailFlag: null
  initiatedDate: null
  empStatus: null
  certificate: null
  seperationComments: string
}

export type GetSeparationFormResponse = {
  lookup: SeparationFormLookup[]
  form: SeparationForm
}

export type SubmitResignationTypes = {
  adminCcCss?: null
  canberevoked?: null
  certificate?: null
  certificateDTO?: null
  contractEndDate?: null
  contractExists?: boolean
  contractStartDate?: null
  empStatus?: null
  employeeComments: string
  employeeId?: number
  employeeName?: string
  exitFeedbackFormPath?: null
  finanaceCcCss?: null
  hrCcCss?: null
  initiatedDate?: null
  isPIP?: null
  isRevoked?: null
  isprocessInitiated?: null
  itCcCss?: null
  managerCcCss?: null
  managerComments?: null
  managerName?: null
  personalEmailFlag?: null
  pipAuditDTO?: null
  primaryReasonId?: number | string
  primaryReasonName?: string | null
  reasonComments?: string
  relievingDate?: null
  relievingLetterPath?: null
  resignationDate?: string
  separationComments?: null
  separationExist?: boolean
  separationId?: null
  seperationComments?: null
  showCommentsBox?: null
  showEditButton?: null
  showManagerClearance?: null
  showTimeline?: null
  status?: null
  withdrawComments?: null
}

export type ResignationView = {
  separationId: number
  relievingDate: string
  resignationDate: null
  employeeId: null
  employeeName: null
  separationComments: null
  employeeComments: null
  managerComments: null
  withdrawComments: null
  primaryReasonId: null
  primaryReasonName: null
  reasonComments: null
  status: string
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

export type RevokeResignation = {
  adminCcCss: null
  canberevoked: null
  certificate: null
  certificateDTO: null
  contractEndDate: null
  contractExists: null
  contractStartDate: null
  empStatus: null
  employeeComments: null
  employeeId: null
  employeeName: null
  exitFeedbackFormPath: null
  finanaceCcCss: null
  hrCcCss: null
  initiatedDate: null
  isPIP: null
  isRevoked: null
  isprocessInitiated: null
  itCcCss: null
  managerCcCss: null
  managerComments: null
  managerName: null
  personalEmailFlag: null
  pipAuditDTO: null
  primaryReasonId: null
  primaryReasonName: null
  reasonComments: null
  relievingDate: string
  relievingLetterPath: null
  resignationDate: null
  separationComments: null
  separationExist: null
  separationId: number
  seperationComments: null
  showCommentsBox: null
  showEditButton: null
  showManagerClearance: null
  showTimeline: null
  status: string
  withdrawComments: string
}

export type SubmitResignationSliceState = {
  getSeparationFormResponse: GetSeparationFormResponse
  resignationView: ResignationView
  isLoading: LoadingState
}