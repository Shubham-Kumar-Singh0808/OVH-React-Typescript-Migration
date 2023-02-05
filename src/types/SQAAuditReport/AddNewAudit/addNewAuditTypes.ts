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

export type AddNewAuditSliceState = {
  saveAuditForm: SaveAuditForm
  isLoading: LoadingState
  error: ValidationError
}
