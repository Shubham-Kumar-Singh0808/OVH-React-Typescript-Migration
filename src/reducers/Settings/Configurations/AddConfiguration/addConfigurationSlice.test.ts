import addConfigurationReducer, {
  addConfigurationService,
} from './addConfigurationSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockCycleRecords } from '../../../../test/data/addConfigurationData'

describe('Add Configurations Slice', () => {
  describe('Add Configurations', () => {
    const initialState = {
      isLoading: ApiLoadingState.idle,
      error: null,
      listSize: 0,
    }

    it('Should be able to set isLoading to "loading" if addNewCycle  is pending', () => {
      const action = {
        type: addConfigurationService.addNewCycle.pending.type,
      }
      const state = addConfigurationReducer(initialState, action)
      expect(state).toEqual({
        error: null,
        isLoading: ApiLoadingState.loading,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "succeeded" if addNewCycle is fulfilled', () => {
      const action = {
        type: addConfigurationService.addNewCycle.fulfilled.type,
        payload: mockCycleRecords,
      }
      const state = addConfigurationReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if addNewCycle is rejected', () => {
      const action = {
        type: addConfigurationService.addNewCycle.rejected.type,
      }
      const state = addConfigurationReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: undefined,
        listSize: 0,
      })
    })
  })
})
