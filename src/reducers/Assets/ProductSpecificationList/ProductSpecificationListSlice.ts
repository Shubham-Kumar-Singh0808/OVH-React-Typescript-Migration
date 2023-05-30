import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  GetProductSpecificationListDetails,
  ProductSpecificationListProps,
  ProductSpecificationListSliceState,
  ProductSpecifications,
} from '../../../types/Assets/ProductSpecificationList/ProductSpecificationListTypes'
import productSpecificationListApi from '../../../middleware/api/Assets/ProductSpecificationList/ProductSpecificationListApi'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'

const getProductSpecificationList = createAsyncThunk(
  'productSpecificationList/getProductSpecificationList',
  async (props: ProductSpecificationListProps, thunkApi) => {
    try {
      return await productSpecificationListApi.getProductSpecificationList(
        props,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const initialProductSpecificationListState: ProductSpecificationListSliceState =
  {
    productSpecifications: [],
    getProductSpecificationListDetails:
      {} as GetProductSpecificationListDetails,
    isLoading: ApiLoadingState.idle,
    listSize: 0,
  }
const productSpecificationListSlice = createSlice({
  name: 'productSpecificationList',
  initialState: initialProductSpecificationListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getProductSpecificationList.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(
        isAnyOf(getProductSpecificationList.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.productSpecifications = action.payload.list
          state.listSize = action.payload.size
        },
      )
  },
})
const ProductSpecificationListThunk = {
  getProductSpecificationList,
}

const isLoading = (state: RootState): LoadingState =>
  state.productSpecificationList.isLoading
const productSpecificationList = (state: RootState): ProductSpecifications[] =>
  state.productSpecificationList.productSpecifications
const listSize = (state: RootState): number =>
  state.productSpecificationList.listSize

const productSpecificationListSelectors = {
  isLoading,
  listSize,
  productSpecificationList,
}

export const productSpecificationListService = {
  ...ProductSpecificationListThunk,
  actions: productSpecificationListSlice.actions,
  selectors: productSpecificationListSelectors,
}
export default productSpecificationListSlice.reducer
