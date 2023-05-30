import { AxiosError } from 'axios'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import assetsWarrantyListApi from '../../../middleware/api/Assets/AssetWarrantyReport/assetWarrantyReportApi'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import {
  AssetTransactionListProps,
  AssetTransactionListSliceState,
  GetAssetTransactionList,
  AssetTransactionalList,
} from '../../../types/Assets/AssetTransactionalList/AssetTransactionalListTypes'
import assetTransactionalListApi from '../../../middleware/api/Assets/AssetTransationalList/assetTransationalListApi'

const getAssetTransactionList = createAsyncThunk(
  'assetManagement/assetTransactionalList',
  async (props: AssetTransactionListProps, thunkApi) => {
    try {
      return await assetTransactionalListApi.getAssetTransactionList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialAssetTransactionListState: AssetTransactionListSliceState =
  {
    assetTransactionakDetails: [],
    getAssetTransactionList: {} as GetAssetTransactionList,
    isLoading: ApiLoadingState.idle,
    listSize: 0,
  }

const assetTransactionListSlice = createSlice({
  name: 'assetTransactionList',
  initialState: initialAssetTransactionListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getAssetTransactionList.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(
        isAnyOf(getAssetTransactionList.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.assetTransactionakDetails = action.payload.list
          state.listSize = action.payload.size
        },
      )
  },
})

const assetTransactionListThunk = {
  getAssetTransactionList,
}

function isLoading(state: RootState): LoadingState {
  return state.assetTransactionList.isLoading
}
const assetTransactionList = (state: RootState): AssetTransactionalList[] =>
  state.assetTransactionList.assetTransactionakDetails

const listSize = (state: RootState): number =>
  state.assetTransactionList.listSize

export const assetTransactionListSelectors = {
  isLoading,
  assetTransactionList,
  listSize,
}

export const assetTransactionListService = {
  ...assetTransactionListThunk,
  actions: assetTransactionListSlice.actions,
  selectors: assetTransactionListSelectors,
}

export default assetTransactionListSlice.reducer
