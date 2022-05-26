import { AppDispatch, RootState } from '../../../../stateStore'
import {
  EmployeeQualificationDetails,
  EmployeeQualifications,
  PostGraduationAndGraduationList,
} from '../../../../types/MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationError } from '../../../../types/commonTypes'
import employeeQualificationsApi from '../../../../middleware/api/MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationsApi'

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
      return await employeeQualificationsApi.getEmployeeQualifications(
        employeeId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

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
      return await employeeQualificationsApi.addEmployeeQualifications(
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
      return await employeeQualificationsApi.updateEmployeeQualifications(
        addQualification,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getPgLookUpAndGraduationLookUpItems = createAsyncThunk<
  PostGraduationAndGraduationList | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/getPgLookUpAndGraduationLookUpItems',
  async (_, thunkApi) => {
    try {
      return await employeeQualificationsApi.getPgLookUpAndGraduationLookUpItems()
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
      .addCase(
        getPgLookUpAndGraduationLookUpItems.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.pgLookUpAndGraduationLookUpDetails =
            action.payload as PostGraduationAndGraduationList
        },
      )
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
          getPgLookUpAndGraduationLookUpItems.rejected,
          getEmployeeQualifications.rejected,
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

export const qualificationsThunk = {
  getPgLookUpAndGraduationLookUpItems,
  getEmployeeQualifications,
  updateEmployeeQualifications,
  addEmployeeQualifications,
}

export const qualificationActions = employeeQualificationsSlice.actions

export const qualificationSelectors = {
  selectIsQualificationListLoading,
  selectEmployeeQualification,
}
export default employeeQualificationsSlice.reducer
