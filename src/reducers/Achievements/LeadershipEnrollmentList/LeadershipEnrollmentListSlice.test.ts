import leadershipEnrollmentListReducer, {
  leadershipEnrollmentListService,
} from './LeadershipEnrollmentListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { LeadershipEnrollmentListInitialState } from '../../../types/Achievements/LeadershipEnrollmentList/LeadershipEnrollmentListTypes'

describe('Leadership Enrollment List Slice', () => {
  const initialState: LeadershipEnrollmentListInitialState = {
    isLoading: ApiLoadingState.idle,
    leadershipList: [],
  }

  it('isLoading is set to loading for "getLeadershipListThunk"', () => {
    const action = {
      type: leadershipEnrollmentListService.getLeadershipListThunk.pending.type,
    }
    const state = leadershipEnrollmentListReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })

  it('isLoading is set to succeeded for "getLeadershipListThunk"', () => {
    const action = {
      type: leadershipEnrollmentListService.getLeadershipListThunk.fulfilled
        .type,
    }
    const state = leadershipEnrollmentListReducer(initialState, action)
    expect(state).toEqual({
      leadershipList: undefined,
      isLoading: ApiLoadingState.succeeded,
    })
  })

  it('isLoading is set to loading for "approveLeadershipThunk"', () => {
    const action = {
      type: leadershipEnrollmentListService.approveLeadershipThunk.pending.type,
    }
    const state = leadershipEnrollmentListReducer(initialState, action)
    expect(state).toEqual(initialState)
  })

  it('isLoading is set to succeeded for "approveLeadershipThunk"', () => {
    const action = {
      type: leadershipEnrollmentListService.approveLeadershipThunk.fulfilled
        .type,
    }
    const state = leadershipEnrollmentListReducer(initialState, action)
    expect(state).toEqual(initialState)
  })

  it('isLoading is set to loading for "rejectLeadershipThunk"', () => {
    const action = {
      type: leadershipEnrollmentListService.rejectLeadershipThunk.pending.type,
    }
    const state = leadershipEnrollmentListReducer(initialState, action)
    expect(state).toEqual(initialState)
  })

  it('isLoading is set to succeeded for "rejectLeadershipThunk"', () => {
    const action = {
      type: leadershipEnrollmentListService.rejectLeadershipThunk.fulfilled
        .type,
    }
    const state = leadershipEnrollmentListReducer(initialState, action)
    expect(state).toEqual(initialState)
  })
})
