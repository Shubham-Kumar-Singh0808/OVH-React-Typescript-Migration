import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import bankDetailsApi from '../../../middleware/api/Finance/PanDetails/bankDetailsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  BankDetailsSliceState,
  BankNameLookup,
  SaveData,
} from '../../../types/Finance/PanDetails/bankDetailsTypes'
import { BankInfo } from '../../../types/Finance/PanDetails/panDetailsTypes'

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

const saveBankInformation = createAsyncThunk(
  'bankDetails/saveBankInformation',
  async (data: SaveData, thunkApi) => {
    try {
      return await bankDetailsApi.saveBankInformation(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateBankInformation = createAsyncThunk(
  'bankDetails/updateBankInformation',
  async (info: BankInfo, thunkApi) => {
    try {
      return await bankDetailsApi.updateBankInformation(info)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteBankAccount = createAsyncThunk(
  'bankDetails/deleteBankAccount',
  async (bankId: number, thunkApi) => {
    try {
      return await bankDetailsApi.deleteBankAccount(bankId)
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
      .addMatcher(
        isAnyOf(
          bankNameList.fulfilled,
          updateBankInformation.fulfilled,
          deleteBankAccount.fulfilled,
          saveBankInformation.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          bankNameList.pending,
          updateBankInformation.pending,
          deleteBankAccount.pending,
          saveBankInformation.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          bankNameList.rejected,
          updateBankInformation.rejected,
          deleteBankAccount.rejected,
          saveBankInformation.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const bankDetailsThunk = {
  bankNameList,
  saveBankInformation,
  updateBankInformation,
  deleteBankAccount,
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
