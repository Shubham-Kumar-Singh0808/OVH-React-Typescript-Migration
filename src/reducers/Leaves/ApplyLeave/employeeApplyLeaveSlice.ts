import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeLeaveApply,
  EmployeeLeaveApplyState,
  EmployeeLeaveType,
} from '../../../types/Leaves/ApplyLeave/employeeApplyLeaves'
import { ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import employeeLeaveApplyApi from '../../../middleware/api/Leaves/ApplyLeave/employeeApplyLeaveApi'

const initialEmployeeApplyLeaveState: EmployeeLeaveApplyState = {
  employeeLeaveType: [],
  employeeLeaveApply: {} as EmployeeLeaveApply,
  isLoading: ApiLoadingState.idle,
  error: 0,
}
const getEmployeeLeaveType = createAsyncThunk<
  EmployeeLeaveType[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'leaves/getEmployeeLeaveType',
  async (employeeId: number | string, thunkApi) => {
    try {
      return await employeeLeaveApplyApi.getEmployeeLeaveType(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeApplyLeave = createAsyncThunk<
  number | undefined,
  EmployeeLeaveApply,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'leaves/employeeApplyLeave',
  async (leaveApply: EmployeeLeaveApply, thunkApi) => {
    try {
      return await employeeLeaveApplyApi.employeeApplyLeave(leaveApply)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeLeaveApplySlice = createSlice({
  name: 'leaves',
  initialState: initialEmployeeApplyLeaveState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getEmployeeLeaveType.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.employeeLeaveType = action.payload as EmployeeLeaveType[]
    })
    builder.addCase(getEmployeeLeaveType.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
  },
})

const employeeLeaveType = (state: RootState): EmployeeLeaveType[] =>
  state.employeeLeaveApply.employeeLeaveType

const employeeApplyLeaveThunk = {
  getEmployeeLeaveType,
  employeeApplyLeave,
}

const employeeApplyLeaveSelectors = {
  employeeLeaveType,
}

export const employeeLeaveApplyServices = {
  ...employeeApplyLeaveThunk,
  actions: employeeLeaveApplySlice.actions,
  selectors: employeeApplyLeaveSelectors,
}
export default employeeLeaveApplySlice.reducer
