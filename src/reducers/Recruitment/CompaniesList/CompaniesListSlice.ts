import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import CompaniesListApi from '../../../middleware/api/Recruitment/CompaniesList/CompaniesListApi'
import {
  CompaniesListResponse,
  CompaniesListSliceState,
  CompaniesListTableProps,
  ExportBtnTypes,
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
      .addMatcher(isAnyOf(getAllCompanies.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})
const isLoading = (state: RootState): LoadingState =>
  state?.companiesList.isLoading

const allCompaniesListData = (state: RootState): CompaniesListResponse[] =>
  state.companiesList.companiesListData

const listSize = (state: RootState): number => state.companiesList.listSize

export const companiesListThunk = {
  getAllCompanies,
  exportCompaniesList,
}

export const companiesListSelectors = {
  isLoading,
  listSize,
  allCompaniesListData,
}

export const companiesListService = {
  ...companiesListThunk,
  actions: companiesListSlice.actions,
  selectors: companiesListSelectors,
}

export default companiesListSlice.reducer
