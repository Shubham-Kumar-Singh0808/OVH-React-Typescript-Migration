import { LoadingState, ValidationError } from '../../commonTypes'

export type SaveAuditForm = {
  auditDate: string
  auditRescheduleStatus: boolean
  auditType: string
  endTime: string
  formStatus: string
  projectManagerId?: number
  projectType: string
  startTime: string
  auditeeIds: number[]
  auditorIds: number[]
  projectId?: number
  projectName: string
}

export type EditAuditFormData = {
  auditDate: string
  auditRescheduleStatus: boolean
  auditStatus: string
  auditType: string
  auditeeIds: null
  auditorIds: null
  auditees: number[]
  auditors: number[]
  comments: null
  containsFile: null
  createdBy: string
  createdDate: string
  disableEditButton: boolean
  endTime: string
  followUpDate: null
  formStatus: string
  id: number
  isSQA: boolean
  pci: null
  pmComments: null
  pmFileName: null
  pmFilesPath: null
  projectId: number
  projectManager: string
  projectManagerId: number
  projectName: string
  projectType: string
  showEditButton: boolean
  sqaComments: null
  sqaFileName: null
  sqaFilesPath: null
  startTime: string
  updatedBy: null
  updatedDate: null
}

export type AddNewAuditSliceState = {
  saveAuditForm: SaveAuditForm
  editAuditForm: EditAuditFormData
  isLoading: LoadingState
  error: ValidationError
}
