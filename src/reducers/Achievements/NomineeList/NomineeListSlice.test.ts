import nomineeListReducer, { nomineeListService } from './NomineeListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  IncomingNomineeDetails,
  NomineeListInitialState,
} from '../../../types/Achievements/NomineeList/NomineeListTypes'

const nomineeDetailsInitial: IncomingNomineeDetails = {
  id: -1,
  employeeId: -1,
  employeeName: '',
  achievementTypeId: null,
  achievementType: '',
  nominationQuestionDataDtosId: [],
  cycleID: null,
  cycleName: '',
  fromMonth: '',
  toMonth: '',
  rating: null,
  finalComments: '',
  nominationStatus: 'N/A',
  activateFlag: null,
  createdBy: null,
  createdDate: null,
}

describe('Nominee List Slice', () => {
  describe('test', () => {
    const initialState: NomineeListInitialState = {
      isLoading: ApiLoadingState.succeeded,
      cyclesList: { size: 0, list: [] },
      nominationsList: [],
      error: null,
      nomineeDetails: nomineeDetailsInitial,
    }

    it('"isLoading" set to loading for "getAllCyclesThunk"', () => {
      const action = {
        type: nomineeListService.getAllCyclesThunk.pending.type,
      }
      const state = nomineeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        cyclesList: { size: 0, list: [] },
        nominationsList: [],
        error: null,
        nomineeDetails: nomineeDetailsInitial,
      })
    })

    it('"isLoading" set to succeeded for "getAllCyclesThunk"', () => {
      const action = {
        type: nomineeListService.getAllCyclesThunk.fulfilled.type,
      }
      const state = nomineeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        cyclesList: undefined,
        nominationsList: [],
        error: null,
        nomineeDetails: nomineeDetailsInitial,
      })
    })

    it('"isLoading" set to failed for "getAllCyclesThunk"', () => {
      const action = {
        type: nomineeListService.getAllCyclesThunk.rejected.type,
      }
      const state = nomineeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        cyclesList: { size: 0, list: [] },
        nominationsList: [],
        error: undefined,
        nomineeDetails: nomineeDetailsInitial,
      })
    })

    it('"isLoading" set to loading for "getNominationsThunk"', () => {
      const action = {
        type: nomineeListService.getNominationsThunk.pending.type,
      }
      const state = nomineeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        cyclesList: { size: 0, list: [] },
        nominationsList: [],
        error: null,
        nomineeDetails: nomineeDetailsInitial,
      })
    })

    it('"isLoading" set to succeeded for "getNominationsThunk"', () => {
      const action = {
        type: nomineeListService.getNominationsThunk.fulfilled.type,
      }
      const state = nomineeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        cyclesList: { size: 0, list: [] },
        nominationsList: undefined,
        error: null,
        nomineeDetails: nomineeDetailsInitial,
      })
    })

    it('"isLoading" set to failed for "getNominationsThunk"', () => {
      const action = {
        type: nomineeListService.getNominationsThunk.rejected.type,
      }
      const state = nomineeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        cyclesList: { size: 0, list: [] },
        nominationsList: [],
        error: undefined,
        nomineeDetails: nomineeDetailsInitial,
      })
    })

    it('"isLoading" set to loading for "getNominationDetailsThunk"', () => {
      const action = {
        type: nomineeListService.getNominationDetailsThunk.pending.type,
      }
      const state = nomineeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        cyclesList: { size: 0, list: [] },
        nominationsList: [],
        error: null,
        nomineeDetails: nomineeDetailsInitial,
      })
    })

    it('"isLoading" set to succeeded for "getNominationDetailsThunk"', () => {
      const action = {
        type: nomineeListService.getNominationDetailsThunk.fulfilled.type,
      }
      const state = nomineeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        cyclesList: { size: 0, list: [] },
        nominationsList: [],
        error: null,
        nomineeDetails: undefined,
      })
    })

    it('"isLoading" set to failed for "getNominationDetailsThunk"', () => {
      const action = {
        type: nomineeListService.getNominationDetailsThunk.rejected.type,
      }
      const state = nomineeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        cyclesList: { size: 0, list: [] },
        nominationsList: [],
        error: undefined,
        nomineeDetails: nomineeDetailsInitial,
      })
    })

    it('"isLoading" set to loading for "reviewNomineeThunk"', () => {
      const action = {
        type: nomineeListService.reviewNomineeThunk.pending.type,
      }
      const state = nomineeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        cyclesList: { size: 0, list: [] },
        nominationsList: [],
        error: null,
        nomineeDetails: nomineeDetailsInitial,
      })
    })

    it('"isLoading" set to succeeded for "reviewNomineeThunk"', () => {
      const action = {
        type: nomineeListService.reviewNomineeThunk.fulfilled.type,
      }
      const state = nomineeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        cyclesList: { size: 0, list: [] },
        nominationsList: [],
        error: null,
        nomineeDetails: nomineeDetailsInitial,
      })
    })

    it('"isLoading" set to failed for "reviewNomineeThunk"', () => {
      const action = {
        type: nomineeListService.reviewNomineeThunk.rejected.type,
      }
      const state = nomineeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        cyclesList: { size: 0, list: [] },
        nominationsList: [],
        error: undefined,
        nomineeDetails: nomineeDetailsInitial,
      })
    })
  })
})
