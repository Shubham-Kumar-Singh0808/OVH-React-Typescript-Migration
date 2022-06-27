import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { ApiLoadingState } from '../../middleware/api/apiList'
import employeeHandbookApi from '../../middleware/api/EmployeeHandbook/employeeHandbook'
import { AppDispatch, RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  EmployeeHandbooksState,
  Handbook,
} from '../../types/EmployeeHandbook/employeeHandbookTypes'

const getHandbooks = createAsyncThunk<
  Handbook[] | undefined,
  string | undefined,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeHandbook/getHandbooks', async (_, thunkApi) => {
  try {
    return await employeeHandbookApi.getHandbooks()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialHandbooksState: EmployeeHandbooksState = {
  handbooksList: [],
  isLoading: ApiLoadingState.idle,
  error: null,
}

const employeeHandbookSlice = createSlice({
  name: 'handbooks',
  initialState: initialHandbooksState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHandbooks.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getHandbooks.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.handbooksList = action.payload as Handbook[]
      })
      .addCase(getHandbooks.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState => {
  return state.employeeHandbook.isLoading
}

const handbookData = (state: RootState): Handbook[] => {
  return state.employeeHandbook.handbooksList
}

const employeeHandbookThunk = {
  getHandbooks,
}

const employeeHandbookSelectors = {
  isLoading,
  handbookData,
}

export const EmployeeHandbookService = {
  ...employeeHandbookThunk,
  actions: employeeHandbookSlice.actions,
  selectors: employeeHandbookSelectors,
}

export default employeeHandbookSlice.reducer
