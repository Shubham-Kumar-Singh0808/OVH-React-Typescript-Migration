import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ValidationError } from 'json-schema'
import { AxiosError } from 'axios'
import {
  ChangeAssetStatusSliceState,
  GetAllAssetResponse,
} from '../../../types/Assets/AssetList/ChangeAssetStatusType'
import GetAllAssetsListApi from '../../../middleware/api/Assets/AssetList/ChangeAssetStatusApi'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const getAllAssets = createAsyncThunk(
  'assetManagement/getAllAssets',
  async (props: GetAllAssetResponse, thunkApi) => {
    try {
      return await GetAllAssetsListApi.GetAllAssets()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAllAssetStatusState: ChangeAssetStatusSliceState = {
    saveEmployee,
    getAllAssetResponse,
}

const getAllAssetStatusSlice = createSlice({
  name: 'vendorList',
  initialState: initialAllAssetStatusState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssets.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAllAssets.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getAllAssetResponse.list = action.payload.list
        state.getAllAssetResponse.size = action.payload.size
      })
  },
})
