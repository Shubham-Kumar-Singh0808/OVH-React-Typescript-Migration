import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import CompaniesListApi from '../../../middleware/api/Recruitment/CompaniesList/CompaniesListApi'
import {
  CandidatesInfoList,
  CompaniesListResponse,
  CompaniesListSliceState,
  CompaniesListTableProps,
  ExportBtnTypes,
  hyperLinkProps,
  linkProps,
} from '../../../types/Recruitment/CompaniesList/CompaniesListTypes'

const getAllCompanies = createAsyncThunk(
  'companiesList/getAllCompanies',
  async (props: CompaniesListTableProps, thunkApi) => {
    try {
      return await CompaniesListApi.getAllCompanies(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllCandidatesInfo = createAsyncThunk(
  'companiesList/getAllCandidatesInfo',
  async (props: hyperLinkProps, thunkApi) => {
    try {
      return await CompaniesListApi.getAllCandidatesInfo(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllEmployeesInfo = createAsyncThunk(
  'companiesList/getAllEmployeesInfo',
  async (props: linkProps, thunkApi) => {
    try {
      return await CompaniesListApi.getAllEmployeesInfo(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const exportCompaniesList = createAsyncThunk(
  'companiesList/exportCompaniesList',
  async (props: ExportBtnTypes, thunkApi) => {
    try {
      return await CompaniesListApi.exportCompaniesList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
export const initialCompaniesListState: CompaniesListSliceState = {
  isLoading: ApiLoadingState.idle,
  listSize: 0,
  companiesListResponseDetails: {} as CompaniesListResponse,
  companiesListData: [],
  CandidatesInfoListResponseDetails: {} as CandidatesInfoList,
  CandidatesInfoListData: [],
}

const companiesListSlice = createSlice({
  name: 'companiesList',
  initialState: initialCompaniesListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.companiesListData = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(getAllCandidatesInfo.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.CandidatesInfoListData = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(getAllEmployeesInfo.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.CandidatesInfoListData = action.payload.list
      })
      .addMatcher(isAnyOf(getAllCompanies.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})
const isLoading = (state: RootState): LoadingState =>
  state?.companiesList.isLoading

const allCompaniesListData = (state: RootState): CompaniesListResponse[] =>
  state.companiesList.companiesListData

const candidatesInfoListData = (state: RootState): CandidatesInfoList[] =>
  state.companiesList.CandidatesInfoListData

const listSize = (state: RootState): number => state.companiesList.listSize

export const companiesListThunk = {
  getAllCompanies,
  exportCompaniesList,
  getAllCandidatesInfo,
  getAllEmployeesInfo,
}

export const companiesListSelectors = {
  isLoading,
  listSize,
  allCompaniesListData,
  candidatesInfoListData,
}

export const companiesListService = {
  ...companiesListThunk,
  actions: companiesListSlice.actions,
  selectors: companiesListSelectors,
}

export default companiesListSlice.reducer
