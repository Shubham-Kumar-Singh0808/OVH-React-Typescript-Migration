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

const getAllEmployeeQualifications = createAsyncThunk<
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
      return await qualificationsApi.getEmployeeQualifications(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllEmployeeSkills = createAsyncThunk<
  EmployeeSkills[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeQualifications/getAllEmployeeSkills', async (_, thunkApi) => {
  try {
    return await qualificationsApi.getEmployeeSkills()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const postQualificationDetails = createAsyncThunk<
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
      return await qualificationsApi.saveInitialEmployeeQualifications(
        addQualification,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateQualificationDetails = createAsyncThunk<
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
      return await qualificationsApi.updateEmployeeQualifications(
        addQualification,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllEmployeePgAndGraduationItems = createAsyncThunk<
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
      return await qualificationsApi.getPgLookUpAndGraduationLookUpListItems()
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
const selectIsQualificationListLoading = (state: RootState): boolean =>
  state.qualificationCategory.isLoading

const selectEmployeeQualification = (
  state: RootState,
): EmployeeQualifications =>
  state.employeeQualificationsDetails.qualificationDetails

export const selectEmployeeId = (state: RootState): string | number =>
  state.authentication.authenticatedUser.employeeId

export const qualificationsThunk = {
  getAllEmployeePgAndGraduationItems,
  getAllEmployeeQualifications,
  getAllEmployeeSkills,
  updateQualificationDetails,
  postQualificationDetails,
}

export const qualificationActions = employeeQualificationsSlice.actions

export const qualificationSelectors = {
  selectIsQualificationListLoading,
  selectEmployeeQualification,
  selectEmployeeId,
}
export default employeeQualificationsSlice.reducer
