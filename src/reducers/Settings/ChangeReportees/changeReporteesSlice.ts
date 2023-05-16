import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import {
  ChangeReporteesSliceState,
  EmployeeData,
  UpdateManager,
} from '../../../types/Settings/ChangeReportees/changeReporteesTypes'
import { ChangeReporteesApi } from '../../../middleware/api/Settings/ChangeReportees/changeReporteesApi'
import { RootState } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const initialEmployeeChangeReporteeState: ChangeReporteesSliceState = {
  AllReportingManagerList: [],
  AllHRList: [],
  EmployeesUnderManager: [],
  EmployeesUnderHRManager: [],
  refreshList: false,
  isLoading: ApiLoadingState.idle,
  currentPage: 0,
  pageSize: 0,
  error: 0,
}

const getAllReportingManagerAsync = createAsyncThunk(
  'ChangeReportees/getAllReportingManager',
  async (_, thunkApi) => {
    try {
      return await ChangeReporteesApi.getAllReportingManager()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllHRListAsync = createAsyncThunk(
  'ChangeReportees/getAllHRList',
  async (_, thunkApi) => {
    try {
      return await ChangeReporteesApi.getAllHRList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllEmployeesUnderManagerAsync = createAsyncThunk(
  'ChangeReportees/getAllEmployeesUnderManagerAsync',
  async (managerId: number, thunkApi) => {
    try {
      return await ChangeReporteesApi.getAllEmployeesUnderManager(managerId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getHrAssociatesUnderHRManagerAsync = createAsyncThunk(
  'ChangeReportees/getHrAssociatesUnderHRManager',
  async (hrId: number, thunkApi) => {
    try {
      return await ChangeReporteesApi.getHrAssociatesUnderHRManager(hrId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateReportingManagerAsync = createAsyncThunk(
  'ChangeReportees/updateReportingManager',
  async (ReportingManagerdata: UpdateManager, thunkApi) => {
    try {
      return await ChangeReporteesApi.updateReportingManager(
        ReportingManagerdata,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateHrAssociatesManagerAsync = createAsyncThunk(
  'changeReportees/updateHrAssociatesManager',
  async (HrAssociatesManagerdata: UpdateManager, thunkApi) => {
    try {
      return await ChangeReporteesApi.updateHrAssociatesManager(
        HrAssociatesManagerdata,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const changeReporteesSlice = createSlice({
  name: 'changeReportees',
  initialState: initialEmployeeChangeReporteeState,
  reducers: {
    clearManagerData: (state) => {
      state.EmployeesUnderManager = []
      state.EmployeesUnderHRManager = []
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllReportingManagerAsync.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.AllReportingManagerList = action.payload as EmployeeData[]
      })
      .addCase(getAllHRListAsync.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.AllHRList = action.payload as EmployeeData[]
      })
      .addCase(getAllEmployeesUnderManagerAsync.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.EmployeesUnderManager = action.payload as EmployeeData[]
      })
      .addCase(
        getHrAssociatesUnderHRManagerAsync.fulfilled,
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.EmployeesUnderHRManager = action.payload as EmployeeData[]
        },
      )
      .addMatcher(
        isAnyOf(
          getAllReportingManagerAsync.fulfilled,
          getAllHRListAsync.fulfilled,
          getAllEmployeesUnderManagerAsync.fulfilled,
          getHrAssociatesUnderHRManagerAsync.fulfilled,
          updateReportingManagerAsync.fulfilled,
          updateHrAssociatesManagerAsync.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getAllReportingManagerAsync.pending,
          getAllHRListAsync.pending,
          getAllEmployeesUnderManagerAsync.pending,
          getHrAssociatesUnderHRManagerAsync.pending,
          updateReportingManagerAsync.pending,
          updateHrAssociatesManagerAsync.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getAllReportingManagerAsync.rejected,
          getAllHRListAsync.rejected,
          getAllEmployeesUnderManagerAsync.rejected,
          getHrAssociatesUnderHRManagerAsync.rejected,
          updateReportingManagerAsync.rejected,
          updateHrAssociatesManagerAsync.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const ReportingManagersDetails = (state: RootState): EmployeeData[] =>
  state.changeReportees.AllReportingManagerList
const HRListDetails = (state: RootState): EmployeeData[] =>
  state.changeReportees.AllHRList

const EmployeesUnderManagerDetails = (state: RootState): EmployeeData[] =>
  state.changeReportees.EmployeesUnderManager

const HrAssociatesUnderHRManager = (state: RootState): EmployeeData[] =>
  state.changeReportees.EmployeesUnderHRManager

const isLoading = (state: RootState): ApiLoadingState =>
  state.changeReportees.isLoading

export const changeReporteesThunk = {
  getAllReportingManagerAsync,
  getAllHRListAsync,
  getAllEmployeesUnderManagerAsync,
  getHrAssociatesUnderHRManagerAsync,
  updateReportingManagerAsync,
  updateHrAssociatesManagerAsync,
}

export const changeReporteesSelectors = {
  ReportingManagersDetails,
  HRListDetails,
  EmployeesUnderManagerDetails,
  HrAssociatesUnderHRManager,
  isLoading,
}

export const changeReporteesService = {
  ...changeReporteesThunk,
  actions: changeReporteesSlice.actions,
  selectors: changeReporteesSelectors,
}

export default changeReporteesSlice.reducer
