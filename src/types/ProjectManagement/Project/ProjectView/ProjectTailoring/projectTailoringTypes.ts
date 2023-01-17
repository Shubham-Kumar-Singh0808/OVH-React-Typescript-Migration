import { LoadingState } from '../../../../commonTypes'

export type ProjectTailoringList = {
  id: number
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
  id: number
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
  status: boolean
  order: number
}

export type ProcessHeaddto = {
  id: number
  processHeadId: number
  processHeadname: string
  processSubHeadsDto: ProcessSubHeadsDto[]
  tailoredCount: string
  waivedCount: string
  documentCount: string
  processSubHeadCount: string
  processCount: string
}

export type ProjectTailoring = {
  id: number
  projectId: number
  processHeaddto: ProcessHeaddto[]
  tailoringStatus: string
  rejectComments: null
}

export type ProjectTailoringSliceState = {
  projectTailoringList: ProjectTailoringList[]
  projectTailoring: ProjectTailoring
  isLoading: LoadingState
}
