import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import ticketReportApi from '../../../middleware/api/Support/Report/ticketReportsApi'
import {
  DepartmentCategoryList,
  DepartmentNameList,
  GetTicketsReportList,
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

const getDepartmentCategoryList = createAsyncThunk<
  DepartmentCategoryList[] | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'support/getDepartmentCategoryList',
  async (deptId: string | number, thunkApi) => {
    try {
      return await ticketReportApi.getDepartmentCategoryList(deptId)
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

const initialTicketReportState: TicketReportSliceState = {
  currentPage: 1,
  pageSize: 20,
  ticketsReportList: [],
  getTicketsReport: { list: [], size: 0 },
  departmentCategoryList: [],
  departmentNameList: [],
  isLoading: ApiLoadingState.idle,
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
    builder.addCase(getDepartmentCategoryList.fulfilled, (state, action) => {
      state.departmentCategoryList = action.payload as DepartmentCategoryList[]
    })
    builder.addCase(getDepartmentNameList.fulfilled, (state, action) => {
      state.departmentNameList = action.payload
    })
  },
})

const ticketReportThunk = {
  getDepartmentNameList,
  getDepartmentCategoryList,
  getTicketsReport,
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

const ticketReportSelectors = {
  isLoading,
  departmentNameList,
  departmentCategoryList,
  ticketsReport,
  pageFromState,
  pageSizeFromState,
}

export const ticketReportService = {
  ...ticketReportThunk,
  actions: ticketReportSlice.actions,
  selectors: ticketReportSelectors,
}

export default ticketReportSlice.reducer
