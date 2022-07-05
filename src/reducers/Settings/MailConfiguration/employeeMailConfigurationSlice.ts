import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeGetEmailTemplate,
  EmployeeGetEmailTemplateProps,
  EmployeeGetMailTemplateTypes,
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

const getEmployeeEmailTemplate = createAsyncThunk(
  'certificateList/getEmployeesCertificates',
  async (props: EmployeeGetEmailTemplateProps, thunkApi) => {
    try {
      return await employeeMailConfigurationApi.getEmployeeEmailTemplate(props)
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
      state.employeegetMailTemplateTypes =
        action.payload as EmployeeGetMailTemplateTypes[]
    })
    builder.addCase(getEmployeeEmailTemplate.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.employeeGetEmailTemplate =
        action.payload as unknown as EmployeeGetEmailTemplate[]
    })
    builder.addCase(getEmployeeMailTemplateTypes.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
  },
})

const employeeMailTemplateTypes = (
  state: RootState,
): EmployeeGetMailTemplateTypes[] =>
  state.employeeMailConfiguration.employeegetMailTemplateTypes

const employeeMailTemplate = (state: RootState): EmployeeGetEmailTemplate[] =>
  state.employeeMailConfiguration.employeeGetEmailTemplate

const employeeMailConfigurationThunk = {
  getEmployeeMailTemplateTypes,
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
