import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import dashboardApi from '../../middleware/api/Dashboard/dashboardApi'
import { RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  employeeProfileData,
  employeeProfileSearchState,
} from '../../types/Dashboard/employeeSearchTypes'

const searchEmployee = createAsyncThunk(
  'searchEmployee/searchEmployee',
  async (searchString: string, thunkApi) => {
    try {
      return await dashboardApi.searchEmployee(searchString)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialEmployeeSearchSliceState: employeeProfileSearchState = {
  isLoading: ApiLoadingState.idle,
  employeeProfile: [],
}

const searchEmployeeSlice = createSlice({
  name: 'searchEmployee',
  initialState: initialEmployeeSearchSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchEmployee.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(searchEmployee.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeProfile = action.payload
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.dashboardEmployeeSearch.isLoading

const allEmployees = (state: RootState): employeeProfileData[] =>
  state.dashboardEmployeeSearch.employeeProfile

const employeeSearchThunk = {
  searchEmployee,
}

const employeeSearchSelectors = {
  isLoading,
  allEmployees,
}

export const employeeSearchService = {
  ...employeeSearchThunk,
  actions: searchEmployeeSlice.actions,
  selectors: employeeSearchSelectors,
}

export default searchEmployeeSlice.reducer
