import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import employeeProvisionPeriodApi from '../../middleware/api/Dashboard/employeeProvisionPeriodApi'
import { RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  EmployeeProvisionPeriodSliceState,
  ProvisionDetails,
  provisionPeriodApiProps,
} from '../../types/Dashboard/ProbationaryEndDates/provisionPeriodTypes'

const getEmployeesUnderProbationPeriod = createAsyncThunk(
  'provisionPeriod/getEmployeesUnderProbationPeriod',
  async (props: provisionPeriodApiProps, thunkApi) => {
    try {
      return await employeeProvisionPeriodApi.getEmployeesUnderProbationPeriod(
        props,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialProvisionPeriodState: EmployeeProvisionPeriodSliceState = {
  listSize: 0,
  isLoading: ApiLoadingState.idle,
  error: null,
  upcomingProbationList: [],
}

const provisionPeriodSlice = createSlice({
  name: 'provisionPeriod',
  initialState: initialProvisionPeriodState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeesUnderProbationPeriod.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getEmployeesUnderProbationPeriod.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.upcomingProbationList = action.payload.list
        state.listSize = action.payload.size
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.probationPeriod.isLoading

const employeesUnderProbationPeriod = (state: RootState): ProvisionDetails[] =>
  state.probationPeriod.upcomingProbationList

const listSize = (state: RootState): number => state.probationPeriod.listSize

const provisionPeriodThunk = {
  getEmployeesUnderProbationPeriod,
}

const provisionPeriodSelectors = {
  isLoading,
  listSize,
  employeesUnderProbationPeriod,
}

export const provisionPeriodService = {
  ...provisionPeriodThunk,
  actions: provisionPeriodSlice.actions,
  selectors: provisionPeriodSelectors,
}

export default provisionPeriodSlice.reducer
