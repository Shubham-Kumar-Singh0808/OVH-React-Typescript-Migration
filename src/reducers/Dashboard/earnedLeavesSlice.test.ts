import reducer, { earnedLeavesService } from './earnedLeavesSlice'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { EarnedLeavesSliceState } from '../../types/Dashboard/EarnedLeaves/earnedLeavesTypes'

describe('Earned Leaves Slice', () => {
  describe('Earned Leaves Reducer', () => {
    const initialEarnedLeavesState = {
      isLoading: ApiLoadingState.idle,
      error: null,
      financialYear: 0,
    } as EarnedLeavesSliceState

    it('Should be able to set isLoading to "loading" if getFinancialYear is pending', () => {
      const action = {
        type: earnedLeavesService.getFinancialYear.pending.type,
      }
      const state = reducer(initialEarnedLeavesState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        financialYear: 0,
      })
    })

    it('Should be able to set isLoading to "success" if getFinancialYear is fulfilled', () => {
      const action = {
        type: earnedLeavesService.getFinancialYear.fulfilled.type,
        payload: 2022,
      }
      const state = reducer(initialEarnedLeavesState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        financialYear: 2022,
      })
    })
  })
})
