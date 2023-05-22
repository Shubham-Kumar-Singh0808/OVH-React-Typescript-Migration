import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  GetAllManufacturerName,
  ManufacturerDetails,
  ManufacturerListProps,
  ManufacturerListSliceState,
} from '../../../types/Assets/ManufacturerList/ManufacturerType'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import ManufacturerApi from '../../../middleware/api/Assets/ManufacturerList/ManufacturerListApi'

const getManufacturerList = createAsyncThunk(
  'category/getManufacturerList',
  async (props: ManufacturerListProps, thunkApi) => {
    try {
      return await ManufacturerApi.getManufacturerList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const initialManufacturerListState: ManufacturerListSliceState = {
  manufacturerDetails: [],
  getAllManufacturerName: {} as GetAllManufacturerName,
  isLoading: ApiLoadingState.idle,
  listSize: 0,
}

const ManufacturerListSlice = createSlice({
  name: 'ManufacturerList',
  initialState: initialManufacturerListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getManufacturerList.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getManufacturerList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.manufacturerDetails = action.payload.list
        state.listSize = action.payload.size
      })
  },
})

const ManufacturerListThunk = {
  getManufacturerList,
}

const isLoading = (state: RootState): LoadingState =>
  state.manufacturerList.isLoading
const manufacturerList = (state: RootState): ManufacturerDetails[] =>
  state.manufacturerList.manufacturerDetails
const listSize = (state: RootState): number => state.manufacturerList.listSize

export const ManufacturerListSelectors = {
  manufacturerList,
  isLoading,
  listSize,
}

export const ManufacturerListService = {
  ...ManufacturerListThunk,
  actions: ManufacturerListSlice.actions,
  selectors: ManufacturerListSelectors,
}

export default ManufacturerListSlice.reducer