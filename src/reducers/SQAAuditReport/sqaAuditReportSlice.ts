import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import sqaAuditReportApi from '../../middleware/api/SQAAuditReport/SQAAuditReportApi'
import { AppDispatch, RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  GetSQAAuditHistory,
  GetSQAAuditReportProps,
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

const initialSQAAuditReportState: sqaAuditReportSliceState = {
  getSQAAuditReport: { size: 0, list: [] },
  sqaAuditReportList: [],
  isLoading: ApiLoadingState.idle,
  sqaAuditHistory: { size: 0, list: [] },
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
      .addCase(getSQAAuditReport.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getNewSQAAuditTimelineDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.sqaAuditHistory = action.payload
      })
      .addCase(getNewSQAAuditTimelineDetails.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
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

const sqaAuditReportThunk = {
  getSQAAuditReport,
  deleteProjectAuditDetails,
  closeProjectAuditDetails,
  getNewSQAAuditTimelineDetails,
}

const myTicketsSelectors = {
  isLoading,
  sqaAuditReport,
  sqaAuditReportListSize,
  sqaAuditReportTimeLine,
}

export const sqaAuditReportService = {
  ...sqaAuditReportThunk,
  actions: sqaAuditReportSlice.actions,
  selectors: myTicketsSelectors,
}

export default sqaAuditReportSlice.reducer
