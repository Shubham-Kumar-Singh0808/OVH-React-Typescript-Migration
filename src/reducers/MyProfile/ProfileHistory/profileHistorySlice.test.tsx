import { List } from '../../../types/MyProfile/ProfileHistory/profileHistoryTypes'
import profileHistorySliceReducer from './profileHistorySlice'

describe('Profile History Slice Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = profileHistorySliceReducer(initialState, action)
    expect(result).toEqual({
      error: null,
      isLoading: false,
      profileHistoryList: [] as List[],
    })
  })
})
