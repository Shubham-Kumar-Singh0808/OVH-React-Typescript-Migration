import commonAchievementsReducer, {
  commonAchievementsService,
} from './CommonAchievementsSlice'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { commonAchievementsInitialState } from '../../types/Achievements/commonAchievementTypes'
import { mockAchievementTypeList } from '../../test/data/AchieverListData'

describe('Common Achievement Slice', () => {
  describe('Common Achievement Reducer', () => {
    const initialState: commonAchievementsInitialState = {
      isLoading: ApiLoadingState.idle,
      achievementTypeList: { size: 0, list: [] },
    }
    it('"isLoading" should be set to "loading" for "getAllAchievementsType"', () => {
      const action = {
        type: commonAchievementsService.getAllAchievementsType.pending.type,
      }
      const state = commonAchievementsReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        achievementTypeList: { size: 0, list: [] },
      })
    })
  })
})
