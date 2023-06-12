import locationListReducer, {
  addLocationListService,
} from './locationListSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

describe('Location List Slice', () => {
  describe('LocationList', () => {
    const initialState = {
      meetingLocations: [],
      isLoading: ApiLoadingState.idle,
      currentPage: 1,
      pageSize: 20,
    }

    it('Should be able to set isLoading to "loading" if getAllMeetingLocationsData  is pending', () => {
      const action = {
        type: addLocationListService.getAllMeetingLocationsData.pending.type,
      }
      const state = locationListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        meetingLocations: [],
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "loading" if addLocation is pending', () => {
      const action = {
        type: addLocationListService.addLocation.pending.type,
      }
      const state = locationListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        meetingLocations: [],
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "loading" if deleteLocation  is pending', () => {
      const action = {
        type: addLocationListService.deleteLocation.pending.type,
      }
      const state = locationListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        meetingLocations: [],
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "succeeded" if getAllMeetingLocationsData is fulfilled', () => {
      const action = {
        type: addLocationListService.getAllMeetingLocationsData.fulfilled.type,
      }
      const state = locationListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        meetingLocations: undefined,
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "succeeded" if addLocation is fulfilled', () => {
      const action = {
        type: addLocationListService.addLocation.fulfilled.type,
      }
      const state = locationListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        meetingLocations: undefined,
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "succeeded" if deleteLocation is fulfilled', () => {
      const action = {
        type: addLocationListService.deleteLocation.fulfilled.type,
      }
      const state = locationListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        meetingLocations: undefined,
        currentPage: 1,
        pageSize: 20,
      })
    })
  })
})
