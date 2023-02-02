import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ValidationError } from '../../commonTypes'

export type ProjectTailoringDocument = {
  id: null
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
  id: null
  categoryId: number
  processSubHeadId: number
  processAreaId: null
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

export type ProcessAreaSliceState = {
  isLoading: ApiLoadingState
  error: ValidationError
  getProjectTailoringDocument: ProjectTailoringDocument[]
}
