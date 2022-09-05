import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import ticketApprovalsApi from '../../../middleware/api/Support/TicketApprovals/ticketApprovalsApi'
import { RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import {
  DepartmentCategoryList,
  DepartmentList,
  GetAllTicketsForApprovalProps,
  SubCategoryList,
  TicketApprovalsSliceState,
} from '../../../types/Support/TicketApprovals/ticketApprovalsTypes'

const getDepartmentNameList = createAsyncThunk(
  'ticketApprovals/getDepartmentNameList',
  async (_, thunkApi) => {
    try {
      return await ticketApprovalsApi.getDepartmentNameList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getTrackerList = createAsyncThunk(
  'ticketApprovals/getTrackerList',
  async (_, thunkApi) => {
    try {
      return await ticketApprovalsApi.getTrackerList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getDepartmentCategoryList = createAsyncThunk(
  'ticketApprovals/getDepartmentCategoryList',
  async (deptId: number, thunkApi) => {
    try {
      return await ticketApprovalsApi.getDepartmentCategoryList(deptId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getSubCategoryList = createAsyncThunk(
  'ticketApprovals/getSubCategoryList',
  async (categoryId: number, thunkApi) => {
    try {
      return await ticketApprovalsApi.getSubCategoryList(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllTicketsForApproval = createAsyncThunk(
  'ticketApprovals/getAllTicketsForApproval',
  async (props: GetAllTicketsForApprovalProps, thunkApi) => {
    try {
      return await ticketApprovalsApi.getAllTicketsForApproval(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialTicketApprovalsSliceState: TicketApprovalsSliceState = {
  isLoading: ApiLoadingState.idle,
  departmentNameList: [],
  trackerList: [],
  departmentCategoryList: [],
  subCategoryList: [],
  ticketsForApproval: { size: 0, list: [] },
}

const ticketApprovalsSlice = createSlice({
  name: 'ticketApprovals',
  initialState: initialTicketApprovalsSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDepartmentNameList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.departmentNameList = action.payload
      })
      .addCase(getTrackerList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.trackerList = action.payload
      })
      .addCase(getDepartmentCategoryList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.departmentCategoryList = action.payload
      })
      .addCase(getSubCategoryList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.subCategoryList = action.payload
      })
      .addCase(getAllTicketsForApproval.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.ticketsForApproval = action.payload
      })
      .addMatcher(
        isAnyOf(
          getDepartmentNameList.pending,
          getTrackerList.pending,
          getDepartmentCategoryList.pending,
          getSubCategoryList.pending,
          getAllTicketsForApproval.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const ticketApprovalsThunk = {
  getDepartmentNameList,
  getTrackerList,
  getDepartmentCategoryList,
  getSubCategoryList,
  getAllTicketsForApproval,
}

const departmentNameList = (state: RootState): DepartmentList[] =>
  state.ticketApprovals.departmentNameList

const departmentCategoryList = (state: RootState): DepartmentCategoryList[] =>
  state.ticketApprovals.departmentCategoryList

const subCategoryList = (state: RootState): SubCategoryList[] =>
  state.ticketApprovals.subCategoryList

const ticketApprovalsSelectors = {
  departmentNameList,
  departmentCategoryList,
  subCategoryList,
}

export const ticketApprovalsService = {
  ...ticketApprovalsThunk,
  actions: ticketApprovalsSlice.actions,
  selectors: ticketApprovalsSelectors,
}

export default ticketApprovalsSlice.reducer
