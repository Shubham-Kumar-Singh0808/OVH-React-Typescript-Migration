import { ApiLoadingState } from '../../middleware/api/apiList'

export type SQAAuditReportList = {
  auditDate: string
  auditRescheduleStatus: boolean
  auditStatus: string
  auditType: string
  auditeeIds: null
  auditees: Auditees[]
  auditorIds: null
  auditors: Auditors[]
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

export type Auditees = {
  fullName: string
  id: number
}
export type Auditors = {
  fullName: string
  id: number
}

export type GetSQAAuditReport = {
  size: number
  list: SQAAuditReportList[]
}

export type sqaAuditReportSliceState = {
  getSQAAuditReport: GetSQAAuditReport
  sqaAuditReportList: SQAAuditReportList[]
  isLoading: ApiLoadingState
}

export type GetSQAAuditReportProps = {
  SQAAuditSelectionDate: string
  auditRescheduleStatus: string
  auditStatus: string
  endIndex: number
  from: string
  multiSearch: string
  startIndex: number
  to: string
}
