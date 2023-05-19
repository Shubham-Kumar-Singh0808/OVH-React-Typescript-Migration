import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import LeaveSummaryApi from '../../../middleware/api/Leaves/LeaveSummary/LeaveSummaryApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  EmployeeLeaveSummarySliceState,
  LeaveHistory,
  LeaveHistoryApiProps,
  LeaveSummary,
} from '../../../types/Leaves/LeaveSummary/employeeLeaveSummaryTypes'

const getEmployeeLeaveSummary = createAsyncThunk(
  'leaveSummary/getEmployeeLeaveSummary',
  async (_, thunkApi) => {
    try {
      return await LeaveSummaryApi.getEmployeeLeaveSummary()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeLeaveHistory = createAsyncThunk(
  'leaveSummary/getEmployeeLeaveHistory',
  async (props: LeaveHistoryApiProps, thunkApi) => {
    try {
      return await LeaveSummaryApi.getEmployeeLeaveHistory(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const cancelEmployeeLeave = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('leaveSummary/cancelEmployeeLeave', async (leaveId, thunkApi) => {
  try {
    return await LeaveSummaryApi.cancelEmployeeLeave(leaveId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const cancelAfterApproval = createAsyncThunk(
  'leaveSummary/cancelAfterApproval',
  async (leaveId: number, thunkApi) => {
    try {
      return await LeaveSummaryApi.cancelAfterApproval(leaveId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialLeaveSummaryState: EmployeeLeaveSummarySliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  employeeLeaveHistory: [],
  list: 0,
  employeeLeaveSummary: {} as LeaveSummary,
}

const leaveSummarySlice = createSlice({
  name: 'leaveSummary',
  initialState: initialLeaveSummaryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeLeaveHistory.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeLeaveHistory = action.payload.list
        state.list = action.payload.size
      })
      .addCase(cancelEmployeeLeave.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addCase(cancelEmployeeLeave.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
      .addCase(getEmployeeLeaveSummary.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeLeaveSummary = action.payload
      })
      .addMatcher(
        isAnyOf(
          getEmployeeLeaveSummary.pending,
          getEmployeeLeaveHistory.pending,
          cancelEmployeeLeave.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const employeeLeaveSummary = (state: RootState): LeaveSummary =>
  state.employeeLeaveSummary.employeeLeaveSummary

const employeeLeaveHistory = (state: RootState): LeaveHistory[] =>
  state.employeeLeaveSummary.employeeLeaveHistory

const listSize = (state: RootState): number => state.employeeLeaveSummary.list

const isLoading = (state: RootState): LoadingState =>
  state.employeeLeaveSummary.isLoading

const leaveSummaryThunk = {
  getEmployeeLeaveSummary,
  getEmployeeLeaveHistory,
  cancelEmployeeLeave,
  cancelAfterApproval,
}

const leaveSummarySelectors = {
  employeeLeaveSummary,
  employeeLeaveHistory,
  listSize,
  isLoading,
}

export const leaveSummaryService = {
  ...leaveSummaryThunk,
  actions: leaveSummarySlice.actions,
  selectors: leaveSummarySelectors,
}

export default leaveSummarySlice.reducer
