import { AxiosError } from 'axios'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  AssetsWarrantyListProps,
  GetWarrantyAssetsList,
  WarrantyAssetsList,
  WarrantyAssetsListSliceState,
} from '../../../types/Assets/AssetWarrantyreport/AssetWarrantyReportTypes'
import assetsWarrantyListApi from '../../../middleware/api/Assets/AssetWarrantyReport/assetWarrantyReportApi'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'

const getAssetsWarrantyList = createAsyncThunk(
  'category/getEmployees',
  async (props: AssetsWarrantyListProps, thunkApi) => {
    try {
      return await assetsWarrantyListApi.getAssetsWarrantyList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAssetsWarrantyListState: WarrantyAssetsListSliceState = {
  warrantyAssetsDetails: [],
  listSize: 0,
  isLoading: ApiLoadingState.idle,
  getWarrantyAssetsList: {} as GetWarrantyAssetsList,
}

const assetsWarrantyListSlice = createSlice({
  name: 'employeeList',
  initialState: initialAssetsWarrantyListState,
  reducers: {
    // clearEmployeeList: (state) => {
    //   state.employees = []
    // },
    // changeSelectedEmploymentStatus: (state, action) => {
    //   state.selectedEmploymentStatus = action.payload as EmploymentStatus
    // },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getAssetsWarrantyList.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getAssetsWarrantyList.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.warrantyAssetsDetails = action.payload.list
        state.listSize = action.payload.size
      })
  },
})

const assetsWarrantyListThunk = {
  getAssetsWarrantyList,
}

const isLoading = (state: RootState): LoadingState =>
  state.assetsWarrantyList.isLoading
const assetsWarrantyList = (state: RootState): WarrantyAssetsList[] =>
  state.assetsWarrantyList.warrantyAssetsDetails
const listSize = (state: RootState): number => state.employeeList.listSize

export const assetsWarrantyListSelectors = {
  isLoading,
  assetsWarrantyList,
  listSize,
}

export const assetsWarrantyListService = {
  ...assetsWarrantyListThunk,
  actions: assetsWarrantyListSlice.actions,
  selectors: assetsWarrantyListSelectors,
}

export default assetsWarrantyListSlice.reducer
