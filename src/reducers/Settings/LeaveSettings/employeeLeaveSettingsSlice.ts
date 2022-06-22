import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeSaveLeaveCalenderTypes,
  LeaveSettingsState,
} from '../../../types/Settings/LeaveSettings/employeeLeaveCalenderTypes'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import employeeLeaveSettingsApi from '../../../middleware/api/Settings/LeaveSettings/employeeLeaveSettingsApi'

const initialemployeeLeaveSettingsState: LeaveSettingsState = {
  employeeLeaveCalender: {} as EmployeeSaveLeaveCalenderTypes,
  isLoading: false,
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
const employeeLeaveSettingsSlice = createSlice({
  name: 'leaveSettings',
  initialState: initialemployeeLeaveSettingsState,
  reducers: {},

  //   extraReducers: (builder) => {
  //     builder.addCase(saveEmployeeLeaveSettings.fulfilled, (state, action) => {
  //       state.isLoading = false
  //       state.employeeLeaveCalender = action.payload as EmployeeLeaveCalenderTypes
  //     })
  //   },
})

export const leaveSettingsThunk = {
  employeeLeaveCalenderSettings,
}

export const leaveSettingsService = {
  ...leaveSettingsThunk,
  actions: employeeLeaveSettingsSlice.actions,
}
export default employeeLeaveSettingsSlice.reducer
