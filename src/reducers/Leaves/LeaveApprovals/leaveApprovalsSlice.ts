import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import moment from 'moment'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import LeaveApprovalsApi from '../../../middleware/api/Leaves/LeaveApprovals/leaveApprovalsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  AllEmployeesLeavesList,
  EmployeeSummary,
  GetEmployeeLeavesProps,
  GetSearchEmployeesProps,
  LeaveApprovalsSliceState,
} from '../../../types/Leaves/LeaveApprovals/leaveApprovalsTypes'
import { EmployeeDetailsWithAttendanceReport as EmployeeDetails } from '../../../types/TimeAndAttendance/AttendanceReport/attendanceReportTypes'

const getEmployees = createAsyncThunk(
  'leaveApprovals/getEmployees',
  async (employeeId: string, thunkApi) => {
    try {
      return await LeaveApprovalsApi.getEmployees(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeLeaves = createAsyncThunk(
  'leaveApprovals/getEmployeeLeaves',
  async (props: GetEmployeeLeavesProps, thunkApi) => {
    try {
      return await LeaveApprovalsApi.getEmployeeLeaves(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getSearchEmployees = createAsyncThunk(
  'leaveApprovals/getSearchEmployees',
  async (props: GetSearchEmployeesProps, thunkApi) => {
    try {
      return await LeaveApprovalsApi.getSearchEmployees(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const checkProjectManagerExists = createAsyncThunk(
  'leaveApprovals/checkProjectManagerExists',
  async (leaveId: number, thunkApi) => {
    try {
      return await LeaveApprovalsApi.checkProjectManagerExists(leaveId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const leaveApprove = createAsyncThunk(
  'leaveApprovals/leaveApprove',
  async (props: { leaveId: number; comments: string }, thunkApi) => {
    try {
      return await LeaveApprovalsApi.leaveApprove(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const leaveReject = createAsyncThunk(
  'leaveApprovals/leaveReject',
  async (props: { leaveId: number }, thunkApi) => {
    try {
      return await LeaveApprovalsApi.leaveReject(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const commonFormatDate = 'l'
const currentYear = new Date().getFullYear()
const previousMonthResult = new Date(
  Number(currentYear),
  Number(new Date().getMonth() - 1),
  Number(25),
)
const currentMonthResult = new Date(
  Number(currentYear),
  Number(new Date().getMonth()),
  Number(24),
)

const initialScheduledInterviewsSliceState: LeaveApprovalsSliceState = {
  getEmployees: [],
  employeeLeaves: { allEmpLeavesList: [], employeeSummary: [], size: 0 },
  searchEmployeeLeaves: { leaveSummary: [], searchLeaves: [], size: 0 },
  isLoading: ApiLoadingState.idle,
  filterOptions: {
    isViewBtnClick: false,
    selectStatus: 'PendingApproval',
    selectMember: null,
    filterByFromDate: moment(previousMonthResult).format(commonFormatDate),
    filterByToDate: moment(currentMonthResult).format(commonFormatDate),
  },
}

const leaveApprovalsSlice = createSlice({
  name: 'leaveApprovals',
  initialState: initialScheduledInterviewsSliceState,
  reducers: {
    setIsViewBtnClick: (state, action) => {
      state.filterOptions.isViewBtnClick = action.payload
    },
    setSelectStatus: (state, action) => {
      state.filterOptions.selectStatus = action.payload
    },
    setSelectMember: (state, action) => {
      state.filterOptions.selectMember = action.payload
    },
    setFilterByFromDate: (state, action) => {
      state.filterOptions.filterByFromDate = action.payload
    },
    setFilterByToDate: (state, action) => {
      state.filterOptions.filterByToDate = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getEmployees = action.payload
      })
      .addCase(getSearchEmployees.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.searchEmployeeLeaves = action.payload
      })
      .addMatcher(
        isAnyOf(
          getEmployees.pending,
          getEmployeeLeaves.pending,
          getSearchEmployees.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          checkProjectManagerExists.fulfilled,
          leaveApprove.fulfilled,
          leaveReject.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(isAnyOf(getEmployeeLeaves.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeLeaves = action.payload
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.leaveApprovals.isLoading

const getEmployeesForAutoComplete = (state: RootState): EmployeeDetails[] =>
  state.leaveApprovals.getEmployees

const listSize = (state: RootState): number =>
  state.leaveApprovals.employeeLeaves.size

const employeeSummary = (state: RootState): EmployeeSummary[] =>
  state.leaveApprovals.employeeLeaves.employeeSummary

const allEmployeesLeavesList = (state: RootState): AllEmployeesLeavesList[] =>
  state.leaveApprovals.employeeLeaves.allEmpLeavesList

const leaveSummary = (state: RootState): EmployeeSummary[] =>
  state.leaveApprovals.searchEmployeeLeaves.leaveSummary

const searchLeaves = (state: RootState): AllEmployeesLeavesList[] =>
  state.leaveApprovals.searchEmployeeLeaves.searchLeaves

const searchLeavesListSize = (state: RootState): number =>
  state.leaveApprovals.searchEmployeeLeaves.size

const isViewBtnClick = (state: RootState): boolean =>
  state.leaveApprovals.filterOptions.isViewBtnClick
const selectStatus = (state: RootState): string =>
  state.leaveApprovals.filterOptions.selectStatus
const selectMember = (state: RootState): number | null =>
  state.leaveApprovals.filterOptions.selectMember
const filterByFromDate = (state: RootState): string =>
  state.leaveApprovals.filterOptions.filterByFromDate
const filterByToDate = (state: RootState): string =>
  state.leaveApprovals.filterOptions.filterByToDate

const leaveApprovalsThunk = {
  getEmployees,
  getEmployeeLeaves,
  getSearchEmployees,
  checkProjectManagerExists,
  leaveApprove,
  leaveReject,
}

const leaveApprovalsSelectors = {
  isLoading,
  getEmployeesForAutoComplete,
  listSize,
  employeeSummary,
  allEmployeesLeavesList,
  leaveSummary,
  searchLeaves,
  searchLeavesListSize,
  isViewBtnClick,
  selectStatus,
  selectMember,
  filterByFromDate,
  filterByToDate,
}

export const leaveApprovalsService = {
  ...leaveApprovalsThunk,
  actions: leaveApprovalsSlice.actions,
  selectors: leaveApprovalsSelectors,
}

export default leaveApprovalsSlice.reducer
