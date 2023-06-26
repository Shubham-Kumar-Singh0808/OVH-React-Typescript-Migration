import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import IntervieweeDetailsApi from '../../../middleware/api/Recruitment/IntervieweeDetails/IntervieweeDetailsApi'
import {
  CycleDtOs,
  EmpScheduleInterviewData,
  EmployeeProperties,
  IntervieweeDetailsSliceState,
  Reschedule,
  Schedule,
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

const updateInterview = createAsyncThunk(
  'IntervieweeDetails/updateInterview',
  async (props: EmpScheduleInterviewData, thunkApi) => {
    try {
      return await IntervieweeDetailsApi.updateInterview(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const reScheduleInterview = createAsyncThunk(
  'IntervieweeDetails/reScheduleInterview',
  async (props: Reschedule, thunkApi) => {
    try {
      return await IntervieweeDetailsApi.reScheduleInterview(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const scheduleInterview = createAsyncThunk(
  'IntervieweeDetails/scheduleInterview',
  async (props: Schedule, thunkApi) => {
    try {
      return await IntervieweeDetailsApi.scheduleInterview(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllEmployeeDetails = createAsyncThunk(
  'IntervieweeDetails/getAllEmployeeDetails',
  async (_, thunkApi) => {
    try {
      return await IntervieweeDetailsApi.getAllEmployeeDetails()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const interviewRoundCount = createAsyncThunk(
  'IntervieweeDetails/interviewRoundCount',
  async (candidateId: number, thunkApi) => {
    try {
      return await IntervieweeDetailsApi.interviewRoundCount(candidateId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const sendRejectedMessagetoCandidate = createAsyncThunk(
  'IntervieweeDetails/sendRejectedMessagetoCandidate',
  async (candidateId: number, thunkApi) => {
    try {
      return await IntervieweeDetailsApi.sendRejectedMessagetoCandidate(
        candidateId,
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
  addNewJoineeTechnology: {} as UpdateProps,
  employeeProperties: [],
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
      .addCase(updateCandidateInterviewStatus.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.addNewJoineeTechnology = action.payload
      })
      .addCase(getAllEmployeeDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeProperties = action.payload
      })
  },
})

export const intervieweeDetailsThunk = {
  timeLineData,
  saveInitialComments,
  updateCandidateInterviewStatus,
  empScheduleInterviewDetails,
  updateInterview,
  getAllEmployeeDetails,
  interviewRoundCount,
  reScheduleInterview,
  scheduleInterview,
  sendRejectedMessagetoCandidate,
}

const listSize = (state: RootState): number => state.intervieweeDetails.listSize

const isLoading = (state: RootState): LoadingState =>
  state?.intervieweeDetails.isLoading

const addJoineeSelector = (state: RootState): UpdateProps =>
  state.intervieweeDetails.addNewJoineeTechnology

const cycleDtOsList = (state: RootState): CycleDtOs =>
  state.intervieweeDetails.cycleDtOs

const cycleDtOsArrayList = (state: RootState): CycleDtOs[] =>
  state.intervieweeDetails.CycleDtOsList

const TimeLineListSelector = (state: RootState): TimeLineList =>
  state.intervieweeDetails.timeLineList

const scheduleInterviewData = (state: RootState): EmpScheduleInterviewData =>
  state.intervieweeDetails.scheduleInterviewData

const timeLineSelector = (state: RootState): timeLineDetails =>
  state.intervieweeDetails.timeLineDetails

const employeeProperties = (state: RootState): EmployeeProperties[] =>
  state.intervieweeDetails.employeeProperties
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
  scheduleInterviewData,
  addJoineeSelector,
  employeeProperties,
}

export const intervieweeDetailsService = {
  ...intervieweeDetailsThunk,
  actions: IntervieweeDetailsSlice.actions,
  selectors: intervieweeDetailsSelectors,
}

export default IntervieweeDetailsSlice.reducer
