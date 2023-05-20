import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  AssetType,
  ProductType,
  GetAssetTypeListData,
  AssetTypeList,
  ManufacturerList,
  AssetTypeListSliceState,
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

const getAllLookUps = createAsyncThunk(
  'AssetTypeListData/getAllLookUps       ',
  async (_, thunkApi) => {
    try {
      return await assetTypeListApi.getAllLookUpList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAddProductState: AssetTypeListSliceState = {
  assetType: [],
  productType: [],
  isLoading: ApiLoadingState.idle,
  getAssetTypeListData: {} as GetAssetTypeListData,
  assetTypeList: [],
  manufactureList: {} as ManufacturerList,
}
const addProductSlice = createSlice({
  name: 'addProduct',
  initialState: initialAddProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductTypeList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.productType = action.payload
      })
      .addMatcher(isAnyOf(getAssetTypeList.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getAssetTypeList.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.assetType = action.payload
      })
      .addMatcher(isAnyOf(getProductTypeList.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })

      .addMatcher(isAnyOf(getAllLookUps.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getAllLookUps.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.manufactureList = action.payload
      })
  },
})
const addProductThunk = {
  getAssetTypeList,
  getProductTypeList,
  getAllLookUps,
}

const assetTypeList = (state: RootState): AssetType[] =>
  state.addProduct.assetType

const productTypeList = (state: RootState): ProductType[] =>
  state.addProduct.productType

const AssetData = (state: RootState): AssetTypeList[] =>
  state.addProduct.assetTypeList

const getAllLookups = (state: RootState): GetAssetTypeListData =>
  state.addProduct.getAssetTypeListData

const isLoading = (state: RootState): ApiLoadingState =>
  state.addProduct.isLoading

const manufactureList = (state: RootState): ManufacturerList =>
  state.addProduct.manufactureList

const addProductSelectors = {
  assetTypeList,
  productTypeList,
  isLoading,
  AssetData,
  getAllLookups,
  manufactureList,
}

export const addProductService = {
  ...addProductThunk,
  actions: addProductSlice.actions,
  selectors: addProductSelectors,
}
export default addProductSlice.reducer
