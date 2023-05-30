import { AxiosError } from 'axios'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  AssetsWarrantyListProps,
  ExportAssetWarrantyListProps,
  GetWarrantyAssetsList,
  WarrantyAssetsList,
  WarrantyAssetsListSliceState,
} from '../../../types/Assets/AssetWarrantyreport/AssetWarrantyReportTypes'
import assetsWarrantyListApi from '../../../middleware/api/Assets/AssetWarrantyReport/assetWarrantyReportApi'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import {
  AssetTransactionListProps,
  AssetTransactionListSliceState,
  GetAssetTransactionList,
} from '../../../types/Assets/AssetTransactionalList/AssetTransactionalListTypes'
import assetTransactionalListApi from '../../../middleware/api/Assets/AssetTransationalList/assetTransationalListApi'

const getAssetsWarrantyList = createAsyncThunk(
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
      .addMatcher(isAnyOf(getAssetsWarrantyList.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getAssetsWarrantyList.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.warrantyAssetsDetails = action.payload.list
        state.listSize = action.payload.size
      })
  },
})

const assetsWarrantyListThunk = {
  getAssetsWarrantyList,
}

function isLoading(state: RootState): LoadingState {
  return state.assetsWarrantyList.isLoading
}
const assetsWarrantyList = (state: RootState): WarrantyAssetsList[] =>
  state.assetsWarrantyList.warrantyAssetsDetails
const listSize = (state: RootState): number => state.assetsWarrantyList.listSize

export const assetsWarrantyListSelectors = {
  isLoading,
  assetsWarrantyList,
  listSize,
}

export const assetsWarrantyListService = {
  ...assetsWarrantyListThunk,
  actions: assetTransactionListSlice.actions,
  selectors: assetsWarrantyListSelectors,
}

export default assetTransactionListSlice.reducer
