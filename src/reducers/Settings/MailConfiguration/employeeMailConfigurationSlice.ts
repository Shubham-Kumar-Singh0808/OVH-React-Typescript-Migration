import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import {
  EmployeeGetMailTemplate,
  EmployeeGetEmailTemplateProps,
  EmployeeGetMailTemplateTypes,
  EmployeeMailConfigurationState,
} from '../../../types/Settings/MailConfiguration/employeeMailConfigurationTypes'
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

const getEmployeeMailTemplate = createAsyncThunk(
  'mailConfiguration/getEmployeeEmailTemplate',
  async (props: EmployeeGetEmailTemplateProps, thunkApi) => {
    try {
      return await employeeMailConfigurationApi.getEmployeeMailTemplate(props)
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
  reducers: {
    clearEmployeeEmailTemplate: (state) => {
      state.employeeGetEmailTemplate = []
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getEmployeeMailTemplateTypes.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.employeeGetMailTemplateTypes =
        action.payload as EmployeeGetMailTemplateTypes[]
    })
    builder.addCase(getEmployeeMailTemplate.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.employeeGetEmailTemplate =
        action.payload as EmployeeGetMailTemplate[]
    })
    builder.addCase(getEmployeeMailTemplateTypes.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
  },
})

const employeeMailTemplateTypes = (
  state: RootState,
): EmployeeGetMailTemplateTypes[] =>
  state.employeeMailConfiguration.employeeGetMailTemplateTypes

const employeeMailTemplate = (state: RootState): EmployeeGetMailTemplate[] =>
  state.employeeMailConfiguration.employeeGetEmailTemplate

const employeeMailConfigurationThunk = {
  getEmployeeMailTemplateTypes,
  getEmployeeMailTemplate,
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
