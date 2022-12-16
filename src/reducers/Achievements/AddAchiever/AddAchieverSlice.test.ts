import addAchieverReducer, { addAchieverServices } from './AddAchieverSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AddAchieverInitialState } from '../../../types/Achievements/AddAchiever/AddAchieverTypes'

describe('Add Achiever Slice', () => {
  describe('render', () => {
    const initialState: AddAchieverInitialState = {
      isLoading: ApiLoadingState.idle,
      achievementTypeDetails: null,
    }

    it('isLoading is set to "loading" for addAchievementTypeThunk', () => {
      const action = {
        type: addAchieverServices.addAchievementTypeThunk.pending.type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        achievementTypeDetails: null,
      })
    })

    it('isLoading is set to "succeeded" for addAchievementTypeThunk', () => {
      const action = {
        type: addAchieverServices.addAchievementTypeThunk.fulfilled.type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        achievementTypeDetails: null,
      })
    })

    it('"isLoading" should be set to "loading" for "deleteAchievementTypeThunk"', () => {
      const action = {
        type: addAchieverServices.deleteAchievementTypeThunk.pending.type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        achievementTypeDetails: null,
      })
    })

    it('"isLoading" should be set to "succeeded" for "deleteAchievementTypeThunk"', () => {
      const action = {
        type: addAchieverServices.deleteAchievementTypeThunk.fulfilled.type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        achievementTypeDetails: null,
      })
    })

    it('"isLoading" should be set to "loading" for "updateAchievementTypeDetailsThunk"', () => {
      const action = {
        type: addAchieverServices.updateAchievementTypeDetailsThunk.pending
          .type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        achievementTypeDetails: null,
      })
    })

    it('"isLoading" should be set to "succeeded" for "updateAchievementTypeDetailsThunk"', () => {
      const action = {
        type: addAchieverServices.updateAchievementTypeDetailsThunk.fulfilled
          .type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        achievementTypeDetails: null,
      })
    })

    it('"isLoading" state for "getAchievementTypeDetailsThunk"', () => {
      const action = {
        type: addAchieverServices.getAchievementTypeDetailsThunk.pending.type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual(initialState)
    })
  })
})
