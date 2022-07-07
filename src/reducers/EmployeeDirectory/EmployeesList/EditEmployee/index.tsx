/* eslint-disable sonarjs/no-identical-functions */
// TODO remove eslint and fix error
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import employeeGeneralInformationApi from '../../../../middleware/api/EmployeeDirectory/EmployeesList/EditEmployee'
import { AppDispatch, RootState } from '../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import {
  EditEmployeeTypes,
  EditEmployeeState,
} from '../../../../types/EmployeeDirectory/EmployeesList/EditEmployee'

const initialEmployeeState = {
  isLoading: ApiLoadingState.idle,
} as EditEmployeeState
// const initialEmployeeState: EditEmployeeState = {
//   listSize: 0,
//   isLoading: ApiLoadingState.idle,
// }

const getSelectedEmployeeInformation = createAsyncThunk<
  EditEmployeeTypes | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'getEmployeeData/getSelectedEmployeeInformation',
  async (employeeId: string, thunkApi) => {
    try {
      return await employeeGeneralInformationApi.getEmployeeGeneralInformation(
        employeeId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeSlice = createSlice({
  name: 'employeeReducer',
  initialState: initialEmployeeState,
  reducers: {
    setEmployee: (state, action) => {
      return { ...state, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSelectedEmployeeInformation.fulfilled, (state, action) => {
        state.editEmployee = action.payload as EditEmployeeTypes
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(isAnyOf(getSelectedEmployeeInformation.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(
        isAnyOf(getSelectedEmployeeInformation.rejected),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})
export const { setEmployee, clearError } = employeeSlice.actions

const selectEmployeeData = (state: RootState): EditEmployeeTypes =>
  state.employee.editEmployee
const isLoading = (state: RootState): LoadingState => state.employee.isLoading

export const getEmployeeThunk = {
  getSelectedEmployeeInformation,
}

export const employeeSelectors = {
  selectEmployeeData,
  isLoading,
}
export const employeeService = {
  ...getEmployeeThunk,
  actions: employeeSlice.actions,
  selectors: employeeSelectors,
}

export default employeeSlice.reducer
