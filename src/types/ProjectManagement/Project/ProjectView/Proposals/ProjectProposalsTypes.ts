import { LoadingState } from '../../../../commonTypes'

export type ProjectProposal = {
  id: number
  post: string
  postedBy: string
  postedOn: string
  projectName: string
  projectId: number
}

export type ProjectProposalState = {
  projectProposal: ProjectProposal[]
  isLoading: LoadingState
}
