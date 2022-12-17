import commonAchievementsReducer, {
  commonAchievementsService,
  sortByAscendingOrder,
  sortByDateCreated,
} from './CommonAchievementsSlice'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { CommonAchievementInitialState } from '../../types/Achievements/commonAchievementTypes'

describe('Common Achievement Slice', () => {
  describe('Common Achievement Reducer', () => {
    const initialState: CommonAchievementInitialState = {
      isLoading: ApiLoadingState.idle,
      achievementTypeList: { size: 0, list: [] },
      dateSortedList: { size: 0, list: [] },
    }
    it('"isLoading" should be set to "loading" for "getAllAchievementsType"', () => {
      const action = {
        type: commonAchievementsService.getAllAchievementsType.pending.type,
      }
      const state = commonAchievementsReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        achievementTypeList: { size: 0, list: sortByAscendingOrder([]) },
        dateSortedList: { size: 0, list: sortByDateCreated([]) },
      })
    })
  })
})
