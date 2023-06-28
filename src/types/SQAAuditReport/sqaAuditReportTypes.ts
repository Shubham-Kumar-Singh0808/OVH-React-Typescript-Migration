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
  getAuditDetails: GetAuditDetails

  selectMonthValue: string
  statusValue: string
  rescheduleStatus: string
  fromDate: string
  toDate: string
  searchInput: string
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
  oldEndTime: string
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

export type GetAuditDetails = {
  id: number
  auditType: string
  projectType: string
  projectId: number
  projectManager: string
  auditorIds: string
  auditeeIds: string
  auditors: SQAAuditors[]
  auditees: SQAAuditees[]
  auditDate: string
  startTime: string
  endTime: string
  auditStatus: string
  formStatus: string
  auditRescheduleStatus: boolean
  pci: string
  followUpDate: string
  sqaComments: string
  sqaFileName: string
  sqaFilesPath: string
  pmComments: string
  pmFileName: string
  pmFilesPath: string
  createdBy: string
  createdDate: string
  updatedBy: null
  updatedDate: null
  disableEditButton: boolean
  projectName: string
  projectManagerId: number
  showEditButton: boolean
  comments: null
  containsFile: null
  isSQA: boolean
}

export type SQAAuditors = {
  id: number
  fullName: string
}
export type SQAAuditees = {
  id: number
  fullName: string
}
export type RescheduleMeetingProps = {
  auditDate: string
  auditRescheduleStatus: boolean
  endTime: string
  id: number
  projectId: number
  startTime: string
}
