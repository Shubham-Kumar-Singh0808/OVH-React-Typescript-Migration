import { AxiosError } from 'axios'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../../../stateStore'
import {
  EmployeeDesignation,
  EmployeeDesignationReportApiProps,
  Designation,
  EmployeeDesignationReportState,
} from '../../../../types/EmployeeDirectory/EmployeeReport/EmployeeDesignationReport/employeeDesignationReportTypes'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import employeeReportDesignationAPI from '../../../../middleware/api/EmployeeDirectory/EmployeeReport/EmployeeDesignationReport/employeeDesignationReportApi'

const getDesignations = createAsyncThunk<
  Designation[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeDesignationReport/getDesignations', async (_, thunkApi) => {
  try {
    return await employeeReportDesignationAPI.getDesignations()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getEmployeeDesignationReport = createAsyncThunk(
  'employeeDesignationReport/getEmployeeDesignationReport',
  async (props: EmployeeDesignationReportApiProps, thunkApi) => {
    try {
      return await employeeReportDesignationAPI.getEmployeeDesignationReport(
        props,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialEmployeeDesignationReportState: EmployeeDesignationReportState = {
  getAllDesignation: [],
  selectedDesignation: '',
  empDesignation: [],
  listSize: 0,
  isLoading: ApiLoadingState.idle,
  error: null,
}

const employeeDesignationReportSlice = createSlice({
  name: 'employeeDesignationReport',
  initialState: initialEmployeeDesignationReportState,
  reducers: {
    changeSelectedDesignation: (state, action) => {
      state.selectedDesignation = action.payload as string
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDesignations.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getAllDesignation = action.payload as Designation[]
      })
      .addMatcher(isAnyOf(getDesignations.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getDesignations.rejected), (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
      .addMatcher(isAnyOf(getEmployeeDesignationReport.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(
        isAnyOf(getEmployeeDesignationReport.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.empDesignation = action.payload.emps as EmployeeDesignation[]
          state.listSize = action.payload.Empsize
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.employeeDesignationReport.isLoading
const designations = (state: RootState): Designation[] =>
  state.employeeDesignationReport.getAllDesignation
const selectedDesignation = (state: RootState): string =>
  state.employeeDesignationReport.selectedDesignation
const listSize = (state: RootState): number =>
  state.employeeDesignationReport.listSize
const employeeDesignationReport = (state: RootState): EmployeeDesignation[] =>
  state.employeeDesignationReport.empDesignation

export const employeeDesignationReportThunk = {
  getDesignations,
  getEmployeeDesignationReport,
}

export const employeeDesignationReportSelectors = {
  isLoading,
  designations,
  selectedDesignation,
  listSize,
  employeeDesignationReport,
}

export const employeeDesigationReportService = {
  ...employeeDesignationReportThunk,
  actions: employeeDesignationReportSlice.actions,
  selectors: employeeDesignationReportSelectors,
}

export default employeeDesignationReportSlice.reducer
