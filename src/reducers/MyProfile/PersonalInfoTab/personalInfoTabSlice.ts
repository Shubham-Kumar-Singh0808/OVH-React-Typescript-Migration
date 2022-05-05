import { AppDispatch, RootState } from '../../../stateStore'
import {
  FamilyDetailsModal,
  VisaDetailsModal,
  PersonalInfoTabStateType,
  GetCountryDetailsType,
  VisaCountryDetailsModal,
  VisaDetailsStateModal,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationErrorType } from '../../../types/commonTypes'
import {
  fetchFamilyDetailsApiCall,
  fetchVisaDetailsApiCall,
  fetchCountryDetailsApiCall,
  fetchVisaCountryDetailsApiCall,
  getAddNewFamilyMemberApiCall,
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
  'familyDetailsTable/doFetchVisaDetails',
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
export const doFetchCountryDetails = createAsyncThunk<
  GetCountryDetailsType | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>('familyDetailsTable/doFetchCountryDetails', async (_, thunkApi) => {
  try {
    return await fetchCountryDetailsApiCall()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationErrorType)
  }
})
export const doFetchCountryVisaDetails = createAsyncThunk<
  VisaCountryDetailsModal[] | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'familyDetailsTable/doFetchCountryVisaDetails',
  async (countryId: string | number, thunkApi) => {
    try {
      return await fetchVisaCountryDetailsApiCall(countryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)
export const doAddNewVisaDetails = createAsyncThunk<
  number | undefined,
  VisaDetailsStateModal,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'addEditFamilyDetails/doAddNewVisaDetails',
  async (employeeVisaDetails: VisaDetailsStateModal, thunkApi) => {
    try {
      return await getAddNewFamilyMemberApiCall(employeeVisaDetails)
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
      .addCase(doFetchFamilyDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.getFamilyDetails = action.payload as FamilyDetailsModal[]
      })
      .addCase(doFetchVisaDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.getVisaDetails = action.payload as VisaDetailsModal[]
      })
      .addCase(doFetchCountryDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.SubCountries = action.payload as GetCountryDetailsType
      })
      .addCase(doFetchCountryVisaDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.SubVisa = action.payload as VisaCountryDetailsModal[]
      })
      .addCase(doAddNewVisaDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.addVisaDetails =
          action.payload as unknown as VisaDetailsStateModal
      })

      .addMatcher(
        isAnyOf(doFetchFamilyDetails.pending, doFetchVisaDetails.pending),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(doFetchCountryDetails.pending, doFetchCountryDetails.pending),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(doFetchFamilyDetails.rejected, doFetchVisaDetails.rejected),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload as ValidationErrorType
        },
      )
      .addMatcher(
        isAnyOf(doFetchCountryDetails.rejected, doFetchCountryDetails.rejected),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload as ValidationErrorType
        },
      )
  },
})
export default familyDetailsTableSlice.reducer
