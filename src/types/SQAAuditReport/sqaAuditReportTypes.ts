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
  projectType: string | boolean
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
  sqaAuditHistory: GetSQAAuditHistory
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

export type ExportSQAAuditReportProps = {
  SQAAuditSelectionDate: string
  auditStatus: string
  auditRescheduleStatus: string
  startdate: string
  enddate: string
  multiSearch: string
}
export type SQAAuditTimelineDetails = {
  id: null
  auditId: null
  auditType: string
  projectType: string
  projectId: string
  projectName: string
  projectManager: string
  auditors: string
  auditees: string
  auditDate: string
  startTime: string
  endTime: string
  auditStatus: string
  formStatus: string
  auditRescheduleStatus: string
  pci: null
  followUpDate: null
  sqaComments: null
  sqaFileName: null
  sqaFilesPath: null
  pmComments: null
  pmFileName: null
  pmFilesPath: null
  modifiedBy: string
  modifiedDate: string
  persistType: string
  oldAuditType: string
  oldProjectType: string
  oldProjectId: null
  oldProjectName: string
  oldProjectManager: string
  oldAuditors: string
  oldAuditees: string
  oldAuditDate: string
  oldStartTime: string
  oldEndTime: null
  oldAuditStatus: string
  oldFormStatus: null
  oldPci: null
  oldFollowUpDate: null
  oldSqaComments: null
  oldSqaFileName: null
  oldSqaFilesPath: null
  oldPmComments: null
  oldPmFileName: null
  oldPmFilesPath: null
  oldModifiedBy: null
  oldModifiedDate: null
  oldPersistType: null
}

export type GetSQAAuditHistory = {
  size: number
  list: SQAAuditTimelineDetails[]
}
