import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeSaveLeaveCalenderSetting,
  LeaveSettingsState,
  EmployeeLeaveCategory,
  EmployeeAddUpdateLeaveCategory,
} from '../../../types/Settings/LeaveSettings/employeeLeaveCalenderTypes'
import { ValidationError } from '../../../types/commonTypes'
import employeeLeaveSettingsApi from '../../../middleware/api/Settings/LeaveSettings/employeeLeaveSettingsApi'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const initialEmployeeLeaveSettingsState: LeaveSettingsState = {
  employeeSaveLeaveCalender: {} as EmployeeSaveLeaveCalenderSetting,
  employeeAddLeaveCategories: {} as EmployeeAddUpdateLeaveCategory,
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

const addEmployeeLeaveCategory = createAsyncThunk<
  number | undefined,
  EmployeeAddUpdateLeaveCategory,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'leaveSettings/addEmployeeLeaveCategory',
  async (employeeLeaveCategory: EmployeeAddUpdateLeaveCategory, thunkApi) => {
    try {
      return await employeeLeaveSettingsApi.addEmployeeLeaveCategory(
        employeeLeaveCategory,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateEmployeeLeaveCategory = createAsyncThunk<
  number | undefined,
  EmployeeAddUpdateLeaveCategory,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'leaveSettings/updateEmployeeLeaveCategory',
  async (employeeLeaveCategory: EmployeeAddUpdateLeaveCategory, thunkApi) => {
    try {
      return await employeeLeaveSettingsApi.updateEmployeeLeaveCategory(
        employeeLeaveCategory,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeLeaveSettingsSlice = createSlice({
  name: 'leaveSettings',
  initialState: initialEmployeeLeaveSettingsState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeLeaveCalenderSettings.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeSaveLeaveCalender =
          action.payload as EmployeeSaveLeaveCalenderSetting
      })
      .addMatcher(
        isAnyOf(getEmployeeLeaveCategories.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.employeeLeaveCategories =
            action.payload as EmployeeLeaveCategory[]
        },
      )
      .addMatcher(
        isAnyOf(
          deleteEmployeeLeaveCategory.fulfilled,
          addEmployeeLeaveCategory.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
  },
})

const employeeLeaveCategories = (state: RootState): EmployeeLeaveCategory[] =>
  state.employeeLeaveSettings.employeeLeaveCategories

const getEmployeeLeaveCalender = (
  state: RootState,
): EmployeeSaveLeaveCalenderSetting =>
  state.employeeLeaveSettings.employeeSaveLeaveCalender

const employeeLeaveSettingsThunk = {
  saveEmployeeLeaveCalenderSettings,
  getEmployeeLeaveCategories,
  getEmployeeLeaveCalenderSettings,
  deleteEmployeeLeaveCategory,
  addManufacturerList: addEmployeeLeaveCategory,
  updateEmployeeLeaveCategory,
}

const employeeLeaveSettingsSelectors = {
  employeeLeaveCategories,
  getEmployeeLeaveCalender,
}

export const employeeLeaveSettingsService = {
  ...employeeLeaveSettingsThunk,
  actions: employeeLeaveSettingsSlice.actions,
  selectors: employeeLeaveSettingsSelectors,
}
export default employeeLeaveSettingsSlice.reducer
