import {
  EmployeeGeneralInformationDataModel,
  EmployeeGeneralInformationStateType,
} from '../../../types/MyProfile/GeneralTab/generalInformationTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { postEmployeeGeneralInformation } from '../../../middleware/api/MyProfile/GeneralTab/generalInformationApi'
import { ValidationError } from '../../../types/commonTypes'
import { RootState } from '../../../stateStore'

const initialGeneralInformationState = {} as EmployeeGeneralInformationStateType

export const doFetchEmployeeGeneralInformation = createAsyncThunk<
  { generalInformation: EmployeeGeneralInformationDataModel } | undefined,
  number,
  { rejectValue: ValidationError }
>(
  'getLoggedInEmployeeData/doFetchEmployeeGeneralInformation',
  async (employeeId: number, thunkApi) => {
    try {
      return await postEmployeeGeneralInformation(employeeId)
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
      .addCase(doFetchEmployeeGeneralInformation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doFetchEmployeeGeneralInformation.fulfilled, (state, action) => {
        return { ...state, ...action.payload, isLoading: false }
      })
      .addCase(doFetchEmployeeGeneralInformation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ValidationError
      })
  },
})
export const { setEmployeeGeneralInformation, clearError } =
  employeeGeneralInformationSlice.actions

export const selectLoggedInData = (
  state: RootState,
): EmployeeGeneralInformationStateType => state.getLoggedInEmployeeData

export default employeeGeneralInformationSlice.reducer
