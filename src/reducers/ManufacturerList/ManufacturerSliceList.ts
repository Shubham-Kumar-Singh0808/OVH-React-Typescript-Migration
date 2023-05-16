import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  GetAllManufacturerName,
  ManufacturerDetails,
  ManufacturerListProps,
  ManufacturerListSliceState,
} from '../../types/ManufacturerList/ManufacturerType'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { RootState } from '../../stateStore'
import ManufacturerApi from '../../middleware/ManufacturerList/ManufacturerListApi'

const getManufacturerList = createAsyncThunk(
  'category/getEmployees',
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
}

const ManufacturerListSlice = createSlice({
  name: 'employeeList',
  initialState: initialManufacturerListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getManufacturerList.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getManufacturerList.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.manufacturerDetails = action.payload.list
        // state = action.payload.size
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
// const listSize = (state: RootState): number => state.employeeList.listSize

export const ManufacturerListSelectors = {
  manufacturerList,
  isLoading,
}

export const ManufacturerListService = {
  ...ManufacturerListThunk,
  actions: ManufacturerListSlice.actions,
  selectors: ManufacturerListSelectors,
}

export default ManufacturerListSlice.reducer
