import { AppDispatch, RootState } from '../../../stateStore'

import {
  EmployeeMyAssets as EmployeeMyAsset,
  MyAssetsTabState as EmployeeMyAssetsState,
} from '../../../types/MyProfile/MyAssetsTab/myAssetsTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import employeeMyAssetsApi from '../../../middleware/api/MyProfile/MyAssetsTab/employeeMyAssetsApi'

const initialEmployeeMyAssetsTabState: EmployeeMyAssetsState = {
  employeeMyAssets: [],
  isLoading: false,
  error: 0,
}

const getEmployeeMyAssets = createAsyncThunk<
  EmployeeMyAsset[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeMyAssets/getEmployeeMyAssets',
  async (employeeId: number | string, thunkApi) => {
    try {
      return await employeeMyAssetsApi.getEmployeeMyAssets(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeMyAssetsSlice = createSlice({
  name: 'employeeMyAssets',
  initialState: initialEmployeeMyAssetsTabState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getEmployeeMyAssets.fulfilled, (state, action) => {
      state.isLoading = false
      state.employeeMyAssets = action.payload as EmployeeMyAsset[]
    })
    builder.addCase(getEmployeeMyAssets.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getEmployeeMyAssets.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as ValidationError
    })
  },
})
const employeeMyAssets = (state: RootState): EmployeeMyAsset[] =>
  state.employeeMyAssets.employeeMyAssets

export const employeeMyAssetsThunk = {
  getEmployeeMyAssets,
}
export const employeeMyAssetsSelectors = {
  employeeMyAssets,
}
export const employeeMyAssetsService = {
  ...employeeMyAssetsThunk,
  actions: employeeMyAssetsSlice.actions,
  selectors: employeeMyAssetsSelectors,
}
export default employeeMyAssetsSlice.reducer
