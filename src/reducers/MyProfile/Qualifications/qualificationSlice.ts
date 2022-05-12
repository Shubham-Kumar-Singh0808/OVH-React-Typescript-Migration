import { AppDispatch, RootState } from '../../../stateStore'
import {
  CertificationDetailsType,
  EmployeeQualificationStateType,
  EmployeeQualificationsType,
  SkillDetailsType,
} from '../../../types/MyProfile/Qualifications/qualificationTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import {
  fetchEmployeeCertifications,
  fetchEmployeeQualifications,
  fetchEmployeeSkills,
} from '../../../middleware/api/MyProfile/Qualifications/qualificationsApi'

const initialQualificationState = {} as EmployeeQualificationStateType

export const doFetchQualifications = createAsyncThunk<
  EmployeeQualificationsType | undefined,
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
  CertificationDetailsType[] | undefined,
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
  SkillDetailsType[] | undefined,
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
        state.qualificationDetails =
          action.payload as EmployeeQualificationsType
      })
      .addCase(doFetchCertifications.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doFetchCertifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.certificationDetails =
          action.payload as CertificationDetailsType[]
      })
      .addCase(doFetchSkills.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doFetchSkills.fulfilled, (state, action) => {
        state.isLoading = false
        state.SkillDetails = action.payload as SkillDetailsType[]
      })
  },
})
export default employeeQualificationsSlice.reducer
