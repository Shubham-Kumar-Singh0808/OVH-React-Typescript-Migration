import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeSaveLeaveCalenderTypes,
  LeaveSettingsState,
  EmployeeLeaveCategories,
} from '../../../types/Settings/LeaveSettings/employeeLeaveCalenderTypes'

import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import employeeLeaveSettingsApi from '../../../middleware/api/Settings/LeaveSettings/employeeLeaveSettingsApi'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const initialemployeeLeaveSettingsState: LeaveSettingsState = {
  employeeLeaveCalender: {} as EmployeeSaveLeaveCalenderTypes,
  employeeLeaveCategories: [],
  isLoading: ApiLoadingState.idle,
  error: 0,
}

const employeeLeaveCalenderSettings = createAsyncThunk<
  number | undefined,
  EmployeeSaveLeaveCalenderTypes,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'leaveSettings/employeeLeaveCalenderSettings',
  async (employeeLeaveCalender: EmployeeSaveLeaveCalenderTypes, thunkApi) => {
    try {
      return await employeeLeaveSettingsApi.employeeLeaveCalenderSettings(
        employeeLeaveCalender,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeLeaveCategories = createAsyncThunk(
  'leaveSettings/getEmployeeLeaveCategories',
  async (_, thunkApi) => {
    try {
      return await employeeLeaveSettingsApi.getEmployeeLeaveCategories()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeLeaveSettingsSlice = createSlice({
  name: 'leaveSettings',
  initialState: initialemployeeLeaveSettingsState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(getEmployeeLeaveCategories.fulfilled),
      (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeLeaveCategories =
          action.payload as EmployeeLeaveCategories[]
      },
    )
  },
})

const leaveCategories = (state: RootState): EmployeeLeaveCategories[] =>
  state.employeeLeaveSettings.employeeLeaveCategories

export const leaveSettingsThunk = {
  employeeLeaveCalenderSettings,
  getEmployeeLeaveCategories,
}

export const employeeLeaveSettingsSelectors = {
  leaveCategories,
}

export const leaveSettingsService = {
  ...leaveSettingsThunk,
  actions: employeeLeaveSettingsSlice.actions,
  selectors: employeeLeaveSettingsSelectors,
}
export default employeeLeaveSettingsSlice.reducer
