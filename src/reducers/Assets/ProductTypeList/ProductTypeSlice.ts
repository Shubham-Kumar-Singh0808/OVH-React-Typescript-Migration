import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import ProductTypeAPI from '../../../middleware/api/Assets/ProductTypeList/ProductTypeListApi'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import {
  ProductTypeListProps,
  ProductTypeListSLiceState,
  ProductTypeListType,
} from '../../../types/Assets/ProductTypeList/ProductTypeListTypes'

const getProductTypeList = createAsyncThunk(
  'assetManagement/getAllProductTypes',
  async (props: ProductTypeListProps, thunkApi) => {
    try {
      return await ProductTypeAPI.GetProductTypeList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const DeleteProductType = createAsyncThunk(
  'assetManagement/deleteProduct',
  async (productid: number, thunkApi) => {
    try {
      return await ProductTypeAPI.DeleteProductTypeRecord(productid)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialProductTypeSliceState: ProductTypeListSLiceState = {
  ProductTypeListModel: [],
  listSize: 0,
  isLoading: ApiLoadingState.idle,
  productTypeResponse: { list: [], size: 0 },
}
const ProductTypeSlice = createSlice({
  name: 'assetManagement',
  initialState: initialProductTypeSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getProductTypeList.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getProductTypeList.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.productTypeResponse = action.payload
        state.listSize = action.payload.size
      })
  },
})

const ProductTypeListThunk = {
  getProductTypeList,
  DeleteProductType,
}

const isLoading = (state: RootState): LoadingState =>
  state?.ProductTypeList?.isLoading
const listSize = (state: RootState): number => state.ProductTypeList.listSize
const ProductTypeList = (state: RootState): ProductTypeListType[] =>
  state.ProductTypeList?.productTypeResponse?.list

const ProductTypeListSelector = {
  isLoading,
  listSize,
  ProductTypeList,
}

export const ProductTypeListService = {
  ...ProductTypeListThunk,
  actions: ProductTypeSlice.actions,
  selectors: ProductTypeListSelector,
}

export default ProductTypeSlice.reducer
