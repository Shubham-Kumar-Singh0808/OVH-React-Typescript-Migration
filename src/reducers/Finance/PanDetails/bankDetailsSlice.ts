import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import bankDetailsApi from '../../../middleware/api/Finance/PanDetails/bankDetailsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  BankDetailsSliceState,
  BankNameLookup,
} from '../../../types/Finance/PanDetails/bankDetailsTypes'

const bankNameList = createAsyncThunk(
  'bankDetails/bankNameList',
  async (_, thunkApi) => {
    try {
      return await bankDetailsApi.bankNameList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialBankDetailsState: BankDetailsSliceState = {
  isLoading: ApiLoadingState.idle,
  error: 0,
  bankNameList: [],
}

const bankDetailsSlice = createSlice({
  name: 'bankDetails',
  initialState: initialBankDetailsState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(bankNameList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.bankNameList = action.payload
      })
      .addCase(bankNameList.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(bankNameList.rejected, (state) => {
        state.isLoading = ApiLoadingState.failed
      })
  },
})

const bankDetailsThunk = {
  bankNameList,
}

const isLoading = (state: RootState): LoadingState => state.panDetails.isLoading

const bankList = (state: RootState): BankNameLookup[] =>
  state.bankDetails.bankNameList

const bankDetailsSelectors = {
  isLoading,
  bankList,
}

export const bankDetailService = {
  ...bankDetailsThunk,
  actions: bankDetailsSlice.actions,
  selectors: bankDetailsSelectors,
}

export default bankDetailsSlice.reducer
