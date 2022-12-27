import addNomineeReducer, { addNomineeService } from './AddNomineeSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AddNomineeInitialState } from '../../../types/Achievements/AddNominee/AddNomineeTypes'

describe('Add Nominee Slice', () => {
  describe('Add Nominee', () => {
    const initialState: AddNomineeInitialState = {
      isLoading: ApiLoadingState.idle,
      nominationFormDetails: {
        achievementType: null,
        achievementTypeId: null,
        activateFlag: null,
        createdBy: null,
        createdDate: null,
        cycleID: -1,
        cycleName: '',
        employeeId: null,
        employeeName: null,
        finalComments: null,
        fromMonth: '',
        id: null,
        nominationQuestionDataDtosId: [],
        nominationStatus: null,
        rating: null,
        toMonth: '',
      },
      questionsInformation: [],
      error: null,
    }

    it('"isLoading" is set to loading for "nominationFormDetailsThunk"', () => {
      const action = {
        type: addNomineeService.nominationFormDetailsThunk.pending.type,
      }
      const state = addNomineeReducer(initialState, action)
      expect(state).toEqual({
        ...initialState,
        isLoading: ApiLoadingState.loading,
      })
    })

    it('"isLoading" is set to success for "nominationFormDetailsThunk"', () => {
      const action = {
        type: addNomineeService.nominationFormDetailsThunk.fulfilled.type,
      }
      const state = addNomineeReducer(initialState, action)
      expect(state).toEqual({
        ...initialState,
        isLoading: ApiLoadingState.succeeded,
        nominationFormDetails: undefined,
      })
    })

    it('"isLoading" is set to failed for "nominationFormDetailsThunk"', () => {
      const action = {
        type: addNomineeService.nominationFormDetailsThunk.rejected.type,
      }
      const state = addNomineeReducer(initialState, action)
      expect(state).toEqual({
        ...initialState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })

    it('"isLoading" is set to loading for "addNomineeThunk"', () => {
      const action = {
        type: addNomineeService.addNomineeThunk.pending.type,
      }
      const state = addNomineeReducer(initialState, action)
      expect(state).toEqual({
        ...initialState,
        isLoading: ApiLoadingState.loading,
      })
    })

    it('"isLoading" is set to success for "addNomineeThunk"', () => {
      const action = {
        type: addNomineeService.addNomineeThunk.fulfilled.type,
      }
      const state = addNomineeReducer(initialState, action)
      expect(state).toEqual({
        ...initialState,
        isLoading: ApiLoadingState.succeeded,
      })
    })

    it('"isLoading" is set to failed for "addNomineeThunk"', () => {
      const action = {
        type: addNomineeService.addNomineeThunk.rejected.type,
      }
      const state = addNomineeReducer(initialState, action)
      expect(state).toEqual({
        ...initialState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
  })
})
