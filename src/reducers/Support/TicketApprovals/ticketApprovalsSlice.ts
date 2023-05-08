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

  TicketStatusValue: 'New',
  ApprovalStatusValue: 'Pending Approval',
  DepartmentNameValue: 'All',
  CategoryNameValue: 'All',
  SubCategoryNameValue: 'All',
  DateValue: 'Today',
  TrackerValue: 'All',
  FormDate: '',
  ToDate: '',
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
    clearCategory: (state) => {
      state.departmentCategoryList = []
    },
    clearSubCategory: (state) => {
      state.subCategoryList = []
    },
    setTicketStatusValue: (state, action) => {
      state.TicketStatusValue = action.payload
    },
    setApprovalStatusValue: (state, action) => {
      state.ApprovalStatusValue = action.payload
    },
    setDepartmentNameValue: (state, action) => {
      state.DepartmentNameValue = action.payload
    },

    setCategoryNameValue: (state, action) => {
      state.CategoryNameValue = action.payload
    },

    setSubCategoryNameValue: (state, action) => {
      state.SubCategoryNameValue = action.payload
    },
    setDateValue: (state, action) => {
      state.DateValue = action.payload
    },
    setTrackerValue: (state, action) => {
      state.TrackerValue = action.payload
    },
    setFormDataValue: (state, action) => {
      state.FormDate = action.payload
    },
    setToDateValue: (state, action) => {
      state.ToDate = action.payload
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

const TicketStatusValue = (state: RootState): string =>
  state.ticketApprovals.TicketStatusValue

const ApprovalStatusValue = (state: RootState): string =>
  state.ticketApprovals.ApprovalStatusValue

const DepartmentNameValue = (state: RootState): string | number =>
  state.ticketApprovals.DepartmentNameValue

const CategoryNameValue = (state: RootState): string | number =>
  state.ticketApprovals.CategoryNameValue

const SubCategoryNameValue = (state: RootState): string | number =>
  state.ticketApprovals.SubCategoryNameValue

const DateValue = (state: RootState): string => state.ticketApprovals.DateValue

const TrackerValue = (state: RootState): string | number =>
  state.ticketApprovals.TrackerValue

const FormDateValue = (state: RootState): string | Date =>
  state.ticketApprovals.FormDate

const ToDateValue = (state: RootState): string | Date =>
  state.ticketApprovals.ToDate

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

  TicketStatusValue,
  ApprovalStatusValue,
  DepartmentNameValue,
  CategoryNameValue,
  SubCategoryNameValue,
  DateValue,
  TrackerValue,
  FormDateValue,
  ToDateValue,
}

export const ticketApprovalsService = {
  ...ticketApprovalsThunk,
  actions: ticketApprovalsSlice.actions,
  selectors: ticketApprovalsSelectors,
}

export default ticketApprovalsSlice.reducer
