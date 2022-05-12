import { AppDispatch, RootState } from '../../../stateStore'
import {
  FamilyDetails,
  VisaDetails,
  PersonalInfoTabState,
  GetCountryDetails,
  VisaCountryDetails,
  EmployeeVisaDetails,
  EditFamilyDetailsState,
  EmployeeFamilyDetails,
  EditVisaDetailsState,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationErrorType } from '../../../types/commonTypes'
import {
  fetchFamilyDetailsApiCall,
  fetchVisaDetailsApiCall,
  fetchCountryDetailsApiCall,
  fetchVisaCountryDetailsApiCall,
  getAddNewVisaMemberApiCall,
  getFamilyInformationByFamilyIdApiCall,
  getUpdateNewFamilyMemberApiCall,
  getAddNewFamilyMember,
  getVisaInformationByVisaIdApiCall,
  getUpdateNewVisaMemberApiCall,
  getDeleteNewFamilyMember,
  getDeleteVisaDetailsApiCall,
} from '../../../middleware/api/MyProfile/PersonalInfoTab/PersonalInfoApi'
const initialPersonalInfoTabState = {} as PersonalInfoTabState
export const doFetchFamilyDetails = createAsyncThunk<
  FamilyDetails[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'personalInfoTab/doFetchFamilyDetails',
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
  VisaDetails[] | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'personalInfoTab/doFetchVisaDetails',
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
  GetCountryDetails | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>('personalInfoTab/doFetchCountryDetails', async (_, thunkApi) => {
  try {
    return await fetchCountryDetailsApiCall()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationErrorType)
  }
})
export const doFetchCountryVisaDetails = createAsyncThunk<
  VisaCountryDetails[] | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'personalInfoTab/doFetchCountryVisaDetails',
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
  EmployeeVisaDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'personalInfoTab/doAddNewVisaDetails',
  async (employeeVisaDetails: EmployeeVisaDetails, thunkApi) => {
    try {
      return await getAddNewVisaMemberApiCall(employeeVisaDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)
export const doEditNewFamilyMember = createAsyncThunk<
  EditFamilyDetailsState | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'personalInfoTab/doEditNewFamilyMember',
  async (familyId: number, thunkApi) => {
    try {
      return await getFamilyInformationByFamilyIdApiCall(familyId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)
export const doUpdateFamilyDetails = createAsyncThunk<
  number | undefined,
  EmployeeFamilyDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'personalInfoTab/doUpdateFamilyDetails',
  async (employeeFamily: EmployeeFamilyDetails, thunkApi) => {
    try {
      return await getUpdateNewFamilyMemberApiCall(employeeFamily)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)
export const doAddNewFamilyMember = createAsyncThunk<
  number | undefined,
  EmployeeFamilyDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'personalInfoTab/doAddNewFamilyMember',
  async (employeeFamily: EmployeeFamilyDetails, thunkApi) => {
    try {
      return await getAddNewFamilyMember(employeeFamily)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)
export const doEditNewVisaMember = createAsyncThunk<
  EditVisaDetailsState | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>('personalInfoTab/doEditNewVisaMember', async (id: number, thunkApi) => {
  try {
    return await getVisaInformationByVisaIdApiCall(id)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationErrorType)
  }
})
export const doUpdateVisaDetails = createAsyncThunk<
  number | undefined,
  EmployeeVisaDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'personalInfoTab/doUpdateVisaDetails',
  async (employeeVisaDetails: EmployeeVisaDetails, thunkApi) => {
    try {
      return await getUpdateNewVisaMemberApiCall(employeeVisaDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)
export const doDeleteFamilyMember = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>('personalInfoTab/doDeleteFamilyMember', async (familyId, thunkApi) => {
  try {
    return await getDeleteNewFamilyMember(familyId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationErrorType)
  }
})
export const doDeleteVisaDetails = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>('personalInfoTab/doDeleteVisaDetails', async (visaId, thunkApi) => {
  try {
    return await getDeleteVisaDetailsApiCall(visaId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationErrorType)
  }
})

const personalInfoTabSlice = createSlice({
  name: 'personalInfoTab',
  initialState: initialPersonalInfoTabState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(doFetchFamilyDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.getFamilyDetails = action.payload as FamilyDetails[]
      })
      .addCase(doFetchVisaDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.getVisaDetails = action.payload as VisaDetails[]
      })
      .addCase(doFetchCountryDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.SubCountries = action.payload as GetCountryDetails
      })
      .addCase(doFetchCountryVisaDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.SubVisa = action.payload as VisaCountryDetails[]
      })
      .addCase(doAddNewVisaDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.addVisaDetails = action.payload as unknown as EmployeeVisaDetails
      })
      .addCase(doEditNewFamilyMember.fulfilled, (state, action) => {
        state.isLoading = false
        state.editFamilyDetails =
          action.payload as unknown as EditFamilyDetailsState
      })
      .addCase(doUpdateFamilyDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.addFamilyState =
          action.payload as unknown as EmployeeFamilyDetails
      })
      .addCase(doUpdateVisaDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.addVisaDetails = action.payload as unknown as EmployeeVisaDetails
      })
      .addCase(doAddNewFamilyMember.fulfilled, (state, action) => {
        state.isLoading = false
        state.addFamilyState =
          action.payload as unknown as EmployeeFamilyDetails
      })
      .addCase(doEditNewVisaMember.fulfilled, (state, action) => {
        state.isLoading = false
        state.editVisaDetails =
          action.payload as unknown as EditVisaDetailsState
      })
      .addCase(doDeleteFamilyMember.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(doDeleteVisaDetails.fulfilled, (state) => {
        state.isLoading = false
      })
      .addMatcher(
        isAnyOf(doFetchFamilyDetails.pending, doFetchVisaDetails.pending),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          doFetchCountryDetails.pending,
          doFetchCountryDetails.pending,
          doFetchCountryVisaDetails.pending,
        ),
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
export default personalInfoTabSlice.reducer
