import projectProposalsReducer, {
  projectProposalsService,
} from './projectProposalsSlice'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { mockProjectProposals } from '../../../../../test/data/projectProposalsData'
import { ProjectProposalState } from '../../../../../types/ProjectManagement/Project/ProjectView/Proposals/ProjectProposalsTypes'

describe('projectProposalsSlice', () => {
  describe('projectProposalReducer', () => {
    const initialProjectProposalState = {
      isLoading: ApiLoadingState.idle,
      projectProposal: [],
    } as ProjectProposalState

    it('Should be able to set isLoading to "loading" if getProjectTimeLine is pending', () => {
      const action = {
        type: projectProposalsService.getProjectTimeLine.pending.type,
      }
      const state = projectProposalsReducer(initialProjectProposalState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        projectProposal: [],
      })
    })

    it('Should be able to set isLoading to "success" if getProjectTimeLine is fulfilled', () => {
      const action = {
        type: projectProposalsService.getProjectTimeLine.fulfilled,
        payload: mockProjectProposals,
      }
      const state = projectProposalsReducer(initialProjectProposalState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        projectProposal: mockProjectProposals,
      })
    })
  })
})
