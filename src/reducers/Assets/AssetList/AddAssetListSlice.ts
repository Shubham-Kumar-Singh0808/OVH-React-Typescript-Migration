import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  AddEditSliceState,
  AssetTypeAddList,
  UpdateAssetListSliceState,
  typeChangeSpecificationsList,
  typeChangeSpecificationsProps,
} from '../../../types/Assets/AssetList/addEditListTypes'
import AddAssetApi from '../../../middleware/api/Assets/AssetList/AddEditApi'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'

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
const checkAssetNumberExist = createAsyncThunk(
  'newEventSlice/checkAssetNumberExixts',
  async (AssetNumber: string, thunkApi) => {
    try {
      return await AddAssetApi.checkAssetNumberExixts(AssetNumber)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const typeChangeSpecifications = createAsyncThunk(
  'newEventSlice/typeChangeSpecifications',
  async (props: typeChangeSpecificationsProps, thunkApi) => {
    try {
      return await AddAssetApi.typeChangeSpecifications(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialAddAssetListState: AddEditSliceState = {
  isLoading: ApiLoadingState.idle,
  listSize: 0,
  typeChangeSpecificationsData: [],
}
const AddAssetListSlice = createSlice({
  name: 'AddAssetList',
  initialState: initialAddAssetListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(typeChangeSpecifications.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.typeChangeSpecificationsData = action.payload
      })
      .addMatcher(
        isAnyOf(getAddAssetList.pending, checkAssetNumberExist.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(getAddAssetList.fulfilled, checkAssetNumberExist.fulfilled),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
  },
})

const AddAssetListThunk = {
  getAddAssetList,
  updateAddAsset,
  checkAssetNumberExist,
  typeChangeSpecifications,
}
const isLoading = (state: RootState): LoadingState =>
  state.addAssetList.isLoading
const listSize = (state: RootState): number => state.addAssetList.listSize

const typeChange = (state: RootState): typeChangeSpecificationsList[] =>
  state.addAssetList.typeChangeSpecificationsData

export const AddAssetListSelectors = {
  isLoading,
  listSize,
  typeChange,
}
export const AddAssetListService = {
  ...AddAssetListThunk,
  actions: AddAssetListSlice.actions,
  selectors: AddAssetListSelectors,
}

export default AddAssetListSlice.reducer
