import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  AddEditSliceState,
  AssetTypeAddList,
  UpdateAssetListSliceState,
} from '../../../types/Assets/AssetList/addEditListTypes'
import AddAssetApi from '../../../middleware/api/Assets/AssetList/AddEditApi'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import AddAssetList from '../../../pages/Assets/AssetList/AddAsset/AddAssetList'

const getAddAssetList = createAsyncThunk(
  '/assetManagement/addAsset',
  async (props: AssetTypeAddList, thunkApi) => {
    try {
      return await AddAssetApi.getAddAssetList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateAddAsset = createAsyncThunk(
  '/assetManagement/updateAddAsset',
  async (props: UpdateAssetListSliceState, thunkApi) => {
    try {
      return await AddAssetApi.updateAddAsset(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialAddAssetListState: AddEditSliceState = {
  isLoading: ApiLoadingState.idle,
  listSize: 0,
}
const AddAssetListSlice = createSlice({
  name: 'AddAssetList',
  initialState: initialAddAssetListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddAssetList.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAddAssetList.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
  },
})

const AddAssetListThunk = {
  getAddAssetList,
  updateAddAsset,
}
const isLoading = (state: RootState): LoadingState =>
  state.addAssetList.isLoading
const listSize = (state: RootState): number => state.manufacturerList.listSize
export const AddAssetListSelectors = {
  isLoading,
  listSize,
}
export const AddAssetListService = {
  ...AddAssetListThunk,
  actions: AddAssetListSlice.actions,
  selectors: AddAssetListSelectors,
}

export default AddAssetListSlice.reducer
