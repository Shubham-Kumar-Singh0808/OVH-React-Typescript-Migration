import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import panDetailsApi from '../../../middleware/api/Finance/PanDetails/panDetailsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  BankInformation,
  PanDetailsSliceState,
} from '../../../types/Finance/PanDetails/panDetailsTypes'

const bankInformation = createAsyncThunk(
  'panDetails/bankInformation',
  async (loggedInEmpId: number, thunkApi) => {
    try {
      return await panDetailsApi.bankInformation(loggedInEmpId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialPanDetailsState: PanDetailsSliceState = {
  bankInfo: {} as BankInformation,
  isLoading: ApiLoadingState.idle,
  error: 0,
}

const panDetailsSlice = createSlice({
  name: 'panDetails',
  initialState: initialPanDetailsState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(bankInformation.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.bankInfo = action.payload
      })
      .addCase(bankInformation.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(bankInformation.rejected, (state) => {
        state.isLoading = ApiLoadingState.failed
      })
  },
})

const isLoading = (state: RootState): LoadingState => state.panDetails.isLoading

const bankDetails = (state: RootState): BankInformation =>
  state.panDetails.bankInfo

const panDetailsThunk = {
  bankInformation,
}

const panDetailsSelectors = {
  isLoading,
  bankDetails,
}

export const panDetailService = {
  ...panDetailsThunk,
  actions: panDetailsSlice.actions,
  selectors: panDetailsSelectors,
}

export default panDetailsSlice.reducer
