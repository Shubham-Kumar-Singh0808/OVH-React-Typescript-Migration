import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import weeklyTimeInOfficeApi from '../../middleware/api/Dashboard/weeklyTimeInOfficeApi'
import { AppDispatch, RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  EmployeeTimeInOfficeSliceState,
  TimeInOffice,
} from '../../types/Dashboard/TimeInOffice/weeklyTimeInOfficeTypes'

const getEmployeeTimeInOffice = createAsyncThunk<
  TimeInOffice[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('timeInOffice/getEmployeeTimeInOffice', async (_, thunkApi) => {
  try {
    return await weeklyTimeInOfficeApi.getEmployeeTimeInOffice()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialTimeInOfficesState: EmployeeTimeInOfficeSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  timeInOffice: [],
}

const weeklyTimeInOfficeSlice = createSlice({
  name: 'earnedLeaves',
  initialState: initialTimeInOfficesState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeTimeInOffice.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.timeInOffice = action.payload as TimeInOffice[]
      })
      .addCase(getEmployeeTimeInOffice.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const weeklyTimeInOfficeThunk = {
  getEmployeeTimeInOffice,
}

const isLoading = (state: RootState): LoadingState =>
  state.weeklyTimeInOffice.isLoading

const timeInOffice = (state: RootState): TimeInOffice[] =>
  state.weeklyTimeInOffice.timeInOffice

const weeklyTimeInOfficeSelectors = {
  isLoading,
  timeInOffice,
}

export const earnedLeavesService = {
  ...weeklyTimeInOfficeThunk,
  actions: weeklyTimeInOfficeSlice.actions,
  selectors: weeklyTimeInOfficeSelectors,
}

export default weeklyTimeInOfficeSlice.reducer
