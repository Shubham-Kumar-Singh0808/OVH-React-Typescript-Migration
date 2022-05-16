import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeQualificationDetails,
  EmployeeQualifications,
  EmployeeSkills,
  PostGraduationAndGraduationList,
} from '../../../types/MyProfile/Qualifications/qualificationTypes'
import { EmployeeCertifications } from '../../../types/MyProfile/Qualifications/certificationTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  getEmployeeCertifications,
  getEmployeeQualifications,
  getPgLookUpAndGraduationLookUpListItems,
  getEmployeeSkills,
  saveInitialEmployeeQualifications,
  updateEmployeeQualifications,
} from '../../../middleware/api/MyProfile/Qualifications/qualificationsApi'

import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'

const initialQualificationState = {} as EmployeeQualificationDetails

export const getAllEmployeeQualifications = createAsyncThunk<
  EmployeeQualifications | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/getAllEmployeeQualifications',
  async (employeeId: string | number, thunkApi) => {
    try {
      return await getEmployeeQualifications(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const getAllEmployeeCertifications = createAsyncThunk<
  EmployeeCertifications[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/getAllEmployeeCertifications',
  async (_, thunkApi) => {
    try {
      return await getEmployeeCertifications()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const getAllEmployeeSkills = createAsyncThunk<
  EmployeeSkills[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeQualifications/getEmployeeSkills', async (_, thunkApi) => {
  try {
    return await getEmployeeSkills()
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
      return await saveInitialEmployeeQualifications(addQualification)
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

export const getAllEmployeePgAndGraduationItems = createAsyncThunk<
  PostGraduationAndGraduationList | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/getAllEmployeePgAndGraduationItems',
  async (_, thunkApi) => {
    try {
      return await getPgLookUpAndGraduationLookUpListItems()
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
      .addCase(getAllEmployeeCertifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.certificationDetails = action.payload as EmployeeCertifications[]
      })
      .addCase(getAllEmployeeSkills.fulfilled, (state, action) => {
        state.isLoading = false
        state.skillDetails = action.payload as EmployeeSkills[]
      })
      .addCase(
        getAllEmployeePgAndGraduationItems.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.pgLookUpAndGraduationLookUpDetails =
            action.payload as PostGraduationAndGraduationList
        },
      )
      .addMatcher(
        isAnyOf(
          getAllEmployeeQualifications.pending,
          updateQualificationDetails.pending,
          postQualificationDetails.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          getAllEmployeeQualifications.fulfilled,
          updateQualificationDetails.fulfilled,
          postQualificationDetails.fulfilled,
        ),
        (state, action) => {
          state.isLoading = false
          state.qualificationDetails = action.payload as EmployeeQualifications
        },
      )
      .addMatcher(
        isAnyOf(
          getAllEmployeePgAndGraduationItems.rejected,
          getAllEmployeeQualifications.rejected,
          getAllEmployeeCertifications.rejected,
          getAllEmployeeSkills.rejected,
          updateQualificationDetails.rejected,
          postQualificationDetails.rejected,
        ),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload as ValidationError
        },
      )
  },
})
export const selectIsQualificationListLoading = (state: RootState): boolean =>
  state.qualificationCategory.isLoading
export const selectEmployeeQualification = (
  state: RootState,
): EmployeeQualifications =>
  state.employeeQualificationsDetails.qualificationDetails

export const selectEmployeeId = (state: RootState): string | number =>
  state.authentication.authenticatedUser.employeeId
export default employeeQualificationsSlice.reducer
