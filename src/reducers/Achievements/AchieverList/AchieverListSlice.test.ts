import achieverListReducer, { achieverListService } from './AchieverListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockAchievementTimeline,
  mockAchieverList,
} from '../../../test/data/AchieverListData'
import { AchieverListSliceState } from '../../../types/Achievements/AchieverList/AchieverListTypes'

describe('Achiever List Slice', () => {
  describe('achieverListReducer', () => {
    const initialState: AchieverListSliceState = {
      isLoading: ApiLoadingState.idle,
      achieverList: { size: 0, list: [] },
      achieverListQueries: {},
      achievementHistoryTimeline: { size: 0, list: [] },
      currentPage: 1,
      pageSize: 20,
    }
    const achieverListState: AchieverListSliceState = {
      isLoading: ApiLoadingState.succeeded,
      achieverList: mockAchieverList,
      achieverListQueries: {},
      achievementHistoryTimeline: { size: 0, list: [] },
      currentPage: 1,
      pageSize: 20,
    }
    it('"isLoading" should be set to "loading" for "getAllAchieverList"', () => {
      const action = {
        type: achieverListService.getAllAchieverList.pending.type,
      }
      const state = achieverListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        achieverList: { size: 0, list: [] },
        achieverListQueries: {},
        achievementHistoryTimeline: { size: 0, list: [] },
        currentPage: 1,
        pageSize: 20,
      })
    })
    it('"isLoading" should be set to "succeeded" for "getAllAchieverList"', () => {
      const action = {
        type: achieverListService.getAllAchieverList.fulfilled.type,
      }
      const state = achieverListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        achieverList: mockAchieverList,
        achieverListQueries: {},
        achievementHistoryTimeline: { size: 0, list: [] },
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('"isLoading" should be set to "loading" for "updateAchievementDashboardStatus"', () => {
      const action = {
        type: achieverListService.updateAchievementDashboardStatus.pending.type,
      }
      const state = achieverListReducer(achieverListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        achieverList: mockAchieverList,
        achieverListQueries: {},
        achievementHistoryTimeline: { size: 0, list: [] },
        currentPage: 1,
        pageSize: 20,
      })
    })
    it('"isLoading" should be set to "succeeded" for "updateAchievementDashboardStatus"', () => {
      const action = {
        type: achieverListService.updateAchievementDashboardStatus.fulfilled
          .type,
      }
      const state = achieverListReducer(achieverListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        achieverList: mockAchieverList,
        achieverListQueries: {},
        achievementHistoryTimeline: { size: 0, list: [] },
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('"isLoading" should be set to "loading" for "getAchievementHistoryTimeline"', () => {
      const action = {
        type: achieverListService.getAchievementHistoryTimeline.pending.type,
      }
      const state = achieverListReducer(achieverListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        achieverList: mockAchieverList,
        achieverListQueries: {},
        achievementHistoryTimeline: { size: 0, list: [] },
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('"isLoading" should be set to "succeeded" for "getAchievementHistoryTimeline"', () => {
      const action = {
        type: achieverListService.getAchievementHistoryTimeline.fulfilled.type,
      }
      const state = achieverListReducer(achieverListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        achieverList: mockAchieverList,
        achieverListQueries: {},
        achievementHistoryTimeline: mockAchievementTimeline,
        currentPage: 1,
        pageSize: 20,
      })
    })
  })
})
