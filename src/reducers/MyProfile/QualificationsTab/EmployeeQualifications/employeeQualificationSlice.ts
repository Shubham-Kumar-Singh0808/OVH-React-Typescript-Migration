import { AppDispatch, RootState } from '../../../../stateStore'
import {
  EmployeeQualificationSliceState,
  EmployeeQualifications,
  PostGraduationAndGraduationList,
} from '../../../../types/MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import employeeQualificationsApi from '../../../../middleware/api/MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationsApi'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const initialQualificationState = {} as EmployeeQualificationSliceState

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
          state.isLoading = ApiLoadingState.succeeded
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
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeQualifications.fulfilled,
          updateEmployeeQualifications.fulfilled,
          addEmployeeQualifications.fulfilled,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
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
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.employeeQualificationsDetails.isLoading

const employeeQualifications = (state: RootState): EmployeeQualifications =>
  state.employeeQualificationsDetails.qualificationDetails

export const employeeQualificationsThunk = {
  getPgLookUpAndGraduationLookUpItems,
  getEmployeeQualifications,
  updateEmployeeQualifications,
  addEmployeeQualifications,
}

export const employeeQualificationSelectors = {
  isLoading,
  employeeQualifications,
}

export const employeeQualificationService = {
  ...employeeQualificationsThunk,
  actions: employeeQualificationsSlice.actions,
  selectors: employeeQualificationSelectors,
}
export default employeeQualificationsSlice.reducer
