import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import {
  AssetTypeChangeListApiProps,
  AssetListSliceState,
  GetAssetTypeChangeListDetails,
  AssetTypeChangeList,
} from '../../../types/Assets/AssetList/AssetListTypes'
import AssetLitApi from '../../../middleware/api/Assets/AssetList/AssetListApi'

const getAssetTypeChangeList = createAsyncThunk(
  'category/getAssetList',
  async (id: number, thunkApi) => {
    try {
      return await AssetLitApi.getAssetTypeChangeList(id)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllLookUps = createAsyncThunk(
  'AssetTypeListData/getAllLookUps       ',
  async (_, thunkApi) => {
    try {
      return await AssetLitApi.getAllLookUpList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const initialAssetTypeChangeListState: AssetListSliceState = {
  asset: [],
  getAssetTypeChangeListDetails: {} as GetAssetTypeChangeListDetails,
  isLoading: ApiLoadingState.idle,
}

const assetTypeChangeListSlice = createSlice({
  name: 'assetTypeChangeList',
  initialState: initialAssetTypeChangeListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getAssetTypeChangeList.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(
        isAnyOf(getAssetTypeChangeList.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.asset = action.payload.list as AssetTypeChangeList[]
          //   state.listSize = action.payload.Empsize
        },
      )
  },
})

const assetListThunk = {
  getAssetTypeChangeList,
  getAllLookUps,
}

const isLoading = (state: RootState): LoadingState => state.assetList.isLoading
const assetList = (state: RootState): AssetTypeChangeList[] =>
  state.assetList.asset

const assetListSelectors = {
  isLoading,
  assetList,
}

export const assetListService = {
  ...assetListThunk,
  actions: assetTypeChangeListSlice.actions,
  selectors: assetListSelectors,
}

export default assetTypeChangeListSlice.reducer
