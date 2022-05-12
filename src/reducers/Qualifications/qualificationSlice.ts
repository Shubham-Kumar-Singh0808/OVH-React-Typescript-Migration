import { AppDispatch, RootState } from '../../stateStore'
import {
  EmployeeCertifications,
  EmployeeQualificationDetails,
  EmployeeQualifications,
  EmployeeSkills,
  PostGraduationAndGraduationList,
} from '../../types/MyProfile/Qualifications/qualificationTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationError } from '../../types/commonTypes'
import {
  fetchEmployeeCertifications,
  fetchEmployeeQualifications,
  fetchEmployeeSkills,
  fetchPgLookUpAndGraduationLookUpListItems,
  saveEmployeeQualifications,
  updateEmployeeQualifications,
} from '../../middleware/api/MyProfile/Qualifications/qualificationsApi'

const initialQualificationState = {} as EmployeeQualificationDetails

export const doFetchQualifications = createAsyncThunk<
  EmployeeQualifications | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/doFetchQualifications',
  async (employeeId: string | number, thunkApi) => {
    try {
      return await fetchEmployeeQualifications(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const doFetchCertifications = createAsyncThunk<
  EmployeeCertifications[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeQualifications/doFetchCertifications', async (_, thunkApi) => {
  try {
    return await fetchEmployeeCertifications()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

export const doFetchSkills = createAsyncThunk<
  EmployeeSkills[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeQualifications/doFetchSkills', async (_, thunkApi) => {
  try {
    return await fetchEmployeeSkills()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

export const postQualificationDetails = createAsyncThunk<
  EmployeeQualifications | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeQualifications/postQualificationDetails', async (_, thunkApi) => {
  try {
    return await saveEmployeeQualifications()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

export const updateQualificationDetails = createAsyncThunk<
  EmployeeQualifications | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeQualifications/updateQualificationDetails', async (_, thunkApi) => {
  try {
    return await updateEmployeeQualifications()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

export const doFetchPgAndGraduationItems = createAsyncThunk<
  PostGraduationAndGraduationList | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeQualifications/doFetchPgAndGraduationItems', async (_, thunkApi) => {
  try {
    return await fetchPgLookUpAndGraduationLookUpListItems()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const employeeQualificationsSlice = createSlice({
  name: 'employeeQualifications',
  initialState: initialQualificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(doFetchQualifications.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doFetchQualifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.qualificationDetails = action.payload as EmployeeQualifications
      })
      .addCase(doFetchCertifications.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doFetchCertifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.certificationDetails = action.payload as EmployeeCertifications[]
      })
      .addCase(doFetchSkills.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doFetchSkills.fulfilled, (state, action) => {
        state.isLoading = false
        state.skillDetails = action.payload as EmployeeSkills[]
      })
      .addCase(doFetchPgAndGraduationItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doFetchPgAndGraduationItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.pgLookUpAndGraduationLookUpDetails =
          action.payload as PostGraduationAndGraduationList
      })
      .addCase(postQualificationDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postQualificationDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.qualificationDetails = action.payload as EmployeeQualifications
      })
      .addCase(updateQualificationDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateQualificationDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.qualificationDetails = action.payload as EmployeeQualifications
      })
  },
})
export const selectEmployeeQualification = (
  state: RootState,
): EmployeeQualifications =>
  state.employeeQualificationsDetails.qualificationDetails

export const selectEmployeeId = (state: RootState): string | number =>
  state.authentication.authenticatedUser.employeeId
export default employeeQualificationsSlice.reducer
