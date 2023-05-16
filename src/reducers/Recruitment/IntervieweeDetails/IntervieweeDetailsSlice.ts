import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import IntervieweeDetailsApi from '../../../middleware/api/Recruitment/IntervieweeDetails/IntervieweeDetailsApi'
import {
  CycleDtOs,
  EmpScheduleInterviewData,
  IntervieweeDetailsSliceState,
  TimeLineList,
  UpdateProps,
  saveButnprops,
  timeLineDetails,
} from '../../../types/Recruitment/IntervieweeDetails/IntervieweeDetailsTypes'

const timeLineData = createAsyncThunk(
  'IntervieweeDetails/timeLineDetails',
  async (candidateId: number, thunkApi) => {
    try {
      return await IntervieweeDetailsApi.timeLineDetails(candidateId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const saveInitialComments = createAsyncThunk(
  'IntervieweeDetails/saveInitialComments',
  async (props: saveButnprops, thunkApi) => {
    try {
      return await IntervieweeDetailsApi.saveInitialComments(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateCandidateInterviewStatus = createAsyncThunk(
  'IntervieweeDetails/updateCandidateInterviewStatus',
  async (props: UpdateProps, thunkApi) => {
    try {
      return await IntervieweeDetailsApi.updateCandidateInterviewStatus(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const empScheduleInterviewDetails = createAsyncThunk(
  'IntervieweeDetails/empScheduleInterviewDetails',
  async (interviewCycleId: number, thunkApi) => {
    try {
      return await IntervieweeDetailsApi.empScheduleInterviewDetails(
        interviewCycleId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialIntervieweeDetailsState: IntervieweeDetailsSliceState = {
  isLoading: ApiLoadingState.idle,
  listSize: 0,
  timeLineList: {} as TimeLineList,
  cycleDtOs: {} as CycleDtOs,
  CycleDtOsList: [],
  timeLineDetails: {} as timeLineDetails,
  scheduleInterviewData: {} as EmpScheduleInterviewData,
}
const IntervieweeDetailsSlice = createSlice({
  name: 'IntervieweeDetails',
  initialState: initialIntervieweeDetailsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(timeLineData.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.timeLineList = action.payload
      })
      .addCase(empScheduleInterviewDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.scheduleInterviewData = action.payload
      })
  },
})

export const intervieweeDetailsThunk = {
  timeLineData,
  saveInitialComments,
  updateCandidateInterviewStatus,
  empScheduleInterviewDetails,
}

const listSize = (state: RootState): number => state.intervieweeDetails.listSize

const isLoading = (state: RootState): LoadingState =>
  state?.intervieweeDetails.isLoading

const timeLineSelector = (state: RootState): timeLineDetails =>
  state.intervieweeDetails.timeLineDetails

const cycleDtOsList = (state: RootState): CycleDtOs =>
  state.intervieweeDetails.cycleDtOs

const cycleDtOsArrayList = (state: RootState): CycleDtOs[] =>
  state.intervieweeDetails.CycleDtOsList

const TimeLineListSelector = (state: RootState): TimeLineList =>
  state.intervieweeDetails.timeLineList

const scheduleInterviewSelector = (
  state: RootState,
): EmpScheduleInterviewData => state.intervieweeDetails.scheduleInterviewData

export const intervieweeDetailsSelectors = {
  listSize,
  isLoading,
  timeLineSelector,
  cycleDtOsList,
  cycleDtOsArrayList,
  TimeLineListSelector,
  scheduleInterviewSelector,
}

export const intervieweeDetailsService = {
  ...intervieweeDetailsThunk,
  actions: IntervieweeDetailsSlice.actions,
  selectors: intervieweeDetailsSelectors,
}

export default IntervieweeDetailsSlice.reducer
