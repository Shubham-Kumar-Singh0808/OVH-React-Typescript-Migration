import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import ticketApprovalsApi from '../../../middleware/api/Support/TicketApprovals/ticketApprovalsApi'
import { RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import {
  DepartmentCategoryList,
  DepartmentList,
  GetAllLookUps,
  GetAllTicketsForApprovalProps,
  GetAllTicketsForApprovalResponse,
  SubCategoryList,
  TicketApprovalsSliceState,
  TrackerList,
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

const getAllLookUps = createAsyncThunk(
  'ticketApprovals/getAllLookUps',
  async (_, thunkApi) => {
    try {
      return await ticketApprovalsApi.getAllLookUps()
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

const rejectTicket = createAsyncThunk(
  'ticketApprovals/rejectTicket',
  async (ticketId: number, thunkApi) => {
    try {
      return await ticketApprovalsApi.rejectTicket(ticketId)
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
  getAllLookUps: [],
  selectedTicketId: 0,
  toggleValue: '',
  routePath: '',
}

const ticketApprovalsSlice = createSlice({
  name: 'ticketApprovals',
  initialState: initialTicketApprovalsSliceState,
  reducers: {
    selectTicketId: (state, action) => {
      state.selectedTicketId = action.payload
    },
    setToggle: (state, action) => {
      state.toggleValue = action.payload
    },
    setRoutePath: (state, action) => {
      state.routePath = action.payload
    },
  },
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
        state.departmentCategoryList = action.payload
      })
      .addCase(getSubCategoryList.fulfilled, (state, action) => {
        state.subCategoryList = action.payload
      })
      .addCase(getAllTicketsForApproval.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.ticketsForApproval = action.payload
      })
      .addCase(getAllLookUps.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getAllLookUps = action.payload
      })
      .addCase(rejectTicket.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(
        isAnyOf(
          getDepartmentNameList.pending,
          getTrackerList.pending,
          getAllTicketsForApproval.pending,
          getAllLookUps.pending,
          rejectTicket.pending,
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
  getAllLookUps,
  rejectTicket,
}

const isLoading = (state: RootState): ApiLoadingState =>
  state.ticketApprovals.isLoading

const departmentNameList = (state: RootState): DepartmentList[] =>
  state.ticketApprovals.departmentNameList

const departmentCategoryList = (state: RootState): DepartmentCategoryList[] =>
  state.ticketApprovals.departmentCategoryList

const subCategoryList = (state: RootState): SubCategoryList[] =>
  state.ticketApprovals.subCategoryList

const trackerList = (state: RootState): TrackerList[] =>
  state.ticketApprovals.trackerList

const allLookUps = (state: RootState): GetAllLookUps[] =>
  state.ticketApprovals.getAllLookUps

const selectTicketId = (state: RootState): number =>
  state.ticketApprovals.selectedTicketId

const toggleValue = (state: RootState): string =>
  state.ticketApprovals.toggleValue

const routePath = (state: RootState): string => state.ticketApprovals.routePath

const ticketsForApproval = (
  state: RootState,
): GetAllTicketsForApprovalResponse => state.ticketApprovals.ticketsForApproval

const ticketApprovalsSelectors = {
  departmentNameList,
  departmentCategoryList,
  subCategoryList,
  trackerList,
  ticketsForApproval,
  isLoading,
  allLookUps,
  selectTicketId,
  toggleValue,
  routePath,
}

export const ticketApprovalsService = {
  ...ticketApprovalsThunk,
  actions: ticketApprovalsSlice.actions,
  selectors: ticketApprovalsSelectors,
}

export default ticketApprovalsSlice.reducer
