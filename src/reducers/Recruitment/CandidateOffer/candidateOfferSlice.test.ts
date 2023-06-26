import candidateOfferSliceReducer, {
  candidateOfferService,
  initialAddNewCandidateState,
} from './CandidateOfferSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'

describe('isLoading', () => {
  describe('candidate offer test', () => {
    it('Should set isLoading to "loading" when candidate offer is pending', () => {
      const action = candidateOfferService.getAddNewJoineeData.pending

      const state = candidateOfferSliceReducer(
        initialAddNewCandidateState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should set isLoading to "loading" when person technology is pending', () => {
      const action = candidateOfferService.getPersonTechnologyData.pending

      const state = candidateOfferSliceReducer(
        initialAddNewCandidateState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should set isLoading to "success" when getAddNewJoinee type change is fulfilled', () => {
      const action = {
        type: candidateOfferService.getAddNewJoineeData.fulfilled.type,
      }

      const state = candidateOfferSliceReducer(
        initialAddNewCandidateState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
      })
    })

    it('Should set isLoading to "success" when getPersonTechnology type change is fulfilled', () => {
      const action = {
        type: candidateOfferService.getPersonTechnologyData.fulfilled.type,
      }

      const state = candidateOfferSliceReducer(
        initialAddNewCandidateState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
      })
    })
  })
})
