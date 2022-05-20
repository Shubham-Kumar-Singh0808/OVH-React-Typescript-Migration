import { AppDispatch, RootState } from '../../../stateStore'
import {
  EditFamilyDetailsState,
  EditVisaDetailsState,
  EmployeeFamilyData,
  EmployeeFamilyDetails,
  EmployeeVisaDetails,
  GetCountryDetails,
  PersonalInfoTabState,
  VisaCountryDetails,
  VisaDetails,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  fetchVisaCountryDetailsApiCall,
  getAddNewFamilyMemberApiCall,
  getAddNewVisaMemberApiCall,
  getCountryDetailsApiCall,
  getDeleteNewFamilyMemberApiCall,
  getDeleteVisaDetailsApiCall,
  getFamilyDetailsApiCall,
  getFamilyInformationByFamilyIdApiCall,
  getUpdateNewFamilyMemberApiCall,
  getUpdateNewVisaMemberApiCall,
  getVisaDetailsApiCall,
  getVisaInformationByVisaIdApiCall,
} from '../../../middleware/api/MyProfile/PersonalInfoTab/PersonalInfoApi'

import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
const initialPersonalInfoTabState: PersonalInfoTabState = {
  getFamilyDetails: [],
  getVisaDetails: [],
  SubCountries: {} as GetCountryDetails,
  SubVisa: [],
  editFamilyDetails: {} as EditFamilyDetailsState,
  editVisaDetails: {} as EditVisaDetailsState,
  isLoading: false,
  error: 0,
}

export const doFetchFamilyDetails = createAsyncThunk<
  EmployeeFamilyData[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'personalInfoTab/doFetchFamilyDetails',
  async (employeeId: number | string, thunkApi) => {
    try {
      return await getFamilyDetailsApiCall(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
export const doFetchVisaDetails = createAsyncThunk<
  VisaDetails[] | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'personalInfoTab/doFetchVisaDetails',
  async (employeeId: string | number, thunkApi) => {
    try {
      return await getVisaDetailsApiCall(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
export const doFetchCountryDetails = createAsyncThunk<
  GetCountryDetails | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('personalInfoTab/doFetchCountryDetails', async (_, thunkApi) => {
  try {
    return await getCountryDetailsApiCall()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})
export const doFetchCountryVisaDetails = createAsyncThunk<
  VisaCountryDetails[] | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'personalInfoTab/doFetchCountryVisaDetails',
  async (countryId: string | number, thunkApi) => {
    try {
      return await fetchVisaCountryDetailsApiCall(countryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
export const doAddNewVisaDetails = createAsyncThunk<
  number | undefined,
  EmployeeVisaDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'addEditFamilyDetails/doAddNewVisaDetails',
  async (employeeVisaDetails: EmployeeVisaDetails, thunkApi) => {
    try {
      return await getAddNewVisaMemberApiCall(employeeVisaDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const doEditNewFamilyMember = createAsyncThunk<
  EditFamilyDetailsState | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'personalInfoTab/doEditNewFamilyMember',
  async (familyId: number, thunkApi) => {
    try {
      return await getFamilyInformationByFamilyIdApiCall(familyId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
export const doUpdateFamilyDetails = createAsyncThunk<
  number | undefined,
  EmployeeFamilyDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'personalInfoTab/doUpdateFamilyDetails',
  async (employeeFamily: EmployeeFamilyDetails, thunkApi) => {
    try {
      return await getUpdateNewFamilyMemberApiCall(employeeFamily)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
export const doAddNewFamilyMember = createAsyncThunk<
  number | undefined,
  EmployeeFamilyDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'personalInfoTab/doAddNewFamilyMember',
  async (employeeFamily: EmployeeFamilyDetails, thunkApi) => {
    try {
      return await getAddNewFamilyMemberApiCall(employeeFamily)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
export const doEditNewVisaMember = createAsyncThunk<
  EditVisaDetailsState | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('personalInfoTab/doEditNewVisaMember', async (id: number, thunkApi) => {
  try {
    return await getVisaInformationByVisaIdApiCall(id)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})
export const doUpdateVisaDetails = createAsyncThunk<
  number | undefined,
  EmployeeVisaDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'personalInfoTab/doUpdateVisaDetails',
  async (employeeVisaDetails: EmployeeVisaDetails, thunkApi) => {
    try {
      return await getUpdateNewVisaMemberApiCall(employeeVisaDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
export const doDeleteFamilyMember = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('personalInfoTab/doDeleteFamilyMember', async (familyId, thunkApi) => {
  try {
    return await getDeleteNewFamilyMemberApiCall(familyId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})
export const doDeleteVisaDetails = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('personalInfoTab/doDeleteVisaDetails', async (visaId, thunkApi) => {
  try {
    return await getDeleteVisaDetailsApiCall(visaId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
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
        state.getFamilyDetails = action.payload as EmployeeFamilyData[]
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
      .addCase(doAddNewVisaDetails.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(doEditNewFamilyMember.fulfilled, (state, action) => {
        state.isLoading = false
        state.editFamilyDetails =
          action.payload as unknown as EditFamilyDetailsState
      })
      .addCase(doUpdateFamilyDetails.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(doUpdateVisaDetails.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(doAddNewFamilyMember.fulfilled, (state) => {
        state.isLoading = false
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
        isAnyOf(doUpdateVisaDetails.fulfilled, doUpdateVisaDetails.fulfilled),
        (state) => {
          state.isLoading = false
        },
      )
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
          state.error = action.payload as ValidationError
        },
      )
      .addMatcher(
        isAnyOf(doFetchCountryDetails.rejected, doFetchCountryDetails.rejected),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload as ValidationError
        },
      )
  },
})
export const selectGetFamilyDetails = (
  state: RootState,
): EmployeeFamilyData[] => state.personalInfoDetails.getFamilyDetails
export const selectGetVisaDetails = (state: RootState): VisaDetails[] =>
  state.personalInfoDetails.getVisaDetails
export default personalInfoTabSlice.reducer
