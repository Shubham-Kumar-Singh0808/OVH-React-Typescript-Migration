import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  AssetType,
  GetAssetTypeListData,
  AssetTypeList,
  ManufacturerList,
  AssetTypeListSliceState,
  AddProductSpecificationProps,
  UpdateProductSpecificationTypes,
} from '../../../../types/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListTypes'
import assetTypeListApi from '../../../../middleware/api/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListApi'
import { ValidationError } from '../../../../types/commonTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { AppDispatch, RootState } from '../../../../stateStore'

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

const deleteProductSpecification = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'productSpecification/deleteProductSpecification',
  async (specificationId, thunkApi) => {
    try {
      return await assetTypeListApi.deleteProductSpecification(specificationId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addProductSpecifications = createAsyncThunk<
  number | undefined,
  AddProductSpecificationProps,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'productSpecifications/addProductSpecifications',
  async (addProductSpecifications: AddProductSpecificationProps, thunkApi) => {
    try {
      return await assetTypeListApi.addProductSpecifications(
        addProductSpecifications,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const updateProductSpecification = createAsyncThunk<
  number | undefined,
  UpdateProductSpecificationTypes,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'editProduct/ updateProductSpecification ',
  async (
    updateProductSpecification: UpdateProductSpecificationTypes,
    thunkApi,
  ) => {
    try {
      return await assetTypeListApi.updateProductSpecification(
        updateProductSpecification,
      )
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
        state.assetType = action.payload
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
      .addMatcher(isAnyOf(updateProductSpecification.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(
        isAnyOf(updateProductSpecification.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          // state.updateProductSpecification = action.payload
        },
      )
  },
})
const addProductThunk = {
  getAssetTypeList,
  getProductTypeList,
  getAllLookUps,
  addProductSpecifications,
  deleteProductSpecification,
  updateProductSpecification,
}

const assetTypeList = (state: RootState): AssetType[] =>
  state.addProduct.assetType

const productTypeList = (state: RootState): AssetType[] =>
  state.addProduct.assetType

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
