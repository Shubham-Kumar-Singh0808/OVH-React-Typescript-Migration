import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import myAttendanceApi from '../../../middleware/api/TimeAndAttendance/MyAttendance/myAttendanceApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  EmployeeAttendance,
  GetMyAttendanceProps,
  MyAttendanceSliceState,
} from '../../../types/TimeAndAttendance/MyAttendance/myAttendanceTypes'

const getMyAttendance = createAsyncThunk(
  'timeInOfficeReport/getTimeInOfficeEmployeeReport',
  async (props: GetMyAttendanceProps, thunkApi) => {
    try {
      return await myAttendanceApi.getMyAttendance(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialMyAttendanceSliceState: MyAttendanceSliceState = {
  employeeAttendance: [],
  isLoading: ApiLoadingState.idle,
}

const myAttendanceSlice = createSlice({
  name: 'myAttendance',
  initialState: initialMyAttendanceSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyAttendance.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeAttendance = action.payload
      })
      .addMatcher(isAnyOf(getMyAttendance.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.myAttendance.isLoading
const employeeAttendance = (state: RootState): EmployeeAttendance =>
  state.myAttendance.employeeAttendance

const myAttendanceThunk = {
  getMyAttendance,
}

const myAttendanceSelectors = {
  isLoading,
  employeeAttendance,
}

export const myAttendanceService = {
  ...myAttendanceThunk,
  actions: myAttendanceSlice.actions,
  selectors: myAttendanceSelectors,
}

export default myAttendanceSlice.reducer
