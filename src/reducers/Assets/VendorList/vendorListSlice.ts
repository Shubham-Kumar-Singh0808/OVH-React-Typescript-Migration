import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
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

const updateVendorDetails = createAsyncThunk(
  'vendorList/updateVendorDetails',
  async (data: VendorDetails, thunkApi) => {
    try {
      return await vendorListApi.updateVendorDetails(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteVendorDetails = createAsyncThunk(
  'vendorList/deleteVendorDetails',
  async (vendorId: number, thunkApi) => {
    try {
      return await vendorListApi.deleteVendorDetails(vendorId)
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
  getVendorById: {} as VendorDetails,
  isLoading: ApiLoadingState.idle,
}

const vendorListSlice = createSlice({
  name: 'vendorList',
  initialState: initialVendorListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVendors.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.vendors = action.payload.list
        state.listSize = action.payload.size
      })
      .addMatcher(
        isAnyOf(
          getVendors.pending,
          updateVendorDetails.pending,
          deleteVendorDetails.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getVendors.rejected,
          updateVendorDetails.rejected,
          deleteVendorDetails.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState => state.vendorList.isLoading
const vendors = (state: RootState): VendorDetails[] => state.vendorList.vendors
const getVendorById = (state: RootState): VendorDetails =>
  state.vendorList.getVendorById
const listSize = (state: RootState): number => state.vendorList.listSize

const vendorListThunk = {
  getVendors,
  updateVendorDetails,
  deleteVendorDetails,
}

const vendorListSelectors = {
  isLoading,
  vendors,
  listSize,
  getVendorById,
}

export const vendorListService = {
  ...vendorListThunk,
  actions: vendorListSlice.actions,
  selectors: vendorListSelectors,
}

export default vendorListSlice.reducer
