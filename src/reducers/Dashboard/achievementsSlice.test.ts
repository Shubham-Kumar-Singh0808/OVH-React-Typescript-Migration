import reducer, { employeeAchievementsService } from './achievementsSlice'
import { ApiLoadingState } from '../../middleware/api/apiList'
import {
  AchievementsSliceState,
  EmployeeAchievementsApiResponse,
} from '../../types/Dashboard/Achievements/ServiceAwards/achievementsTypes'
import { mockAchievementsList } from '../../test/data/employeeAchievementsData'

describe('Achievements Slice', () => {
  describe('Achievements Reducer', () => {
    const initialAchievementsState = {
      achievementsData: {} as EmployeeAchievementsApiResponse,
      isLoading: ApiLoadingState.idle,
      error: null,
    } as AchievementsSliceState

    it('Should be able to set isLoading to "loading" if getAllAchievements is pending', () => {
      const action = {
        type: employeeAchievementsService.getAllAchievements.pending.type,
      }
      const state = reducer(initialAchievementsState, action)
      expect(state).toEqual({
        achievementsData: {} as EmployeeAchievementsApiResponse,
        isLoading: ApiLoadingState.loading,
        error: null,
      })
    })

    it('Should be able to set isLoading to "success" if getAllAchievements is fulfilled', () => {
      const action = {
        type: employeeAchievementsService.getAllAchievements.fulfilled.type,
        payload: mockAchievementsList,
      }
      const state = reducer(initialAchievementsState, action)
      expect(state).toEqual({
        achievementsData: mockAchievementsList,
        isLoading: ApiLoadingState.succeeded,
        error: null,
      })
    })
  })
})
