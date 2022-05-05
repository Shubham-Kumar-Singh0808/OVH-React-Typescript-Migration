import { AppDispatch, RootState } from '../../../stateStore'
import {
  FamilyDetailsModal,
  VisaDetailsModal,
  PersonalInfoTabStateType,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationErrorType } from '../../../types/commonTypes'
import {
  fetchFamilyDetailsApiCall,
  fetchVisaDetailsApiCall,
} from '../../../middleware/api/MyProfile/PersonalInfoTab/PersonalInfoApi'
const initialPersonalInfoTabState = {} as PersonalInfoTabStateType
export const doFetchFamilyDetails = createAsyncThunk<
  FamilyDetailsModal[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'familyDetailsTable/doFetchFamilyDetails',
  async (employeeId: number | string, thunkApi) => {
    try {
      return await fetchFamilyDetailsApiCall(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)
export const doFetchVisaDetails = createAsyncThunk<
  VisaDetailsModal[] | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'familyDetailsTable/doFetchFamilyDetails',
  async (employeeId: string | number, thunkApi) => {
    try {
      return await fetchVisaDetailsApiCall(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)
const familyDetailsTableSlice = createSlice({
  name: 'familyDetailsTable',
  initialState: initialPersonalInfoTabState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(doFetchFamilyDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doFetchFamilyDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.getFamilyDetails = action.payload as FamilyDetailsModal[]
      })
      .addCase(doFetchFamilyDetails.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ValidationErrorType
      })
      .addCase(doFetchVisaDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doFetchVisaDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.getVisaDetails = action.payload as VisaDetailsModal[]
      })
      .addCase(doFetchVisaDetails.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ValidationErrorType
      })
  },
})
export default familyDetailsTableSlice.reducer
