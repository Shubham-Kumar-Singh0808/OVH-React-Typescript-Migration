import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeSaveLeaveCalenderSetting,
  LeaveSettingsState,
  EmployeeLeaveCategories,
  EmployeeLeaveCalenderTypes,
} from '../../../types/Settings/LeaveSettings/employeeLeaveCalenderTypes'

import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import employeeLeaveSettingsApi from '../../../middleware/api/Settings/LeaveSettings/employeeLeaveSettingsApi'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const initialemployeeLeaveSettingsState: LeaveSettingsState = {
  employeeSaveLeaveCalender: {} as EmployeeSaveLeaveCalenderSetting,
  employeeLeaveCalender: {} as EmployeeLeaveCalenderTypes,
  employeeLeaveCategories: [],
  isLoading: ApiLoadingState.idle,
  error: 0,
}

const getEmployeeLeaveCalenderSettings = createAsyncThunk(
  'leaveSettings/getEmployeeLeaveCalenderSettings',
  async (_, thunkApi) => {
    try {
      return await employeeLeaveSettingsApi.getEmployeeLeaveCalenderSettings()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const saveEmployeeLeaveCalenderSettings = createAsyncThunk<
  number | undefined,
  EmployeeSaveLeaveCalenderSetting,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'leaveSettings/saveEmployeeLeaveCalenderSettings',
  async (employeeLeaveCalender: EmployeeSaveLeaveCalenderSetting, thunkApi) => {
    try {
      return await employeeLeaveSettingsApi.saveEmployeeLeaveCalenderSettings(
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

const deleteEmployeeLeaveCategory = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'leaveSettings/deleteEmployeeLeaveCategory',
  async (leaveCategoryId, thunkApi) => {
    try {
      return await employeeLeaveSettingsApi.deleteEmployeeLeaveCategory(
        leaveCategoryId,
      )
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
    builder
      .addCase(getEmployeeLeaveCalenderSettings.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeLeaveCalender =
          action.payload as EmployeeLeaveCalenderTypes
      })
      .addMatcher(
        isAnyOf(getEmployeeLeaveCategories.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.employeeLeaveCategories =
            action.payload as EmployeeLeaveCategories[]
        },
      )
      .addMatcher(isAnyOf(deleteEmployeeLeaveCategory.fulfilled), (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
  },
})

const leaveCategories = (state: RootState): EmployeeLeaveCategories[] =>
  state.employeeLeaveSettings.employeeLeaveCategories

const getEmployeeLeaveCalender = (
  state: RootState,
): EmployeeLeaveCalenderTypes =>
  state.employeeLeaveSettings.employeeLeaveCalender

const leaveSettingsThunk = {
  saveEmployeeLeaveCalenderSettings,
  getEmployeeLeaveCategories,
  getEmployeeLeaveCalenderSettings,
  deleteEmployeeLeaveCategory,
}

const employeeLeaveSettingsSelectors = {
  leaveCategories,
  getEmployeeLeaveCalender,
}

export const leaveSettingsService = {
  ...leaveSettingsThunk,
  actions: employeeLeaveSettingsSlice.actions,
  selectors: employeeLeaveSettingsSelectors,
}
export default employeeLeaveSettingsSlice.reducer
