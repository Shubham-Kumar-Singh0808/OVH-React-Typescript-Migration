import trackerListReducer, { addTrackerListService } from './trackerListSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

describe('Tracker List Slice', () => {
  describe('eventTypeReducer', () => {
    const initialState = {
      trackerList: [],
      isLoading: ApiLoadingState.idle,
    }
    it('Should be able to set isLoading to "loading" if addNewTracker is pending', () => {
      const action = {
        type: addTrackerListService.addNewTracker.pending.type,
      }
      const state = trackerListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        trackerList: [],
      })
    })

    it('Should be able to set isLoading to "succeeded" if addNewTracker is fulfilled', () => {
      const action = {
        type: addTrackerListService.addNewTracker.fulfilled.type,
      }
      const state = trackerListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        trackerList: [],
      })
    })

    it('Should be able to set isLoading to "loading" if deleteTrackerList is pending', () => {
      const action = {
        type: addTrackerListService.deleteTrackerList.pending.type,
      }
      const state = trackerListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        trackerList: [],
      })
    })

    it('Should be able to set isLoading to "succeeded" if deleteTrackerList is fulfilled', () => {
      const action = {
        type: addTrackerListService.deleteTrackerList.fulfilled.type,
      }
      const state = trackerListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        trackerList: [],
      })
    })
  })
})
