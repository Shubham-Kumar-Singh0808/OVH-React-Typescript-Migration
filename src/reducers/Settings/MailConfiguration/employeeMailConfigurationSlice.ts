import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import {
  EmployeeGetEmailTemplate,
  EmployeeGetEmailTemplateProps,
  EmployeeGetMailTemplateTypes,
  EmployeeMailconfigurationState as EmployeeMailConfigurationState,
} from '../../../types/Settings/MailConfiguration/employeemailConfigurationTypes'
import { ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import employeeMailConfigurationApi from '../../../middleware/api/Settings/MailConfiguration/employeeMailConfigurationApi'

const getMailTemplateTypes = createAsyncThunk(
  'mailConfiguration/getEmployeeMailTemplateTypes',
  async (_, thunkApi) => {
    try {
      return await employeeMailConfigurationApi.getMailTemplateTypes()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeEmailTemplate = createAsyncThunk(
  'mailConfiguration/getEmployeeEmailTemplate',
  async (props: EmployeeGetEmailTemplateProps, thunkApi) => {
    try {
      return await employeeMailConfigurationApi.getEmployeeEmailTemplate(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialMailConfigurationState: EmployeeMailConfigurationState = {
  employeeGetEmailTemplate: [],
  isLoading: ApiLoadingState.idle,
  employeeGetMailTemplateTypes: [],
  error: null,
}

const employeeMailConfigurationSlice = createSlice({
  name: 'mailConfiguration',
  initialState: initialMailConfigurationState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getMailTemplateTypes.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.employeeGetMailTemplateTypes =
        action.payload as EmployeeGetMailTemplateTypes[]
    })
    builder.addCase(getEmployeeEmailTemplate.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.employeeGetEmailTemplate =
        action.payload as EmployeeGetEmailTemplate[]
    })
    builder.addCase(getMailTemplateTypes.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
  },
})

const employeeMailTemplateTypes = (
  state: RootState,
): EmployeeGetMailTemplateTypes[] =>
  state.employeeMailConfiguration.employeeGetMailTemplateTypes

const employeeMailTemplate = (state: RootState): EmployeeGetEmailTemplate[] =>
  state.employeeMailConfiguration.employeeGetEmailTemplate

const employeeMailConfigurationThunk = {
  getMailTemplateTypes,
  getEmployeeEmailTemplate,
}

const employeeMailConfigurationSelectors = {
  employeeMailTemplateTypes,
  employeeMailTemplate,
}

export const employeeMailConfigurationService = {
  ...employeeMailConfigurationThunk,
  actions: employeeMailConfigurationSlice.actions,
  selectors: employeeMailConfigurationSelectors,
}

export default employeeMailConfigurationSlice.reducer
