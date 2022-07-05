import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeGetEmailTemplate,
  EmployeeMailconfigurationState,
} from '../../../types/Settings/MailConfiguration/employeemailConfigurationTypes'
import { ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import employeeMailConfigurationApi from '../../../middleware/api/Settings/MailConfiguration/employeeMailConfigurationApi'

const getEmployeeMailTemplateTypes = createAsyncThunk(
  'mailConfiguration/getEmployeeMailTemplateTypes',
  async (_, thunkApi) => {
    try {
      return await employeeMailConfigurationApi.getEmployeeMailTemplateTypes()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialMailconfigurationState: EmployeeMailconfigurationState = {
  employeeGetEmailTemplate: [],
  isLoading: ApiLoadingState.idle,
  employeegetMailTemplateTypes: [],
  error: null,
}

const employeeMailConfigurationSlice = createSlice({
  name: 'mailConfiguration',
  initialState: initialMailconfigurationState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getEmployeeMailTemplateTypes.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
    })
    builder.addCase(getEmployeeMailTemplateTypes.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
  },
})
const employeeMailTemplateTypes = (
  state: RootState,
): EmployeeGetEmailTemplate[] =>
  state.employeeMailConfiguration.employeeGetEmailTemplate

const employeeMailConfigurationThunk = {
  getEmployeeMailTemplateTypes,
}
const employeeMailConfigurationSelectors = {
  employeeMailTemplateTypes,
}
export const employeeMailConfigurationService = {
  ...employeeMailConfigurationThunk,
  actions: employeeMailConfigurationSlice.actions,
  selectors: employeeMailConfigurationSelectors,
}
export default employeeMailConfigurationSlice.reducer
