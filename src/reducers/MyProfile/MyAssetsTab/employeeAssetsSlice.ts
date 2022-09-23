import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeAsset,
  EmployeeAssetsState,
} from '../../../types/MyProfile/MyAssetsTab/employeeAssetsTypes'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import employeeAssetsApi from '../../../middleware/api/MyProfile/MyAssetsTab/employeeAssetsApi'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const initialEmployeeAssetsState: EmployeeAssetsState = {
  employeeAssets: [],
  isLoading: ApiLoadingState.idle,
  error: 0,
}

const getEmployeeAssets = createAsyncThunk<
  EmployeeAsset[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeAssets/getEmployeeAssets',
  async (employeeId: number | string, thunkApi) => {
    try {
      return await employeeAssetsApi.getEmployeeAssets(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeAssetsSlice = createSlice({
  name: 'employeeMyAssets',
  initialState: initialEmployeeAssetsState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getEmployeeAssets.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.employeeAssets = action.payload as EmployeeAsset[]
    })
    builder.addCase(getEmployeeAssets.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
  },
})

const employeeAssets = (state: RootState): EmployeeAsset[] =>
  state.employeeAssets.employeeAssets

const isLoading = (state: RootState): LoadingState =>
  state.employeeAssets.isLoading

const employeeAssetsThunk = {
  getEmployeeMyAssets: getEmployeeAssets,
}

const employeeAssetsSelectors = {
  employeeAssets,
  isLoading,
}

export const employeeAssetsService = {
  ...employeeAssetsThunk,
  actions: employeeAssetsSlice.actions,
  selectors: employeeAssetsSelectors,
}

export default employeeAssetsSlice.reducer
