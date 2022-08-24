import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import ticketReportApi from '../../../middleware/api/Support/Report/ticketReportsApi'
import {
  DepartmentCategoryList,
  DepartmentNameList,
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
  getTicketsReport: { list: [], size: 0 },
  departmentCategoryList: [],
  departmentNameList: [],
  isLoading: ApiLoadingState.idle,
}

const ticketReportSlice = createSlice({
  name: 'support',
  initialState: initialTicketReportState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTicketsReport.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.getTicketsReport = action.payload
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

const ticketReportSelectors = {
  isLoading,
  departmentNameList,
  departmentCategoryList,
}

export const ticketReportService = {
  ...ticketReportThunk,
  actions: ticketReportSlice.actions,
  selectors: ticketReportSelectors,
}

export default ticketReportSlice.reducer
