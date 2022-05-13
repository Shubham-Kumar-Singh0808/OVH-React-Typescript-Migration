import {
  EmployeeGeneralInformation,
  EmployeeGeneralInformationState,
} from '../../../types/MyProfile/GeneralTab/generalInformationTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { getEmployeeGeneralInformation } from '../../../middleware/api/MyProfile/GeneralTab/generalInformationApi'
import { ValidationError } from '../../../types/commonTypes'
import { RootState } from '../../../stateStore'

const initialGeneralInformationState = {} as EmployeeGeneralInformationState

export const fetchEmployeeGeneralInformation = createAsyncThunk<
  { generalInformation: EmployeeGeneralInformation } | undefined,
  string,
  { rejectValue: ValidationError }
>(
  'getLoggedInEmployeeData/fetchEmployeeGeneralInformation',
  async (employeeId: string, thunkApi) => {
    try {
      return await getEmployeeGeneralInformation(employeeId)
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
      .addCase(fetchEmployeeGeneralInformation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchEmployeeGeneralInformation.fulfilled, (state, action) => {
        return { ...state, ...action.payload, isLoading: false }
      })
      .addCase(fetchEmployeeGeneralInformation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ValidationError
      })
  },
})
export const { setEmployeeGeneralInformation, clearError } =
  employeeGeneralInformationSlice.actions

export const selectLoggedInData = (
  state: RootState,
): EmployeeGeneralInformationState => state.getLoggedInEmployeeData

export default employeeGeneralInformationSlice.reducer
