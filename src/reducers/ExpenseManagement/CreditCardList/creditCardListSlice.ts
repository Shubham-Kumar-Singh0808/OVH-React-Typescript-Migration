import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import creditCardListApi from '../../../middleware/api/ExpenseManagement/CreditCardList/creditCardListApi'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  CreditCardList,
  CreditCardListSliceState,
} from '../../../types/ExpenseManagement/CreditCardList/creditCardListTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'

const getCreditCardsList = createAsyncThunk(
  '/ExpenseManagement/getCardsList',
  async (_, thunkApi) => {
    try {
      return await creditCardListApi.getCreditCardsList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialCreditCardListState: CreditCardListSliceState = {
  getCardsList: [],
  isLoading: ApiLoadingState.idle,
  error: null,
}

const creditCardListSlice = createSlice({
  name: 'credit card',
  initialState: initialCreditCardListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCreditCardsList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getCardsList = action.payload
      })
      .addCase(getCreditCardsList.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getCreditCardsList.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.creditCardList.isLoading
const creditCards = (state: RootState): CreditCardList[] =>
  state.creditCardList.getCardsList

const creditCardListThunk = {
  getCreditCardsList,
}

const creditCardListSelectors = {
  isLoading,
  creditCards,
}

export const creditCardListService = {
  ...creditCardListThunk,
  actions: creditCardListSlice.actions,
  selectors: creditCardListSelectors,
}

export default creditCardListSlice.reducer
