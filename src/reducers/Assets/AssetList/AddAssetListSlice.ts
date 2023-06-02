import { createAsyncThunk } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { AxiosError } from 'axios'
import id from 'date-fns/locale/id'
import { createSlice } from '@reduxjs/toolkit'
import {
  AddEditSliceState,
  AssetTypeAddList,
} from '../../../types/Assets/AssetList/addEditListTypes'
import AddAssetApi from '../../../middleware/api/Assets/AssetList/AddEditApi'
import { ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ManufacturerListSelectors } from '../ManufacturerList/ManufacturerSliceList'

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
}
export const AddAssetListService = {
  ...AddAssetListThunk,
  actions: AddAssetListSlice.actions,
  selectors: ManufacturerListSelectors,
}

export default AddAssetListSlice.reducer
