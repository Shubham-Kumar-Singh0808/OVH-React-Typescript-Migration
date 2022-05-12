import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeCertifications,
  EmployeeQualificationDetails,
  EmployeeQualifications,
  EmployeeSkills,
  PostGraduationAndGraduationList,
} from '../../../types/MyProfile/Qualifications/qualificationTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  fetchEmployeeCertifications,
  fetchEmployeeQualifications,
  fetchEmployeeSkills,
  fetchPgLookUpAndGraduationLookUpListItems,
  saveEmployeeQualifications,
  updateEmployeeQualifications,
} from '../../../middleware/api/MyProfile/Qualifications/qualificationsApi'

import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'

const initialQualificationState = {} as EmployeeQualificationDetails

export const getEmployeeQualifications = createAsyncThunk<
  EmployeeQualifications | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/getEmployeeQualifications',
  async (employeeId: string | number, thunkApi) => {
    try {
      return await fetchEmployeeQualifications(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const getEmployeeCertifications = createAsyncThunk<
  EmployeeCertifications[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeQualifications/getEmployeeCertifications', async (_, thunkApi) => {
  try {
    return await fetchEmployeeCertifications()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

export const getEmployeeSkills = createAsyncThunk<
  EmployeeSkills[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeQualifications/getEmployeeSkills', async (_, thunkApi) => {
  try {
    return await fetchEmployeeSkills()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

export const postQualificationDetails = createAsyncThunk<
  EmployeeQualifications | undefined,
  EmployeeQualifications,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/postQualificationDetails',
  async (addQualification: EmployeeQualifications, thunkApi) => {
    try {
      return await saveEmployeeQualifications(addQualification)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const updateQualificationDetails = createAsyncThunk<
  EmployeeQualifications | undefined,
  EmployeeQualifications,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/updateQualificationDetails',
  async (addQualification: EmployeeQualifications, thunkApi) => {
    try {
      return await updateEmployeeQualifications(addQualification)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const getEmployeePgAndGraduationItems = createAsyncThunk<
  PostGraduationAndGraduationList | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/getEmployeePgAndGraduationItems',
  async (_, thunkApi) => {
    try {
      return await fetchPgLookUpAndGraduationLookUpListItems()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeQualificationsSlice = createSlice({
  name: 'employeeQualifications',
  initialState: initialQualificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeQualifications.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEmployeeQualifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.qualificationDetails = action.payload as EmployeeQualifications
      })
      .addCase(getEmployeeCertifications.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEmployeeCertifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.certificationDetails = action.payload as EmployeeCertifications[]
      })
      .addCase(getEmployeeSkills.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEmployeeSkills.fulfilled, (state, action) => {
        state.isLoading = false
        state.skillDetails = action.payload as EmployeeSkills[]
      })
      .addCase(getEmployeePgAndGraduationItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEmployeePgAndGraduationItems.fulfilled, (state, action) => {
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
