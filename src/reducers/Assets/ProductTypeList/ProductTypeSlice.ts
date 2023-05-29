import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import ProductTypeAPI from '../../../middleware/api/Assets/ProductTypeList/ProductTypeListApi'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import {
  ProductTypeListProps,
  ProductTypeListResponse,
  ProductTypeListSLiceState,
} from '../../../types/Assets/ProductTypeList/ProductTypeListTypes'
import {
  AddProductTypes,
  ManufacturerList,
  UpdateProductTypeRecordTypes,
} from '../../../types/Assets/ProductTypeList/addproducttype/AddProductType'

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

const getAllLookUpsApi = createAsyncThunk(
  'assetManagement/getAllLookUps',
  async (_, thunkApi) => {
    try {
      return await ProductTypeAPI.getAllLookUpsApi()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const AddProductTypeListRecord = createAsyncThunk(
  'assetManagement/addProduct',
  async (data: AddProductTypes, thunkApi) => {
    try {
      return await ProductTypeAPI.AddProductTypeRecord(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const UpdateProductTypeListRecord = createAsyncThunk(
  'assetManagement/updateProduct',
  async (data: UpdateProductTypeRecordTypes, thunkApi) => {
    try {
      return await ProductTypeAPI.UpdateProductTypeRecord(data)
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
  manufacturerList: {} as ManufacturerList,
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
      .addMatcher(isAnyOf(getAllLookUpsApi.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.manufacturerList = action.payload
      })
  },
})

const ProductTypeListThunk = {
  getProductTypeList,
  DeleteProductType,
  getAllLookUpsApi,
  AddProductTypeListRecord,
  UpdateProductTypeListRecord,
}

const isLoading = (state: RootState): LoadingState =>
  state?.ProductTypeList?.isLoading
const listSize = (state: RootState): number => state.ProductTypeList.listSize
const ProductTypeLists = (state: RootState): ProductTypeListResponse =>
  state.ProductTypeList?.productTypeResponse
const manufacturerData = (state: RootState): ManufacturerList =>
  state.ProductTypeList?.manufacturerList

const ProductTypeListSelector = {
  isLoading,
  listSize,
  ProductTypeLists,
  manufacturerData,
}

export const ProductTypeListService = {
  ...ProductTypeListThunk,
  actions: ProductTypeSlice.actions,
  selectors: ProductTypeListSelector,
}

export default ProductTypeSlice.reducer
