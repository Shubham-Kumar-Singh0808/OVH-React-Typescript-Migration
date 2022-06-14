import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeReportees,
  ReporteesState,
} from '../../../types/MyProfile/ReporteesTab/employeeReporteesType'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import employeeReporteesApi from '../../../middleware/api/MyProfile/ReporteesTab/employeeReporteesApi'

const initialEmployeeReporteesState: ReporteesState = {
  employeeReportees: [],
  isLoading: false,
  error: 0,
}

const getEmployeeReportees = createAsyncThunk<
  EmployeeReportees[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeReportees/getEmployeeReportees',
  async (empID: number | string, thunkApi) => {
    try {
      return await employeeReporteesApi.getEmployeeReportees(empID)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeReporteesSlice = createSlice({
  name: 'employeeReportees',
  initialState: initialEmployeeReporteesState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getEmployeeReportees.fulfilled, (state, action) => {
      state.isLoading = false
      state.employeeReportees = action.payload as EmployeeReportees[]
    })
    builder.addCase(getEmployeeReportees.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getEmployeeReportees.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as ValidationError
    })
  },
})
const employeeReportees = (state: RootState): EmployeeReportees[] =>
  state.employeeReportees.employeeReportees

const employeeReporteesThunk = {
  getEmployeeReportees,
}
const employeeReporteesSelectors = {
  employeeReportees,
}
export const employeeReporteesService = {
  ...employeeReporteesThunk,
  actions: employeeReporteesSlice.actions,
  selectors: employeeReporteesSelectors,
}
export default employeeReporteesSlice.reducer
