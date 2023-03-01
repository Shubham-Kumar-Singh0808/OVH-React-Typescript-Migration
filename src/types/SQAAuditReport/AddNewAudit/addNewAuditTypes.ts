import { LoadingState, ValidationError } from '../../commonTypes'
import { GetAllEmployeesNames } from '../../ProjectManagement/AllocateEmployee/allocateEmployeeTypes'

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
  id?: number
  auditStatus?: string
}

export type Auditees = {
  id: number
  fullName: string
}

export type Auditors = {
  id: number
  fullName: string
}

export type EditAuditFormData = {
  auditDate: string
  auditRescheduleStatus: boolean
  auditStatus: string
  auditType: string
  auditeeIds: null
  auditorIds: null
  auditees: GetAllEmployeesNames[]
  auditors: GetAllEmployeesNames[]
  comments: string
  containsFile: null
  createdBy: string
  createdDate: string
  disableEditButton: boolean
  endTime: string
  followUpDate: null
  formStatus: string
  id: number
  isSQA: boolean
  pci: number | string
  pmComments: string
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

export type Employee = {
  designation: string
  emailId: string
  firstName: string
  fullName: string
  id: number
  lastName: string
  profilePicPath: string
}

export type UpdateSQAAudit = {
  id: number
  pci: string
  comments: string
  containsFile: boolean
  endTime: string
  formStatus: string
  auditeeIds: number[]
  auditorIds: number[]
  followUpDate: string
}

export type AddNewAuditSliceState = {
  saveAuditForm: SaveAuditForm
  editAuditForm: EditAuditFormData
  employee: Employee[]
  isLoading: LoadingState
  error: ValidationError
}
