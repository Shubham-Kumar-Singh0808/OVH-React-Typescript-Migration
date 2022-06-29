import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  AddEmployee,
  AddNewEmployeeState,
} from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { AppDispatch, RootState } from '../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import addNewEmployeeAPi from '../../../../middleware/api/EmployeeDirectory/EmployeesList/AddNewEmployee'

const addNewEmployee = createAsyncThunk<
  AddEmployee | undefined,
  AddEmployee,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('newEmployee/addNewEmployee', async (payload: AddEmployee, thunkApi) => {
  try {
    return await addNewEmployeeAPi.addNewEmployeeApi.addNewEmployee(payload)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialEmployeeState = {} as AddNewEmployeeState
const addNewEmployeeSlice = createSlice({
  name: 'addNewEmployee',
  initialState: initialEmployeeState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewEmployee.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(addNewEmployee.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.addEmployee = action.payload as AddEmployee
      })
      .addCase(addNewEmployee.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.newEmployee.isLoading

const employeeThunk = {
  addNewEmployee,
}

const employeeSelectors = {
  isLoading,
}

export const addEmployeeService = {
  ...employeeThunk,
  actions: addNewEmployeeSlice.actions,
  selectors: employeeSelectors,
}

export default addNewEmployeeSlice.reducer
