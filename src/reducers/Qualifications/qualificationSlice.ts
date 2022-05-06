import { AppDispatch, RootState } from '../../stateStore'
import {
  EmployeeCertifications,
  EmployeeQualificationModel,
  EmployeeQualifications,
  EmployeeSkills,
} from '../../../src/types/Qualifications/qualificationTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationErrorType } from '../../types/commonTypes'
import {
  fetchEmployeeCertifications,
  fetchEmployeeQualifications,
  fetchEmployeeSkills,
} from '../../middleware/api/Qualifications/qualificationsApi'

const initialQualificationState = {} as EmployeeQualificationModel

export const doFetchQualifications = createAsyncThunk<
  EmployeeQualifications | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'employeeQualifications/doFetchQualifications',
  async (employeeId: string | number, thunkApi) => {
    try {
      return await fetchEmployeeQualifications(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)

export const doFetchCertifications = createAsyncThunk<
  EmployeeCertifications[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>('employeeQualifications/doFetchCertifications', async (_, thunkApi) => {
  try {
    return await fetchEmployeeCertifications()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationErrorType)
  }
})

export const doFetchSkills = createAsyncThunk<
  EmployeeSkills[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>('employeeQualifications/doFetchSkills', async (_, thunkApi) => {
  try {
    return await fetchEmployeeSkills()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationErrorType)
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
        state.SkillDetails = action.payload as EmployeeSkills[]
      })
  },
})
export default employeeQualificationsSlice.reducer
