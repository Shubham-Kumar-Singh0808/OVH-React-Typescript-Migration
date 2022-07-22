import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import scheduledInterviewsApi from '../../../middleware/api/Recruitment/ScheduledInterviews/ScheduledInterviewsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  GetSearchScheduledCandidatesProps,
  GetSearchScheduledCandidatesResponse,
  ScheduledInterviewsSliceState,
} from '../../../types/Recruitment/ScheduledInterviews/scheduledInterviewsTypes'
import { SelectedView } from '../../../types/TimeAndAttendance/TimeInOfficeReport/timeInOfficeReportTypes'

const getScheduledCandidatesForEmployee = createAsyncThunk(
  'scheduledInterviews/getScheduledCandidatesForEmployee',
  async (props: GetSearchScheduledCandidatesProps, thunkApi) => {
    try {
      return await scheduledInterviewsApi.getScheduledCandidatesForEmployee(
        props,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getScheduledCandidates = createAsyncThunk(
  'scheduledInterviews/getScheduledCandidates',
  async (props: GetSearchScheduledCandidatesProps, thunkApi) => {
    try {
      return await scheduledInterviewsApi.getScheduledCandidates(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialScheduledInterviewsSliceState: ScheduledInterviewsSliceState = {
  selectedView: 'Me',
  scheduledCandidatesForEmployee: { list: [], size: 0 },
  scheduledCandidates: { list: [], size: 0 },
  isLoading: ApiLoadingState.idle,
}

const scheduledInterviewsSlice = createSlice({
  name: 'scheduledInterviews',
  initialState: initialScheduledInterviewsSliceState,
  reducers: {
    setSelectedView: (state, action) => {
      state.selectedView = action.payload
    },
    clearScheduledCandidatesForEmployee: (state) => {
      state.scheduledCandidatesForEmployee = { list: [], size: 0 }
    },
    clearScheduledCandidates: (state) => {
      state.scheduledCandidates = { list: [], size: 0 }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScheduledCandidatesForEmployee.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.scheduledCandidatesForEmployee = action.payload
      })
      .addCase(getScheduledCandidates.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.scheduledCandidates = action.payload
      })
      .addMatcher(
        isAnyOf(
          getScheduledCandidates.pending,
          getScheduledCandidatesForEmployee.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.scheduledInterviews.isLoading

const scheduledCandidatesForEmployee = (
  state: RootState,
): GetSearchScheduledCandidatesResponse =>
  state.scheduledInterviews.scheduledCandidatesForEmployee

const scheduledCandidates = (
  state: RootState,
): GetSearchScheduledCandidatesResponse =>
  state.scheduledInterviews.scheduledCandidates

const selectedView = (state: RootState): SelectedView =>
  state.scheduledInterviews.selectedView

const scheduledCandidatesListSize = (state: RootState): number =>
  state.scheduledInterviews.scheduledCandidates.size

const scheduledInterviewsThunk = {
  getScheduledCandidatesForEmployee,
  getScheduledCandidates,
}

const scheduledInterviewsSelectors = {
  isLoading,
  scheduledCandidatesForEmployee,
  scheduledCandidates,
  scheduledCandidatesListSize,
  selectedView,
}

export const scheduledInterviewsService = {
  ...scheduledInterviewsThunk,
  actions: scheduledInterviewsSlice.actions,
  selectors: scheduledInterviewsSelectors,
}

export default scheduledInterviewsSlice.reducer
