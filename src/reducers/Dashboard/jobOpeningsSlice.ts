import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  JobOpeningsApiProps,
  JobOpeningsDetails,
  JobOpeningsSliceState,
} from '../../types/Dashboard/JobOpenings/JobOpeningsTypes'
import dashboardApi from '../../middleware/api/Dashboard/dashboardApi'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { RootState } from '../../stateStore'

const getAllJobVacancies = createAsyncThunk(
  'jobOpenings/getAllJobVacancies',
  async (props: JobOpeningsApiProps, thunkApi) => {
    try {
      return await dashboardApi.getAllJobVacancies(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialJobOpeningsState: JobOpeningsSliceState = {
  jobVacancies: [],
  listSize: 0,
  isLoading: ApiLoadingState.idle,
  error: null,
}

const jobOpeningsSlice = createSlice({
  name: 'jobOpenings',
  initialState: initialJobOpeningsState,
  reducers: {
    clearEmployeeList: (state) => {
      state.jobVacancies = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobVacancies.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAllJobVacancies.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.jobVacancies = action.payload.list
        state.listSize = action.payload.size
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.jobOpenings.isLoading
const jobVacancies = (state: RootState): JobOpeningsDetails[] =>
  state.jobOpenings.jobVacancies
const listSize = (state: RootState): number => state.jobOpenings.listSize

const jobOpeningsThunk = {
  getAllJobVacancies,
}

const jobOpeningSelectors = {
  isLoading,
  jobVacancies,
  listSize,
}

export const jobVacanciesService = {
  ...jobOpeningsThunk,
  actions: jobOpeningsSlice.actions,
  selectors: jobOpeningSelectors,
}

export default jobOpeningsSlice.reducer
