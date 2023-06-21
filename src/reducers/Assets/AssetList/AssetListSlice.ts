import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import {
  AssetListSliceState,
  AssetTypeChangeList,
  ManufacturerList,
  AllAssetListProps,
  AllAssetsList,
  AssetProps,
  AssetHistoryProps,
} from '../../../types/Assets/AssetList/AssetListTypes'
import AssetListApi from '../../../middleware/api/Assets/AssetList/AssetListApi'

const getAssetTypeChangeList = createAsyncThunk(
  'asset/getAssetList',
  async (id: number, thunkApi) => {
    try {
      return await AssetListApi.getAssetTypeChangeList(id)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllAssetListData = createAsyncThunk(
  'allAsset/getallassetlist',
  async (props: AllAssetListProps, thunkApi) => {
    try {
      return await AssetListApi.getAllAssetListData(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllAssetHistoryData = createAsyncThunk(
  'allAsset/getAssetHistory',
  async (props: AssetProps, thunkApi) => {
    try {
      return await AssetListApi.getAssetHistory(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialAssetTypeChangeListState: AssetListSliceState = {
  asset: [],
  isLoading: ApiLoadingState.idle,
  manufacturerList: {} as ManufacturerList,
  allAssetList: [],
  assetHistoryList: [],
  listSize: 0,
  currentPage: 1,
  pageSize: 20,
}

const assetTypeChangeListSlice = createSlice({
  name: 'assetTypeChangeList',
  initialState: initialAssetTypeChangeListState,
  reducers: {
    clearAssetListType: (state, action) => {
      state.allAssetList = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssetHistoryData.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.assetHistoryList = action.payload
      })
      .addCase(getAssetTypeChangeList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.asset = action.payload
      })
      .addCase(getAllAssetListData.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.allAssetList = action.payload.list
        state.listSize = action.payload.size
      })
      .addMatcher(
        isAnyOf(getAssetTypeChangeList.pending, getAllAssetHistoryData.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const assetListThunk = {
  getAssetTypeChangeList,
  getAllAssetListData,
  getAllAssetHistoryData,
}

const isLoading = (state: RootState): LoadingState => state.assetList.isLoading
const listSize = (state: RootState): number => state.assetList.listSize

const assetListData = (state: RootState): AssetTypeChangeList[] =>
  state.assetList.asset
const manufacturerList = (state: RootState): ManufacturerList =>
  state.assetList.manufacturerList
const allAssetListData = (state: RootState): AllAssetsList[] =>
  state.assetList.allAssetList

const assetHistory = (state: RootState): AssetHistoryProps[] =>
  state.assetList.assetHistoryList

const pageFromState = (state: RootState): number =>
  state.addLocationList.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.addLocationList.pageSize

const assetListSelectors = {
  isLoading,
  assetListData,
  manufacturerList,
  listSize,
  allAssetListData,
  assetHistory,
  pageFromState,
  pageSizeFromState,
}

export const assetListService = {
  ...assetListThunk,
  actions: assetTypeChangeListSlice.actions,
  selectors: assetListSelectors,
}

export default assetTypeChangeListSlice.reducer
