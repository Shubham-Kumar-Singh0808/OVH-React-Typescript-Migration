import { AppDispatch, RootState } from '../../../stateStore'

import {
  EmployeeAsset,
  EmployeeAssetsState,
} from '../../../types/MyProfile/MyAssetsTab/employeeAssetsTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import employeeAssetsApi from '../../../middleware/api/MyProfile/MyAssetsTab/employeeAssetsApi'

const initialEmployeeAssetsState: EmployeeAssetsState = {
  employeeAssets: [],
  LoadingState: false,
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
      state.LoadingState = false
      state.employeeAssets = action.payload as EmployeeAsset[]
    })
    builder.addCase(getEmployeeAssets.pending, (state) => {
      state.LoadingState = true
    })
    builder.addCase(getEmployeeAssets.rejected, (state, action) => {
      state.LoadingState = false
      state.error = action.payload as ValidationError
    })
  },
})

const employeeAssets = (state: RootState): EmployeeAsset[] =>
  state.employeeAssets.employeeAssets

const employeeAssetsThunk = {
  getEmployeeMyAssets: getEmployeeAssets,
}

const employeeAssetsSelectors = {
  employeeMyAssets: employeeAssets,
}

export const employeeAssetsService = {
  ...employeeAssetsThunk,
  actions: employeeAssetsSlice.actions,
  selectors: employeeAssetsSelectors,
}

export default employeeAssetsSlice.reducer
