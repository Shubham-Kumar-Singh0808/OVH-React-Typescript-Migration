import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import ticketReportApi from '../../../middleware/api/Support/Report/ticketReportsApi'
import {
  DepartmentCategoryList,
  DepartmentNameList,
  GetTicketsDetailsList,
  GetTicketsReportList,
  TicketDetailsProps,
  TicketReportApiProps,
  TicketReportSliceState,
} from '../../../types/Support/Report/ticketReportTypes'

const getDepartmentNameList = createAsyncThunk(
  'support/getDepartmentNameList',
  async (_, thunkApi) => {
    try {
      return await ticketReportApi.getDepartmentNameList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getTicketsReport = createAsyncThunk(
  'support/getTicketsReport',
  async (props: TicketReportApiProps, thunkApi) => {
    try {
      return await ticketReportApi.getTicketsReport(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getTicketDetails = createAsyncThunk(
  'support/getTicketDetails',
  async (props: TicketDetailsProps, thunkApi) => {
    try {
      return await ticketReportApi.getTicketDetails(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialTicketReportState: TicketReportSliceState = {
  currentPage: 1,
  pageSize: 20,
  ticketsReportList: [],
  getTicketsReport: { list: [], size: 0 },
  departmentCategoryList: [],
  departmentNameList: [],
  isLoading: ApiLoadingState.idle,
  ticketsDetailsList: [],
  getTicketDetails: { list: [], size: 0 },
}

const ticketReportSlice = createSlice({
  name: 'support',
  initialState: initialTicketReportState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTicketsReport.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.ticketsReportList = action.payload.list
      state.getTicketsReport = action.payload
    })
    builder.addCase(getTicketsReport.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
    builder.addCase(getTicketDetails.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.ticketsDetailsList = action.payload.list
      state.getTicketDetails = action.payload
    })
    builder.addCase(getTicketDetails.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
    builder.addCase(getDepartmentNameList.fulfilled, (state, action) => {
      state.departmentNameList = action.payload
    })
  },
})

const ticketReportThunk = {
  getDepartmentNameList,
  getTicketsReport,
  getTicketDetails,
}

const isLoading = (state: RootState): LoadingState =>
  state.ticketReport.isLoading

const departmentNameList = (state: RootState): DepartmentNameList[] =>
  state.ticketReport.departmentNameList

const departmentCategoryList = (state: RootState): DepartmentCategoryList[] =>
  state.ticketReport.departmentCategoryList

const ticketsReport = (state: RootState): GetTicketsReportList[] =>
  state.ticketReport.ticketsReportList

const pageFromState = (state: RootState): number =>
  state.ticketReport.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.ticketReport.pageSize

const ticketsDetails = (state: RootState): GetTicketsDetailsList[] =>
  state.ticketReport.ticketsDetailsList

const ticketReportSelectors = {
  isLoading,
  departmentNameList,
  departmentCategoryList,
  ticketsReport,
  pageFromState,
  pageSizeFromState,
  ticketsDetails,
}

export const ticketReportService = {
  ...ticketReportThunk,
  actions: ticketReportSlice.actions,
  selectors: ticketReportSelectors,
}

export default ticketReportSlice.reducer
