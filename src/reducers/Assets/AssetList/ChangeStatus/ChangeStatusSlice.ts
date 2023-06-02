import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import GetAllAssetsListApi from '../../../../middleware/api/Assets/AssetList/ChangeStatus/ChangeStatusApi'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { RootState } from '../../../../stateStore'
import {
  GetAllAssetResponse,
  ChangeAssetStatusSliceState,
  SaveEmployee,
} from '../../../../types/Assets/AssetList/ChangeStatusTypes/ChangeStatusTypes'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'

const getAllAssets = createAsyncThunk(
  'assetManagement/getAllAssets',
  async (props: GetAllAssetResponse, thunkApi) => {
    try {
      return await GetAllAssetsListApi.GetAllAssets()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const saveEmployee = createAsyncThunk(
  'assetManagement/saveEmployee',
  async (props: SaveEmployee, thunkApi) => {
    try {
      return await GetAllAssetsListApi.saveEmployee()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAllAssetStatusState: ChangeAssetStatusSliceState = {
  saveEmployee: {} as SaveEmployee,
  getAllAssetResponse: {} as GetAllAssetResponse,
  isLoading: ApiLoadingState.idle,
}

const changeStatusSlice = createSlice({
  name: 'vendorList',
  initialState: initialAllAssetStatusState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssets.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAllAssets.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getAllAssetResponse.list = action.payload.list
        state.getAllAssetResponse.size = action.payload.size
      })
      .addCase(saveEmployee.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.saveEmployee = action.payload
      })
  },
})
const isLoading = (state: RootState): LoadingState =>
  state.changeStatus.isLoading

const ChangeAssetStatusThunk = {
  getAllAssets,
  saveEmployee,
}

const ChangeStatusSelectors = {
  isLoading,
}
export const changeStatusService = {
  ...ChangeAssetStatusThunk,
  actions: changeStatusSlice.actions,
  selectors: ChangeStatusSelectors,
}

export default changeStatusSlice.reducer
