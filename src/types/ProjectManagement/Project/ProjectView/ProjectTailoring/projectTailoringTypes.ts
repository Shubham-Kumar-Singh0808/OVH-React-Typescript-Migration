import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { ValidationError } from '../../../../commonTypes'

export interface ProcessSubHeadDTO {
  id: null | number
  categoryId: number | null
  processSubHeadId: number
  processAreaId: null
  processSubHeadName: string
  processName: null
  documentName: string
  responsible: string
  common: null
  specificToProject: string
  comments: null | string
  sqaComments: null | string
  sqaApproval: null | string
  link: null | string
  status: string | null
  order: number
}

export interface ProcessHeadDTO {
  id: null | number
  processHeadId: number
  processHeadname: string
  processSubHeadsDto: ProcessSubHeadDTO[]
  tailoredCount: null | string
  waivedCount: null | string
  documentCount: string
  processSubHeadCount: string
  processCount: string
}

export interface IncomingProjectTailoringList {
  id: number
  projectId: number
  processHeaddto: ProcessHeadDTO[]
  tailoringStatus: string
  rejectComments: null
}

export enum ProjectTailoringStatusEnum {
  initial = 'Initial',
  saveForManager = 'Save',
  submitted = 'Submitted',
  approved = 'Approved',
  rejected = 'Rejected',
  updated = 'Updated',
}

export interface ProjectTailoringSliceState {
  isLoading: ApiLoadingState
  defaultProjectTailoringDocument: ProcessHeadDTO[]
  projectTailoringDocument: IncomingProjectTailoringList | string
  error: ValidationError
  tailorStatus: ProjectTailoringStatusEnum
  isManagerSubmitButtonEnabled: boolean
  isSQAApproveButtonEnabled: boolean
  isSQARejectedButtonEnabled: boolean
  isManagerUpdateButtonEnabled: boolean
}

export interface ShowHideSubProcessesProps {
  processHeadId: number
  processIndex: number
}

export interface ProcessTailorTableRowProps {
  thisProcess: ProcessHeadDTO
  thisProcessIndex: number
  currentOpenedSubProcess: ShowHideSubProcessesProps
  hideSubProcessButtonHandler: (e: React.MouseEvent<HTMLElement>) => void
  showSubProcessButtonHandler: (
    e: React.MouseEvent<HTMLElement>,
    processData: ShowHideSubProcessesProps,
  ) => void
}

export enum TailoringRequiredSelectOptions {
  Yes = 'Yes',
  No = 'No',
  WaivedOff = 'Waived Off',
}

export enum TailoringSQAApprovedSelectOptions {
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export interface ProcessHeadAndSubHeadIndexes {
  processHeadIndex?: number
  processSubHeadIndex?: number
}

export interface OutgoingSaveProjectTailoringDocumentInitial {
  processHeaddto: ProcessHeadDTO[]
  projectId: string
  tailoringStatus: string
}

export interface OutgoingSaveProjectTailoringDocument
  extends OutgoingSaveProjectTailoringDocumentInitial {
  id: number
  rejectComments: null | string
}

export enum UpdateProjectTailoringDataType {
  Select = 'Select',
  Justification = 'justification',
}

export interface UpdateProjectTailorDataSliceActionProps {
  processHeadId: number
  processSubHeadId: number
  value: string
  updateType: UpdateProjectTailoringDataType
}
