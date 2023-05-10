import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import jobOpeningsApi from '../../../middleware/api/Recruitment/JobOpenings/jobOpeningsApi'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  GetAllJobVacanciesList,
  GetAllJobVacanciesProps,
  GetAllTechnology,
  JobOpeningsSliceState,
} from '../../../types/Recruitment/JobOpenings/jobOpeningsTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'

const getAllJobVacancies = createAsyncThunk(
  'jobOpenings/getAllJobVacancies',
  async (props: GetAllJobVacanciesProps, thunkApi) => {
    try {
      return await jobOpeningsApi.getAllJobVacancies(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllTechnology = createAsyncThunk(
  'jobOpenings/getAllTechnology',
  async (_, thunkApi) => {
    try {
      return await jobOpeningsApi.getAllTechnology()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialNotificationState: JobOpeningsSliceState = {
  isLoading: ApiLoadingState.idle,
  listSize: 0,
  getAllTechnology: [],
  getAllJobVacancies: [],
}
const jobVacanciesSlice = createSlice({
  name: 'jobOpenings',
  initialState: initialNotificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobVacancies.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getAllJobVacancies = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(getAllTechnology.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getAllTechnology = action.payload
      })
      .addCase(getAllJobVacancies.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAllJobVacancies.rejected, (state) => {
        state.isLoading = ApiLoadingState.failed
      })
      .addCase(getAllTechnology.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAllTechnology.rejected, (state) => {
        state.isLoading = ApiLoadingState.failed
      })
  },
})
const isLoading = (state: RootState): LoadingState =>
  state.jobVacancies.isLoading

const getJobVacancies = (state: RootState): GetAllJobVacanciesList[] =>
  state.jobVacancies.getAllJobVacancies

const getTechnology = (state: RootState): GetAllTechnology[] =>
  state.jobVacancies.getAllTechnology

const listSize = (state: RootState): number => state.jobVacancies.listSize

export const jobVacanciesThunk = {
  getAllJobVacancies,
  getAllTechnology,
}

export const jobVacanciesSelectors = {
  isLoading,
  getJobVacancies,
  listSize,
  getTechnology,
}

export const jobOpeningsService = {
  ...jobVacanciesThunk,
  actions: jobVacanciesSlice.actions,
  selectors: jobVacanciesSelectors,
}

export default jobVacanciesSlice.reducer
