import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import candidateListApi from '../../../middleware/api/Recruitment/CandidateList/CandidateListApi'
import {
  CandidateList,
  CandidateListSliceState,
  CandidateListTableProps,
  GetAllTechnology,
  country,
  viewHandlerProps,
} from '../../../types/Recruitment/CandidateList/CandidateListTypes'

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

export const initialCandidateListState: CandidateListSliceState = {
  isLoading: ApiLoadingState.idle,
  listSize: 0,
  candidateDetails: {} as CandidateList,
  allCandidateDetails: [],
  allCountryDetails: {} as country,
  empCountries: [],
  getAllTechnology: [],
}

const candidateListSlice = createSlice({
  name: 'candidateList',
  initialState: initialCandidateListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchScheduledCandidate.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.allCandidateDetails = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(getCountryWiseCandidatesList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.allCandidateDetails = action.payload.list
      })
      .addCase(getEmpCountries.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.empCountries = action.payload
      })
      .addCase(getTechnology.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getAllTechnology = action.payload
      })
      .addMatcher(isAnyOf(searchScheduledCandidate.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})
const isLoading = (state: RootState): LoadingState =>
  state?.candidateList.isLoading

const getAllCandidateDetails = (state: RootState): CandidateList[] =>
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
