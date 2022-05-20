import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeQualificationDetails,
  EmployeeQualifications,
  EmployeeSkills,
  PostGraduationAndGraduationList,
} from '../../../types/MyProfile/Qualifications/qualificationTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import qualificationsApi from '../../../../src/middleware/api/MyProfile/Qualifications/qualificationsApi'

import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'

const initialQualificationState = {} as EmployeeQualificationDetails

const getEmployeeQualifications = createAsyncThunk<
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
      return await qualificationsApi.getEmployeeQualifications(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeSkills = createAsyncThunk<
  EmployeeSkills[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeQualifications/getEmployeeSkills', async (_, thunkApi) => {
  try {
    return await qualificationsApi.getEmployeeSkills()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const addEmployeeQualifications = createAsyncThunk<
  EmployeeQualifications | undefined,
  EmployeeQualifications,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/addEmployeeQualifications',
  async (addQualification: EmployeeQualifications, thunkApi) => {
    try {
      return await qualificationsApi.saveInitialEmployeeQualifications(
        addQualification,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateEmployeeQualifications = createAsyncThunk<
  EmployeeQualifications | undefined,
  EmployeeQualifications,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/updateEmployeeQualifications',
  async (addQualification: EmployeeQualifications, thunkApi) => {
    try {
      return await qualificationsApi.updateEmployeeQualifications(
        addQualification,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeePgAndGraduationItems = createAsyncThunk<
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
      return await qualificationsApi.getPgLookUpAndGraduationLookUpItems()
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
      .addCase(getEmployeeSkills.fulfilled, (state, action) => {
        state.isLoading = false
        state.skillDetails = action.payload as EmployeeSkills[]
      })
      .addCase(getEmployeePgAndGraduationItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.pgLookUpAndGraduationLookUpDetails =
          action.payload as PostGraduationAndGraduationList
      })
      .addMatcher(
        isAnyOf(
          getEmployeeQualifications.pending,
          updateEmployeeQualifications.pending,
          addEmployeeQualifications.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeQualifications.fulfilled,
          updateEmployeeQualifications.fulfilled,
          addEmployeeQualifications.fulfilled,
        ),
        (state, action) => {
          state.isLoading = false
          state.qualificationDetails = action.payload as EmployeeQualifications
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeePgAndGraduationItems.rejected,
          getEmployeeQualifications.rejected,
          getEmployeeSkills.rejected,
          updateEmployeeQualifications.rejected,
          addEmployeeQualifications.rejected,
        ),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload as ValidationError
        },
      )
  },
})
const selectIsQualificationListLoading = (state: RootState): boolean =>
  state.qualificationCategory.isLoading

const selectEmployeeQualification = (
  state: RootState,
): EmployeeQualifications =>
  state.employeeQualificationsDetails.qualificationDetails

export const selectEmployeeId = (state: RootState): string | number =>
  state.authentication.authenticatedUser.employeeId

export const qualificationsThunk = {
  getEmployeePgAndGraduationItems,
  getEmployeeQualifications,
  getEmployeeSkills,
  updateEmployeeQualifications,
  addEmployeeQualifications,
}

export const qualificationActions = employeeQualificationsSlice.actions

export const qualificationSelectors = {
  selectIsQualificationListLoading,
  selectEmployeeQualification,
  selectEmployeeId,
}
export default employeeQualificationsSlice.reducer
