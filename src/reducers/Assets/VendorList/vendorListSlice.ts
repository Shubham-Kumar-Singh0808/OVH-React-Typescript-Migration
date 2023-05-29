import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  GetAllVendorDetails,
  VendorDetails,
  VendorListApiProps,
  VendorListSliceState,
} from '../../../types/Assets/VendorList/vendorListTypes'
import vendorListApi from '../../../middleware/api/Assets/VendorList/vendorListApi'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'

const getVendors = createAsyncThunk(
  'vendorList/getVendors',
  async (props: VendorListApiProps, thunkApi) => {
    try {
      return await vendorListApi.getVendors(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialVendorListState: VendorListSliceState = {
  vendors: [],
  listSize: 0,
  getAllVendorDetails: {} as GetAllVendorDetails,
  isLoading: ApiLoadingState.idle,
}

const vendorListSlice = createSlice({
  name: 'vendorList',
  initialState: initialVendorListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVendors.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getVendors.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.vendors = action.payload.list
        state.listSize = action.payload.size
      })
  },
})

const isLoading = (state: RootState): LoadingState => state.vendorList.isLoading
const vendors = (state: RootState): VendorDetails[] => state.vendorList.vendors
const listSize = (state: RootState): number => state.vendorList.listSize

const vendorListThunk = {
  getVendors,
}

const vendorListSelectors = {
  isLoading,
  vendors,
  listSize,
}

export const vendorListService = {
  ...vendorListThunk,
  actions: vendorListSlice.actions,
  selectors: vendorListSelectors,
}

export default vendorListSlice.reducer
