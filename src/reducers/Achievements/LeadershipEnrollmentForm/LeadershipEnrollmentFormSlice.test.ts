import leadershipEnrollmentFormReducer, {
  leadershipEnrollmentFormService,
} from './LeadershipEnrollmentFormSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { LeadershipEnrollmentFormInitialState } from '../../../types/Achievements/LeadershipEnrollmentForm/LeadershipEnrollmentFormTypes'

describe('Leadership Enrollment Reducer', () => {
  describe('Leadership Enrollment slice', () => {
    const initialState: LeadershipEnrollmentFormInitialState = {
      isLoading: ApiLoadingState.idle,
      employeeDetails: {
        name: '',
        Id: -1,
        duplicate: false,
      },
    }

    it('isLoading is set to "loading" for "getEmployeeDetailsThunk"', () => {
      const action = {
        type: leadershipEnrollmentFormService.getEmployeeDetailsThunk.pending
          .type,
      }
      const state = leadershipEnrollmentFormReducer(initialState, action)
      expect(state).toEqual({
        ...initialState,
        isLoading: ApiLoadingState.loading,
      })
    })

    it('isLoading is set to "succeeded" for "getEmployeeDetailsThunk"', () => {
      const action = {
        type: leadershipEnrollmentFormService.getEmployeeDetailsThunk.fulfilled
          .type,
      }
      const state = leadershipEnrollmentFormReducer(initialState, action)
      expect(state).toEqual({
        employeeDetails: undefined,
        isLoading: ApiLoadingState.succeeded,
      })
    })

    it('isLoading is set to "loading" for "addLeadershipThunk"', () => {
      const action = {
        type: leadershipEnrollmentFormService.addLeadershipThunk.pending.type,
      }
      const state = leadershipEnrollmentFormReducer(initialState, action)
      expect(state).toEqual({
        ...initialState,
        isLoading: ApiLoadingState.loading,
      })
    })

    it('isLoading is set to "succeeded" for "addLeadershipThunk"', () => {
      const action = {
        type: leadershipEnrollmentFormService.addLeadershipThunk.fulfilled.type,
      }
      const state = leadershipEnrollmentFormReducer(initialState, action)
      expect(state).toEqual({
        ...initialState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
  })
})
