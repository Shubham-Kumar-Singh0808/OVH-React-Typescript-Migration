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

const getAssetsWarrantyList = createAsyncThunk(
  'assetManagement/exportAssetsList',
  async (props: AssetsWarrantyListProps, thunkApi) => {
    try {
      return await assetsWarrantyListApi.getAssetsWarrantyList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialAssetsWarrantyListState: WarrantyAssetsListSliceState = {
  warrantyAssetsDetails: [],
  listSize: 0,
  isLoading: ApiLoadingState.idle,
  getWarrantyAssetsList: {} as GetWarrantyAssetsList,
}

const getExportAssetsWarrantyList = createAsyncThunk(
  'assetManagement/exportAssetsList',
  async (props: ExportAssetWarrantyListProps, thunkApi) => {
    try {
      return await assetsWarrantyListApi.getExportAssetsWarrantyList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const assetsWarrantyListSlice = createSlice({
  name: 'assetWarrantyReport',
  initialState: initialAssetsWarrantyListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAssetsWarrantyList.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAssetsWarrantyList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.warrantyAssetsDetails = action.payload.list
        state.listSize = action.payload.size
      })
  },
})

const assetsWarrantyListThunk = {
  getAssetsWarrantyList,
  getExportAssetsWarrantyList,
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
  actions: assetsWarrantyListSlice.actions,
  selectors: assetsWarrantyListSelectors,
}

export default assetsWarrantyListSlice.reducer
