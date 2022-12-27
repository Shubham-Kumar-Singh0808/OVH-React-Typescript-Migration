import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import LeadershipEnrollmentFormApi from '../../../middleware/api/Achievements/LeadershipEnrollmentForm/LeadershipEnrollmentFormApi'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  LeadershipEnrollmentFormInitialState,
  OutgoingLeadershipForm,
} from '../../../types/Achievements/LeadershipEnrollmentForm/LeadershipEnrollmentFormTypes'

const initialState: LeadershipEnrollmentFormInitialState = {
  isLoading: ApiLoadingState.idle,
  employeeDetails: {
    name: '',
    Id: -1,
    duplicate: false,
  },
}

const getEmployeeDetailsThunk = createAsyncThunk(
  'leadershipEnrollmentForm/getEmployeeDetailsThunk',
  async (_, thunkApi) => {
    try {
      return await LeadershipEnrollmentFormApi.getEmployeeDetails()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const addLeadershipThunk = createAsyncThunk(
  'leadershipEnrollmentForm/addLeadershipThunk',
  async (outBody: OutgoingLeadershipForm) => {
    try {
      return await LeadershipEnrollmentFormApi.addLeadership(outBody)
    } catch (error) {
      const err = error as AxiosError
      return err.response?.status
    }
  },
)

const LeadershipEnrollmentFormSlice = createSlice({
  name: 'leadershipEnrollmentForm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployeeDetailsThunk.fulfilled, (state, action) => {
      state.employeeDetails = action.payload
    })
    builder.addMatcher(
      isAnyOf(getEmployeeDetailsThunk.fulfilled, addLeadershipThunk.fulfilled),
      (state) => {
        state.isLoading = ApiLoadingState.succeeded
      },
    )
    builder.addMatcher(
      isAnyOf(getEmployeeDetailsThunk.pending, addLeadershipThunk.pending),
      (state) => {
        state.isLoading = ApiLoadingState.loading
      },
    )
  },
})

const LeadershipEnrollmentFormThunks = {
  getEmployeeDetailsThunk,
  addLeadershipThunk,
}

export const leadershipEnrollmentFormService = {
  ...LeadershipEnrollmentFormThunks,
  actions: LeadershipEnrollmentFormSlice.actions,
}

const leadershipEnrollmentFormReducer = LeadershipEnrollmentFormSlice.reducer
export default leadershipEnrollmentFormReducer
