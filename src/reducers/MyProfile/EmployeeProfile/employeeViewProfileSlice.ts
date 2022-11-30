/* eslint-disable sonarjs/no-identical-functions */
// TODO remove eslint and fix error
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  EmployeeGeneralInformation,
  EmployeeGeneralInformationState,
} from '../../../types/MyProfile/GeneralTab/generalInformationTypes'
import { RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import employeeGeneralInformationApi from '../../../middleware/api/MyProfile/GeneralTab/generalInformationApi'
import employeeProfileViewInformationApi from '../../../middleware/api/MyProfile/EmployeeProfileView/employeeProfileApi'

const initialGeneralInformationState = {} as EmployeeGeneralInformationState

const getEmployeeViewProfile = createAsyncThunk<
  { generalInformation: EmployeeGeneralInformation } | undefined,
  string,
  { rejectValue: ValidationError }
>(
  'getEmployeeViewProfile/getEmployeeGeneralInformation',
  async (employeeId: string, thunkApi) => {
    try {
      return await employeeProfileViewInformationApi.getEmployeeViewProfile(
        employeeId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getSelectedEmployeeInformation = createAsyncThunk<
  { generalInformation: EmployeeGeneralInformation } | undefined,
  string,
  { rejectValue: ValidationError }
>(
  'getLoggedInEmployeeData/getSelectedEmployeeInformation',
  async (employeeId: string, thunkApi) => {
    try {
      return await employeeGeneralInformationApi.getEmployeeGeneralInformation(
        employeeId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeGeneralInformationSlice = createSlice({
  name: 'getLoggedInEmployeeData',
  initialState: initialGeneralInformationState,
  reducers: {
    setEmployeeGeneralInformation: (state, action) => {
      return { ...state, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeGeneralInformation.fulfilled, (state, action) => {
        state.generalInformation = action.payload as EmployeeGeneralInformation
        state.isLoading = false
      })
      .addCase(getSelectedEmployeeInformation.fulfilled, (state, action) => {
        state.selectedEmployeeInformation =
          action.payload as EmployeeGeneralInformation
        state.isLoading = false
      })
      .addMatcher(
        isAnyOf(
          getEmployeeGeneralInformation.pending,
          getSelectedEmployeeInformation.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeGeneralInformation.rejected,
          getSelectedEmployeeInformation.rejected,
        ),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload as ValidationError
        },
      )
  },
})
export const { setEmployeeGeneralInformation, clearError } =
  employeeGeneralInformationSlice.actions

const selectLoggedInEmployeeData = (
  state: RootState,
  isViewingAnotherEmployee = false,
): EmployeeGeneralInformation =>
  isViewingAnotherEmployee
    ? state.getLoggedInEmployeeData.selectedEmployeeInformation
    : state.getLoggedInEmployeeData.generalInformation

const generalInformation = (state: RootState): EmployeeGeneralInformation =>
  state.getLoggedInEmployeeData.generalInformation

export const getEmployeeGeneralInformationThunk = {
  getEmployeeGeneralInformation,
  getSelectedEmployeeInformation,
}

export const loggedInEmployeeSelectors = {
  selectLoggedInEmployeeData,
  generalInformation,
}
export const generalInformationService = {
  ...getEmployeeGeneralInformationThunk,
  actions: employeeGeneralInformationSlice.actions,
  selectors: loggedInEmployeeSelectors,
}

export default employeeGeneralInformationSlice.reducer
