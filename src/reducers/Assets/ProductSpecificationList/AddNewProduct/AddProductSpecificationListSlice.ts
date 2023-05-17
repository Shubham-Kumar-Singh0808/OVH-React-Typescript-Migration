import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  AssetType,
  AssetTypeListSliceState,
  GetAssetTypeListDetails,
  GetProductTypeListDetails,
  ProductType,
} from '../../../../types/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListTypes'
import assetTypeListApi from '../../../../middleware/api/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListApi'
import { ValidationError } from '../../../../types/commonTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { RootState } from '../../../../stateStore'

const getAssetTypeList = createAsyncThunk(
  'assetTypeList/getAssetTypeList       ',
  async (id: number, thunkApi) => {
    try {
      return await assetTypeListApi.getAssetTypeList(id)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getProductTypeList = createAsyncThunk(
  'productTypeList/getProductTypeList       ',
  async (productId: number, thunkApi) => {
    try {
      return await assetTypeListApi.getProductTypeList(productId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAssetTypeListState: AssetTypeListSliceState = {
  assetType: [],
  getAssetTypeListDetails: {} as GetAssetTypeListDetails,
  productType: [],
  getProductTypeListDetails: {} as GetProductTypeListDetails,
  isLoading: ApiLoadingState.idle,
}
const assetTypeListSlice = createSlice({
  name: 'assetTypeList',
  initialState: initialAssetTypeListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getAssetTypeList.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getAssetTypeList.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.assetType = action.payload.assetType
      })
      .addMatcher(isAnyOf(getProductTypeList.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getProductTypeList.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.productType = action.payload.productType
      })
  },
})
const AssetTypeListThunk = {
  getAssetTypeList,
  getProductTypeList,
}

const assetTypeList = (state: RootState): AssetType[] =>
  state.assetType.assetType

const productTypeList = (state: RootState): ProductType[] =>
  state.assetType.productType

const getAssetTypeData = (state: RootState): GetAssetTypeListDetails =>
  state.assetType.getAssetTypeListDetails

const getProductTypeData = (state: RootState): GetProductTypeListDetails =>
  state.assetType.getProductTypeListDetails

const isLoading = (state: RootState): ApiLoadingState =>
  state.assetType.isLoading

const assetTypeListSelectors = {
  assetTypeList,
  productTypeList,
  isLoading,
  getAssetTypeData,
  getProductTypeData,
}

export const AssetTypeListService = {
  ...AssetTypeListThunk,
  actions: assetTypeListSlice.actions,
  selectors: assetTypeListSelectors,
}
export default assetTypeListSlice.reducer
