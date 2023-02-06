import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import sqaAuditReportApi from '../../middleware/api/SQAAuditReport/SQAAuditReportApi'
import { RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  GetSQAAuditReportProps,
  SQAAuditReportList,
  sqaAuditReportSliceState,
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

const initialSQAAuditReportState: sqaAuditReportSliceState = {
  getSQAAuditReport: { size: 0, list: [] },
  sqaAuditReportList: [],
  isLoading: ApiLoadingState.idle,
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
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.sqaAuditReport.isLoading

const sqaAuditReport = (state: RootState): SQAAuditReportList[] =>
  state.sqaAuditReport.getSQAAuditReport.list

const sqaAuditReportListSize = (state: RootState): number =>
  state.sqaAuditReport.getSQAAuditReport.size

const sqaAuditReportThunk = {
  getSQAAuditReport,
}

const myTicketsSelectors = {
  isLoading,
  sqaAuditReport,
  sqaAuditReportListSize,
}

export const sqaAuditReportService = {
  ...sqaAuditReportThunk,
  actions: sqaAuditReportSlice.actions,
  selectors: myTicketsSelectors,
}

export default sqaAuditReportSlice.reducer
