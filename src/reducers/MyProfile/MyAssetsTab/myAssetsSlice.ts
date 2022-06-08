import { AppDispatch, RootState } from '../../../stateStore'

import {
  EmployeeMyAssets,
  MyAssetsTabState,
} from '../../../types/MyProfile/MyAssetsTab/myAssetsTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import myAssetsTabApi from '../../../middleware/api/MyProfile/MyAssetsTab/myAssetsApi'

const initialMyAssetsTabState: MyAssetsTabState = {
  employeeMyAssetsDetails: [],
  isLoading: false,
  error: 0,
}

const getEmployeeMyAssetsDetails = createAsyncThunk<
  EmployeeMyAssets[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'myAssetsTab/getEmployeeMyAssetsDetails',
  async (employeeId: number | string, thunkApi) => {
    try {
      return await myAssetsTabApi.getEmployeeMyAssetsDetails(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeMyAssetsSlice = createSlice({
  name: 'reviewsTab',
  initialState: initialMyAssetsTabState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getEmployeeMyAssetsDetails.fulfilled, (state, action) => {
      state.isLoading = false
      state.employeeMyAssetsDetails = action.payload as EmployeeMyAssets[]
    })
    builder.addCase(getEmployeeMyAssetsDetails.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getEmployeeMyAssetsDetails.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as ValidationError
    })
  },
})
const myAssetDetails = (state: RootState): EmployeeMyAssets[] =>
  state.myAssets.employeeMyAssetsDetails

export const myAssetsThunk = {
  getEmployeeMyAssetsDetails,
}
export const myAssetsSelectors = {
  myAssetDetails,
}
export const myAssetsService = {
  ...myAssetsThunk,
  actions: employeeMyAssetsSlice.actions,
  selectors: myAssetsSelectors,
}
export default employeeMyAssetsSlice.reducer
