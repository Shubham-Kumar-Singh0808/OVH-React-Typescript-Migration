import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import LeadershipEnrollmentListApi from '../../../middleware/api/Achievements/LeadershipEnrollmentList/LeadershipEnrollmentListApi'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  ApproveRejectLeadershipQueryParameters,
  LeadershipEnrollmentListInitialState,
  LeadershipListQueryParameters,
} from '../../../types/Achievements/LeadershipEnrollmentList/LeadershipEnrollmentListTypes'

const initialState: LeadershipEnrollmentListInitialState = {
  isLoading: ApiLoadingState.idle,
  leadershipList: [],
}

const getLeadershipListThunk = createAsyncThunk(
  'leadershipEnrollmentList/getLeadershipListThunk',
  async (query: LeadershipListQueryParameters, thunkApi) => {
    try {
      return await LeadershipEnrollmentListApi.getLeadershipList(query)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const approveLeadershipThunk = createAsyncThunk(
  'leadershipEnrollmentList/approveLeadershipThunk',
  async (query: ApproveRejectLeadershipQueryParameters, thunkApi) => {
    try {
      return await LeadershipEnrollmentListApi.approveLeadership(query)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const rejectLeadershipThunk = createAsyncThunk(
  'leadershipEnrollmentList/rejectLeadershipThunk',
  async (query: ApproveRejectLeadershipQueryParameters, thunkApi) => {
    try {
      return await LeadershipEnrollmentListApi.rejectLeadership(query)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const leadershipEnrollmentListSlice = createSlice({
  name: 'leadershipEnrollmentList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLeadershipListThunk.fulfilled, (state, action) => {
      state.leadershipList = action.payload
    })
    builder.addMatcher(isAnyOf(getLeadershipListThunk.fulfilled), (state) => {
      state.isLoading = ApiLoadingState.succeeded
    })
    builder.addMatcher(isAnyOf(getLeadershipListThunk.pending), (state) => {
      state.isLoading = ApiLoadingState.loading
    })
  },
})

const leadershipEnrollmentListThunks = {
  getLeadershipListThunk,
  approveLeadershipThunk,
  rejectLeadershipThunk,
}

export const leadershipEnrollmentListService = {
  ...leadershipEnrollmentListThunks,
  actions: leadershipEnrollmentListSlice.actions,
}

const leadershipEnrollmentListReducer = leadershipEnrollmentListSlice.reducer
export default leadershipEnrollmentListReducer
