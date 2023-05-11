import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import jobOpeningsApi from '../../../middleware/api/Recruitment/JobOpenings/jobOpeningsApi'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  GetAllJobVacanciesList,
  GetAllJobVacanciesProps,
  GetAllTechnology,
  JobOpeningsSliceState,
  JobVacancy,
  JobVacancyAuditList,
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

const addJobVacancy = createAsyncThunk(
  'jobOpenings/addJobVacancy',
  async (data: JobVacancy, thunkApi) => {
    try {
      return await jobOpeningsApi.addJobVacancy(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteJobVacancy = createAsyncThunk(
  'jobOpenings/deleteJobVacancy',
  async (jobvacancyId: number, thunkApi) => {
    try {
      return await jobOpeningsApi.deleteJobVacancy(jobvacancyId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getJobOpeningById = createAsyncThunk(
  'jobOpenings/getJobOpeningById',
  async (jobVacancyId: number, thunkApi) => {
    try {
      return await jobOpeningsApi.getJobOpeningById(jobVacancyId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getJobVacancyAudit = createAsyncThunk(
  'jobOpenings/getJobVacancyAudit',
  async (jobVacancyId: number, thunkApi) => {
    try {
      return await jobOpeningsApi.getJobVacancyAudit(jobVacancyId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialJobOpeningsState: JobOpeningsSliceState = {
  isLoading: ApiLoadingState.idle,
  listSize: 0,
  getAllTechnology: [],
  getAllJobVacancies: [],
  getJobOpeningById: {} as GetAllJobVacanciesList,
  getJobVacancyAuditList: [],
  getJobVacancyAudit: {} as JobVacancyAuditList,
}

const jobVacanciesSlice = createSlice({
  name: 'jobOpenings',
  initialState: initialJobOpeningsState,
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
      .addCase(getJobVacancyAudit.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getJobVacancyAuditList = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(getJobOpeningById.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getJobOpeningById = action.payload
      })
      .addMatcher(
        isAnyOf(deleteJobVacancy.fulfilled, addJobVacancy.fulfilled),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getAllTechnology.pending,
          getAllJobVacancies.pending,
          getJobOpeningById.pending,
          getJobVacancyAudit.pending,
          deleteJobVacancy.pending,
          addJobVacancy.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getAllTechnology.rejected,
          getAllJobVacancies.rejected,
          getJobOpeningById.rejected,
          getJobVacancyAudit.rejected,
          deleteJobVacancy.rejected,
          addJobVacancy.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})
const isLoading = (state: RootState): LoadingState =>
  state.jobVacancies.isLoading

const getJobVacancies = (state: RootState): GetAllJobVacanciesList[] =>
  state.jobVacancies.getAllJobVacancies

const getTechnology = (state: RootState): GetAllTechnology[] =>
  state.jobVacancies.getAllTechnology

const JobOpeningById = (state: RootState): GetAllJobVacanciesList =>
  state.jobVacancies.getJobOpeningById

const JobVacancyAudit = (state: RootState): JobVacancyAuditList =>
  state.jobVacancies.getJobVacancyAudit

const auditList = (state: RootState): JobVacancyAuditList[] =>
  state.jobVacancies.getJobVacancyAuditList

const listSize = (state: RootState): number => state.jobVacancies.listSize

export const jobVacanciesThunk = {
  getAllJobVacancies,
  getAllTechnology,
  addJobVacancy,
  deleteJobVacancy,
  getJobOpeningById,
  getJobVacancyAudit,
}

export const jobVacanciesSelectors = {
  isLoading,
  getJobVacancies,
  listSize,
  getTechnology,
  JobOpeningById,
  JobVacancyAudit,
  auditList,
}

export const jobOpeningsService = {
  ...jobVacanciesThunk,
  actions: jobVacanciesSlice.actions,
  selectors: jobVacanciesSelectors,
}

export default jobVacanciesSlice.reducer
