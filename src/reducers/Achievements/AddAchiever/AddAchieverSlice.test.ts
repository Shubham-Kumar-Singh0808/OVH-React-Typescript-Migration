import addAchieverReducer, { addAchieverServices } from './AddAchieverSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  AddAchieverInitialState,
  IncomingEmployeeImageData,
} from '../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { emptyString } from '../../../pages/Achievements/AchievementConstants'

const initialEmployeeData: IncomingEmployeeImageData = {
  imageData: emptyString,
  id: -1,
}

describe('Add Achiever Slice', () => {
  describe('render', () => {
    const initialState = {
      isLoading: ApiLoadingState.idle,
      achievementTypeDetails: null,
      activeEmployeeList: [],
      error: null,
      employeeData: initialEmployeeData,
    } as AddAchieverInitialState

    it('isLoading is set to "loading" for addAchievementTypeThunk', () => {
      const action = {
        type: addAchieverServices.addAchievementTypeThunk.pending.type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        achievementTypeDetails: null,
        error: null,
        employeeData: initialEmployeeData,
        activeEmployeeList: [],
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
        error: null,
        employeeData: initialEmployeeData,
        activeEmployeeList: [],
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
        error: null,
        employeeData: initialEmployeeData,
        activeEmployeeList: [],
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
        error: null,
        employeeData: initialEmployeeData,
        activeEmployeeList: [],
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
        error: null,
        employeeData: initialEmployeeData,
        activeEmployeeList: [],
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
        error: null,
        employeeData: initialEmployeeData,
        activeEmployeeList: [],
      })
    })

    it('"isLoading" state for "getAchievementTypeDetailsThunk"', () => {
      const action = {
        type: addAchieverServices.getAchievementTypeDetailsThunk.pending.type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual(initialState)
    })

    it('"isLoading" state to succeeded for "getAchievementTypeDetailsThunk"', () => {
      const action = {
        type: addAchieverServices.getAchievementTypeDetailsThunk.fulfilled.type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        achievementTypeDetails: undefined,
        error: null,
        activeEmployeeList: [],
        employeeData: initialEmployeeData,
      })
    })

    it('"isLoading" should be set to "loading" for "getActiveEmployeeListThunk"', () => {
      const action = {
        type: addAchieverServices.getActiveEmployeeListThunk.pending.type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        achievementTypeDetails: null,
        error: null,
        employeeData: initialEmployeeData,
        activeEmployeeList: [],
      })
    })

    it('"isLoading" should be set to "succeeded" for "getActiveEmployeeListThunk"', () => {
      const action = {
        type: addAchieverServices.getActiveEmployeeListThunk.fulfilled.type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        achievementTypeDetails: null,
        error: null,
        employeeData: initialEmployeeData,
        activeEmployeeList: undefined,
      })
    })

    it('data fetched for "getImageDataThunk"', () => {
      const action = {
        type: addAchieverServices.getImageDataThunk.fulfilled.type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        achievementTypeDetails: null,
        error: null,
        employeeData: undefined,
        activeEmployeeList: [],
      })
    })

    it('"isLoading" set to failed for "addAchievementTypeThunk"', () => {
      const action = {
        type: addAchieverServices.addAchievementTypeThunk.rejected.type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        achievementTypeDetails: null,
        error: undefined,
        employeeData: initialEmployeeData,
        activeEmployeeList: [],
      })
    })

    it('"isLoading" set to failed for "updateAchievementTypeDetailsThunk"', () => {
      const action = {
        type: addAchieverServices.updateAchievementTypeDetailsThunk.rejected
          .type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        achievementTypeDetails: null,
        error: undefined,
        employeeData: initialEmployeeData,
        activeEmployeeList: [],
      })
    })

    it('"isLoading" set to failed for "deleteAchievementTypeDetailsThunk"', () => {
      const action = {
        type: addAchieverServices.deleteAchievementTypeThunk.rejected.type,
      }
      const state = addAchieverReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        achievementTypeDetails: null,
        error: undefined,
        employeeData: initialEmployeeData,
        activeEmployeeList: [],
      })
    })
  })
})
