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

const employeeViewProfileSlice = createSlice({
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
      .addCase(getEmployeeViewProfile.fulfilled, (state, action) => {
        state.generalInformation = action.payload as EmployeeGeneralInformation
        state.isLoading = false
      })

      .addMatcher(isAnyOf(getEmployeeViewProfile.pending), (state) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(getEmployeeViewProfile.rejected), (state, action) => {
        state.isLoading = false
        state.error = action.payload as ValidationError
      })
  },
})
export const { setEmployeeGeneralInformation, clearError } =
  employeeViewProfileSlice.actions

const selectLoggedInEmployeeData = (
  state: RootState,
  isViewingAnotherEmployee = false,
): EmployeeGeneralInformation =>
  isViewingAnotherEmployee
    ? state.employeeProfileView.selectedEmployeeInformation
    : state.employeeProfileView.generalInformation

const generalInformation = (state: RootState): EmployeeGeneralInformation =>
  state.employeeProfileView.generalInformation

export const getEmployeeGeneralInformationThunk = {
  getEmployeeViewProfile,
}

export const loggedInEmployeeSelectors = {
  selectLoggedInEmployeeData,
  generalInformation,
}
export const employeeProfileViewServices = {
  ...getEmployeeGeneralInformationThunk,
  actions: employeeViewProfileSlice.actions,
  selectors: loggedInEmployeeSelectors,
}

export default employeeViewProfileSlice.reducer
