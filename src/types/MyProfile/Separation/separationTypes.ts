import { LoadingState, ValidationError } from '../../commonTypes'

export interface IncomingSeparationComments {
  commentId: number
  employeeId: number
  employeeName: string
  comments: string | null
  relievingDate: null
  createdDate: string
  status: string
  withdrawComments: null | string
}

export interface IncomingSeparationCertificateDTOS {
  ccId: number
  employeeId: number
  employeeName: string
  comments: string
  isDue: boolean
  createdDate: boolean
  seperationId: null
  seperationEmpId: null
  seperationEmpName: null
  addedBy: string
}

export interface IncomingEmployeeSeparationForm {
  separationId: number
  relievingDate: string
  resignationDate: string
  employeeId: number
  employeeName: string
  separationComments: IncomingSeparationComments[]
  employeeComments: string
  managerComments: null
  withdrawComments: null
  primaryReasonId: null
  primaryReasonName: string
  reasonComments: string
  status: string
  canberevoked: boolean
  isRevoked: boolean
  isprocessInitiated: null
  adminCcCss: null
  hrCcCss: null
  managerCcCss: null
  itCcCss: null | string
  finanaceCcCss: null
  showCommentsBox: boolean
  showEditButton: boolean
  certificateDTO: IncomingSeparationCertificateDTOS[]
  relievingLetterPath: string
  managerName: null
  exitFeedbackFormPath: string
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
  seperationComments: IncomingSeparationComments[]
}

export interface SeparationInitialStateTypes {
  isLoading: LoadingState
  employeeSeparationData: IncomingEmployeeSeparationForm
  error: ValidationError
}
