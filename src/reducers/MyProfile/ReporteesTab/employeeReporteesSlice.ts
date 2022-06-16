import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeReportees,
  ReporteesState,
  EmployeeReporteesKRAs,
  EmployeeReporteeskpis,
} from '../../../types/MyProfile/ReporteesTab/employeeReporteesType'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import employeeReporteesApi from '../../../middleware/api/MyProfile/ReporteesTab/employeeReporteesApi'

const initialEmployeeReporteesState: ReporteesState = {
  employeeReportees: [],
  employeeReporteesKRAs: [],
  employeeReporteeskpis: [],
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

const getEmployeeReporteesKRAs = createAsyncThunk<
  EmployeeReporteesKRAs[] | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeReportees/getEmployeeReporteesKRAs',
  async (personId: string | number, thunkApi) => {
    try {
      return await employeeReporteesApi.getEmployeeReporteesKRAs(personId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeReporteeskpis = createAsyncThunk<
  EmployeeReporteeskpis[] | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeReportees/getEmployeeReporteeskpis',
  async (kraId: string | number, thunkApi) => {
    try {
      return await employeeReporteesApi.getEmployeeReporteeskpis(kraId)
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
    builder.addCase(getEmployeeReporteesKRAs.fulfilled, (state, action) => {
      state.isLoading = false
      state.employeeReporteesKRAs = action.payload as EmployeeReporteesKRAs[]
    })
    builder.addCase(getEmployeeReporteeskpis.fulfilled, (state, action) => {
      state.isLoading = false
      state.employeeReporteeskpis = action.payload as EmployeeReporteeskpis[]
    })
    builder.addCase(getEmployeeReportees.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getEmployeeReporteesKRAs.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getEmployeeReportees.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as ValidationError
    })
    builder.addCase(getEmployeeReporteesKRAs.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as ValidationError
    })
  },
})
const employeeReportees = (state: RootState): EmployeeReportees[] =>
  state.employeeReportees.employeeReportees

const employeeReporteesKRAs = (state: RootState): EmployeeReporteesKRAs[] =>
  state.employeeReportees.employeeReporteesKRAs

const employeeReporteeskpis = (state: RootState): EmployeeReporteeskpis[] =>
  state.employeeReportees.employeeReporteeskpis

const employeeReporteesThunk = {
  getEmployeeReportees,
  getEmployeeReporteesKRAs,
  getEmployeeReporteeskpis,
}
const employeeReporteesSelectors = {
  employeeReportees,
  employeeReporteesKRAs,
  employeeReporteeskpis,
}
export const employeeReporteesService = {
  ...employeeReporteesThunk,
  actions: employeeReporteesSlice.actions,
  selectors: employeeReporteesSelectors,
}
export default employeeReporteesSlice.reducer
