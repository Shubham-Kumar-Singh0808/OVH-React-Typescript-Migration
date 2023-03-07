import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import sqaAuditReportApi from '../../middleware/api/SQAAuditReport/SQAAuditReportApi'
import { AppDispatch, RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  GetAuditDetails,
  GetSQAAuditHistory,
  GetSQAAuditReportProps,
  RescheduleMeetingProps,
  SQAAuditReportList,
  sqaAuditReportSliceState,
  SQAAuditTimelineDetails,
} from '../../types/SQAAuditReport/sqaAuditReportTypes'

const getSQAAuditReport = createAsyncThunk(
  'sqaAuditReport/getSQAAuditReport',
  async (props: GetSQAAuditReportProps, thunkApi) => {
    try {
      return await sqaAuditReportApi.getSQAAuditReport(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteProjectAuditDetails = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'sqaAuditReport/deleteProjectAuditDetails',
  async (auditId: number, thunkApi) => {
    try {
      return await sqaAuditReportApi.deleteProjectAuditDetails(auditId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const closeProjectAuditDetails = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'sqaAuditReport/closeProjectAuditDetails',
  async (auditId: number, thunkApi) => {
    try {
      return await sqaAuditReportApi.closeProjectAuditDetails(auditId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getNewSQAAuditTimelineDetails = createAsyncThunk<
  GetSQAAuditHistory,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'sqaAuditReport/getNewSQAAuditTimelineDetails',
  async (auditId: number, thunkApi) => {
    try {
      return await sqaAuditReportApi.getNewSQAAuditTimelineDetails(auditId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getSQAAuditDetails = createAsyncThunk<
  GetAuditDetails | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('sqaAuditReport/getSQAAuditDetails', async (auditId: number, thunkApi) => {
  try {
    return await sqaAuditReportApi.getSQAAuditDetails(auditId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const saveOrSubmitAuditForm = createAsyncThunk<
  number,
  RescheduleMeetingProps,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'sqaAuditReport/saveOrSubmitAuditForm',
  async (rescheduleMeeting: RescheduleMeetingProps, thunkApi) => {
    try {
      return await sqaAuditReportApi.saveOrSubmitAuditForm(rescheduleMeeting)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialSQAAuditReportState: sqaAuditReportSliceState = {
  getSQAAuditReport: { size: 0, list: [] },
  sqaAuditReportList: [],
  isLoading: ApiLoadingState.idle,
  sqaAuditHistory: { size: 0, list: [] },
  getAuditDetails: {} as GetAuditDetails,
}

const sqaAuditReportSlice = createSlice({
  name: 'support',
  initialState: initialSQAAuditReportState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSQAAuditReport.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getSQAAuditReport = action.payload
      })
      .addCase(getNewSQAAuditTimelineDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.sqaAuditHistory = action.payload
      })
      .addCase(getSQAAuditDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getAuditDetails = action.payload as GetAuditDetails
      })
      .addMatcher(
        isAnyOf(
          getSQAAuditDetails.pending,
          getNewSQAAuditTimelineDetails.pending,
          getSQAAuditReport.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.sqaAuditReport.isLoading

const sqaAuditReport = (state: RootState): SQAAuditReportList[] =>
  state.sqaAuditReport.getSQAAuditReport.list

const sqaAuditReportListSize = (state: RootState): number =>
  state.sqaAuditReport.getSQAAuditReport.size

const sqaAuditReportTimeLine = (state: RootState): SQAAuditTimelineDetails[] =>
  state.sqaAuditReport.sqaAuditHistory.list

const sqaAuditReportDetails = (state: RootState): GetAuditDetails =>
  state.sqaAuditReport.getAuditDetails

const sqaAuditReportThunk = {
  getSQAAuditReport,
  deleteProjectAuditDetails,
  closeProjectAuditDetails,
  getNewSQAAuditTimelineDetails,
  getSQAAuditDetails,
  saveOrSubmitAuditForm,
}

const myTicketsSelectors = {
  isLoading,
  sqaAuditReport,
  sqaAuditReportListSize,
  sqaAuditReportTimeLine,
  sqaAuditReportDetails,
}

export const sqaAuditReportService = {
  ...sqaAuditReportThunk,
  actions: sqaAuditReportSlice.actions,
  selectors: myTicketsSelectors,
}

export default sqaAuditReportSlice.reducer
