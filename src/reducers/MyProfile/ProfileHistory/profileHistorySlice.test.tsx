import profileHistorySliceReducer from './profileHistorySlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ProfileUpdateData } from '../../../types/MyProfile/ProfileHistory/profileHistoryTypes'

describe('Profile History Slice Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = profileHistorySliceReducer(initialState, action)
    expect(result).toEqual({
      error: null,
      isLoading: ApiLoadingState.idle,
      profileHistoryList: [] as ProfileUpdateData[],
    })
  })
})
