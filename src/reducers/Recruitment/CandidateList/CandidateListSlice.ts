import type { PayloadAction } from '@reduxjs/toolkit'
// eslint-disable-next-line no-duplicate-imports
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import candidateListApi from '../../../middleware/api/Recruitment/CandidateList/CandidateListApi'
import {
  CandidateLists,
  CandidateListSliceState,
  CandidateListTableProps,
  GetAllTechnology,
  country,
  viewHandlerProps,
  CandidateListPagesEnum,
} from '../../../types/Recruitment/CandidateList/CandidateListTypes'

export const initialCandidateListState: CandidateListSliceState = {
  isLoading: ApiLoadingState.idle,
  listSize: 0,
  candidateDetails: {} as CandidateLists,
  allCandidateDetails: [],
  allCountryDetails: {} as country,
  empCountries: [],
  getAllTechnology: [],
  visiblePage: CandidateListPagesEnum.CandidateListLanding,
  allJobVacancies: { size: 0, list: [] },
}

const searchScheduledCandidate = createAsyncThunk(
  'candidateList/searchScheduledCandidate',
  async (props: CandidateListTableProps, thunkApi) => {
    try {
      return await candidateListApi.searchScheduledCandidate(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const getEmpCountries = createAsyncThunk(
  'candidateList/getEmpCountries',
  async (_, thunkApi) => {
    try {
      return await candidateListApi.getEmpCountries()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const getTechnology = createAsyncThunk(
  'candidateList/getTechnology',
  async (_, thunkApi) => {
    try {
      return await candidateListApi.getTechnology()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const getCountryWiseCandidatesList = createAsyncThunk(
  'candidateList/getCountryWiseCandidatesList',
  async (data: viewHandlerProps, thunkApi) => {
    try {
      return await candidateListApi.getCountryWiseCandidatesList(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteCandidate = createAsyncThunk(
  'candidateList/deleteCandidate',
  async (candidateId: number, thunkApi) => {
    try {
      return await candidateListApi.deleteCandidate(candidateId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllJobVacanciesThunk = createAsyncThunk(
  'candidateList/getAllJobVacanciesThunk',
  async (_, thunkApi) => {
    try {
      return await candidateListApi.getAllJobVacancies({
        startIndex: null,
        endIndex: null,
        searchJobTitle: null,
        status: null,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const candidateListSlice = createSlice({
  name: 'candidateList',
  initialState: initialCandidateListState,
  reducers: {
    changePageHandler: (
      state,
      action: PayloadAction<CandidateListPagesEnum>,
    ) => {
      state.visiblePage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchScheduledCandidate.fulfilled, (state, action) => {
        state.allCandidateDetails = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(getAllJobVacanciesThunk.fulfilled, (state, action) => {
        state.allJobVacancies = action.payload
      })
      .addCase(getCountryWiseCandidatesList.fulfilled, (state, action) => {
        state.allCandidateDetails = action.payload.list
      })
      .addCase(getEmpCountries.fulfilled, (state, action) => {
        state.empCountries = action.payload
      })
      .addCase(getTechnology.fulfilled, (state, action) => {
        state.getAllTechnology = action.payload
      })
      .addMatcher(
        isAnyOf(
          searchScheduledCandidate.fulfilled,
          getAllJobVacanciesThunk.fulfilled,
          getCountryWiseCandidatesList.fulfilled,
          getEmpCountries.fulfilled,
          getTechnology.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(isAnyOf(searchScheduledCandidate.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})
const isLoading = (state: RootState): LoadingState =>
  state?.candidateList.isLoading

const getAllCandidateDetails = (state: RootState): CandidateLists[] =>
  state.candidateList.allCandidateDetails

const getAllEmpCountries = (state: RootState): country[] =>
  state.candidateList.empCountries

const listSize = (state: RootState): number => state.candidateList.listSize

const getAllTechnology = (state: RootState): GetAllTechnology[] =>
  state.candidateList.getAllTechnology

export const candidateListThunk = {
  searchScheduledCandidate,
  getEmpCountries,
  getTechnology,
  getCountryWiseCandidatesList,
  deleteCandidate,
  getAllJobVacanciesThunk,
}

export const candidateListSelectors = {
  isLoading,
  listSize,
  getAllCandidateDetails,
  getAllTechnology,
  getAllEmpCountries,
}

export const candidateListService = {
  ...candidateListThunk,
  actions: candidateListSlice.actions,
  selectors: candidateListSelectors,
}

export default candidateListSlice.reducer
