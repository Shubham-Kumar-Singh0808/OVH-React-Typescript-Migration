import recruitmentHistoryReducer, {
  initialIncomingRecruitmentHistory,
  recruitmentHistoryServices,
} from './recruitmentHistorySlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RecruitmentHistorySliceTypes } from '../../../types/MyProfile/RecruitmentHistory/RecruitmentHistoryTypes'

describe('Recruitment History Slice Testing', () => {
  const initialState: RecruitmentHistorySliceTypes = {
    isLoading: ApiLoadingState.idle,
    error: null,
    recruitmentHistoryData: initialIncomingRecruitmentHistory,
  }
  it('isLoading is set to "loading" if "getEmployeeHistoryThunk" is pending', () => {
    const action = {
      type: recruitmentHistoryServices.getEmployeeHistoryThunk.pending.type,
    }
    const state = recruitmentHistoryReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })
  it('isLoading is set to "succeeded" if "getEmployeeHistoryThunk" is fulfilled', () => {
    const action = {
      type: recruitmentHistoryServices.getEmployeeHistoryThunk.fulfilled.type,
    }
    const state = recruitmentHistoryReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
      recruitmentHistoryData: undefined,
    })
  })
  it('isLoading is set to "failed" if "getEmployeeHistoryThunk" is rejected', () => {
    const action = {
      type: recruitmentHistoryServices.getEmployeeHistoryThunk.rejected.type,
    }
    const state = recruitmentHistoryReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
      error: undefined,
    })
  })
})
