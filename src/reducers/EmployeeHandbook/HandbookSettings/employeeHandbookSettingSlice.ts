import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import employeeHandbookSettingsApi from '../../../middleware/api/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsApi'
import {
  EmployeeHandbook,
  EmployeeHandbookListApiProps,
  EmployeeHandbookSettingSliceState,
} from '../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'

const getEmployeeHandbooks = createAsyncThunk(
  'employeeHandbookSettings/getEmployeeHandbooks',
  async (props: EmployeeHandbookListApiProps, thunkApi) => {
    try {
      return await employeeHandbookSettingsApi.getEmployeeHandbooks(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialEmployeeHandbookSettingState: EmployeeHandbookSettingSliceState = {
  listSize: 0,
  isLoading: ApiLoadingState.idle,
  employeeHandbooks: [],
}

const employeeHandbookSettingSlice = createSlice({
  name: 'employeeHandbookSettings',
  initialState: initialEmployeeHandbookSettingState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getEmployeeHandbooks.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getEmployeeHandbooks.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeHandbooks = action.payload.list as EmployeeHandbook[]
        state.listSize = action.payload.size
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.employeeHandbookSettings.isLoading

const employeeHandbooks = (state: RootState): EmployeeHandbook[] =>
  state.employeeHandbookSettings.employeeHandbooks

const listSize = (state: RootState): number =>
  state.employeeHandbookSettings.listSize

const employeeHandbookSettingsThunk = {
  getEmployeeHandbooks,
}

const employeeHandbookSettingSelectors = {
  isLoading,
  employeeHandbooks,
  listSize,
}

export const employeeHandbookSettingService = {
  ...employeeHandbookSettingsThunk,
  actions: employeeHandbookSettingSlice.actions,
  selectors: employeeHandbookSettingSelectors,
}

export default employeeHandbookSettingSlice.reducer
