import {
  AddNewEmployeeState,
  GetAllReportingManagers,
} from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { RootState } from '../../../../stateStore'
import addNewEmployeeAPi from '../../../../middleware/api/EmployeeDirectory/EmployeesList/AddNewEmployee'

const getAllReportingManagers = createAsyncThunk(
  'reportingManagers/getAllReportingManagers',
  async (_, thunkApi) => {
    try {
      return await addNewEmployeeAPi.reportingManagersApi.getAllReportingManagers()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialHrDataState: AddNewEmployeeState = {
  reportingManagers: [],
  error: null,
  isLoading: ApiLoadingState.idle,
}

const getAllReportingManagersSlice = createSlice({
  name: 'reportingManagers',
  initialState: initialHrDataState,
  reducers: {
    clearTechnologies: (state) => {
      state.reportingManagers = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReportingManagers.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAllReportingManagers.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.reportingManagers = action.payload as GetAllReportingManagers[]
      })
      .addCase(getAllReportingManagers.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.getAllReportingManagers.isLoading
const reportingManagersList = (state: RootState): GetAllReportingManagers[] =>
  state.getAllReportingManagers.reportingManagers as GetAllReportingManagers[]

const reportingManagersThunk = {
  getAllReportingManagers,
}

const reportingManagersSelectors = {
  isLoading,
  reportingManagersList,
}

export const reportingManagersService = {
  ...reportingManagersThunk,
  actions: getAllReportingManagersSlice.actions,
  selectors: reportingManagersSelectors,
}

export default getAllReportingManagersSlice.reducer
