import {
  AddNewEmployeeState,
  EmployeeDepartment,
} from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { RootState } from '../../../../stateStore'
import addNewEmployeeAPi from '../../../../middleware/api/EmployeeDirectory/EmployeesList/AddNewEmployee'

const getEmployeeDepartments = createAsyncThunk(
  'employeeDepartments/getEmployeeDepartments',
  async (_, thunkApi) => {
    try {
      return await addNewEmployeeAPi.getEmployeeDepartmentsApi.getEmployeeDepartments()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const initialEmployeeDepartmentsState: AddNewEmployeeState = {
  employeeDepartments: [],
  error: null,
  isLoading: ApiLoadingState.idle,
}
const getEmployeeDepartmentsSlice = createSlice({
  name: 'employeeDepartments',
  initialState: initialEmployeeDepartmentsState,
  reducers: {
    clearEmployeeDepartments: (state) => {
      state.employeeDepartments = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeDepartments.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getEmployeeDepartments.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeDepartments = action.payload as EmployeeDepartment[]
      })
      .addCase(getEmployeeDepartments.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.getEmployeeDepartments.isLoading
const employeeDepartments = (state: RootState): EmployeeDepartment[] =>
  state.getEmployeeDepartments.employeeDepartments as EmployeeDepartment[]

const getEmployeeDepartmentsThunk = {
  getEmployeeDepartments,
}

const employeeDepartmentSelectors = {
  isLoading,
  employeeDepartments,
}

export const employeeDepartmentsService = {
  ...getEmployeeDepartmentsThunk,
  actions: getEmployeeDepartmentsSlice.actions,
  selectors: employeeDepartmentSelectors,
}

export default getEmployeeDepartmentsSlice.reducer
