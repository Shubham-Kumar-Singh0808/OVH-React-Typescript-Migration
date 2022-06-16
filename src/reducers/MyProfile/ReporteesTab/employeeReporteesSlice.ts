import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeReportees,
  ReporteesState,
  EmployeeReporteesKRAs,
  EmployeeReporteesKPIs,
} from '../../../types/MyProfile/ReporteesTab/employeeReporteesType'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import employeeReporteesApi from '../../../middleware/api/MyProfile/ReporteesTab/employeeReporteesApi'

const initialEmployeeReporteesState: ReporteesState = {
  employeeReportees: [],
  employeeReporteesKRAs: [],
  employeeReporteesKPIs: [],
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

const getEmployeeReporteesKPIs = createAsyncThunk<
  EmployeeReporteesKPIs[] | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeReportees/getEmployeeReporteesKPIs',
  async (kraId: string | number, thunkApi) => {
    try {
      return await employeeReporteesApi.getEmployeeReporteesKPIs(kraId)
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
    builder.addCase(getEmployeeReporteesKPIs.fulfilled, (state, action) => {
      state.isLoading = false
      state.employeeReporteesKPIs = action.payload as EmployeeReporteesKPIs[]
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

const employeeReporteesKPIs = (state: RootState): EmployeeReporteesKPIs[] =>
  state.employeeReportees.employeeReporteesKPIs

const employeeReporteesThunk = {
  getEmployeeReportees,
  getEmployeeReporteesKRAs,
  getEmployeeReporteesKPIs,
}
const employeeReporteesSelectors = {
  employeeReportees,
  employeeReporteesKRAs,
  employeeReporteesKPIs,
}
export const employeeReporteesService = {
  ...employeeReporteesThunk,
  actions: employeeReporteesSlice.actions,
  selectors: employeeReporteesSelectors,
}
export default employeeReporteesSlice.reducer
