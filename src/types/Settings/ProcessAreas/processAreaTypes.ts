import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ValidationError } from '../../commonTypes'

export type ProjectTailoringDocument = {
  id: null | number
  processHeadId: number
  processHeadname: string
  processSubHeadsDto: ProcessSubHeadsDto[]
  tailoredCount: null
  waivedCount: null
  documentCount: string
  processSubHeadCount: string
  processCount: string
}
export type ProcessSubHeadsDto = {
  id: null | number
  categoryId: number
  processSubHeadId: number
  processAreaId: null
  processSubHeadName: string
  processName: null | string
  documentName: string
  responsible: string
  common: null
  specificToProject: string
  comments: null
  sqaComments: null
  sqaApproval: null
  link: string
  status: string
  order: number | null
}

export type ProcessAreaSliceState = {
  isLoading: ApiLoadingState
  error: ValidationError
  getProjectTailoringDocument: ProjectTailoringDocument[]
  ProcessSubHeads: ProcessSubHeadsDto[]
  ProcessAreas: ProcessAreas[]
  currentPage: number
  pageSize: number
  processAreaDetails: GetProcessAreaDetails
}

export type ProcessAreas = {
  id: number
  name: string
  categoryId: number
}

export type AddProcessAreaProps = {
  categoryId: number
  documentName: string
  link: string
  order: string
  processAreaId: number
  responsible: string
  status: string | boolean
}

export type GetProcessAreaDetails = {
  id: null
  categoryId: number
  processSubHeadId: number
  processAreaId: number
  processSubHeadName: string
  processName: null
  documentName: string
  responsible: string
  common: null
  specificToProject: string
  comments: null
  sqaComments: null
  sqaApproval: null
  link: string
  status: string
  order: number
}
