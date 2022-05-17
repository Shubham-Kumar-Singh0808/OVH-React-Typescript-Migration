import {
  EmployeeGeneralInformation,
  EmployeeGeneralInformationState,
} from '../../../types/MyProfile/GeneralTab/generalInformationTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import { getEmployeeGeneralInformationApi } from '../../../middleware/api/MyProfile/GeneralTab/generalInformationApi'

const initialGeneralInformationState = {} as EmployeeGeneralInformationState

export const getEmployeeGeneralInformation = createAsyncThunk<
  { generalInformation: EmployeeGeneralInformation } | undefined,
  string,
  { rejectValue: ValidationError }
>(
  'getLoggedInEmployeeData/getEmployeeGeneralInformation',
  async (employeeId: string, thunkApi) => {
    try {
      return await getEmployeeGeneralInformationApi(employeeId)
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
      .addCase(getEmployeeGeneralInformation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEmployeeGeneralInformation.fulfilled, (state, action) => {
        state.generalInformation = action.payload as EmployeeGeneralInformation
        state.isLoading = false
      })
      .addCase(getEmployeeGeneralInformation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ValidationError
      })
  },
})
export const { setEmployeeGeneralInformation, clearError } =
  employeeGeneralInformationSlice.actions

export const selectLoggedInData = (
  state: RootState,
): EmployeeGeneralInformation =>
  state.getLoggedInEmployeeData.generalInformation

export default employeeGeneralInformationSlice.reducer
