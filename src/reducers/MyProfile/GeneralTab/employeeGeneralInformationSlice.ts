import {
  GeneralInformationDataModel,
  GeneralInformationStateType,
} from '../../../types/MyProfile/GeneralTab/generalInformationTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { postGeneralInformation } from '../../../middleware/api/MyProfile/GeneralTab/generalInformationApi'
import { ValidationErrorType } from '../../../types/commonTypes'

const initialGeneralInformationState = {} as GeneralInformationStateType

export const doFetchEmployeeGeneralInformation = createAsyncThunk<
  { generalInformation: GeneralInformationDataModel } | undefined,
  number,
  { rejectValue: ValidationErrorType }
>(
  'getLoggedInEmployeeData/doFetchEmployeeGeneralInformation',
  async (employeeId: number, thunkApi) => {
    try {
      return await postGeneralInformation(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
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
      .addCase(doFetchEmployeeGeneralInformation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doFetchEmployeeGeneralInformation.fulfilled, (state, action) => {
        return { ...state, ...action.payload, isLoading: false }
      })
      .addCase(doFetchEmployeeGeneralInformation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ValidationErrorType
      })
  },
})
export const { setEmployeeGeneralInformation, clearError } =
  employeeGeneralInformationSlice.actions
export default employeeGeneralInformationSlice.reducer
