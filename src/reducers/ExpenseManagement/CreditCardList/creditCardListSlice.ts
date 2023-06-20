import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
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

const addCreditCardsList = createAsyncThunk(
  '/ExpenseManagement/addCardDetails',
  async (
    { cardName, cardNumber }: { cardName: string; cardNumber: string },
    thunkApi,
  ) => {
    try {
      return await creditCardListApi.addCreditCardDetails({
        cardName,
        cardNumber,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const duplicateCardNumberDetails = createAsyncThunk(
  '/ExpenseManagement/checkDuplicateCardNumber',
  async (cardNumber: string, thunkApi) => {
    try {
      return await creditCardListApi.checkDuplicateCardNumberDetails(cardNumber)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const editCreditCardDetails = createAsyncThunk(
  '/ExpenseManagement/editCardDetials',
  async (cardId: number, thunkApi) => {
    try {
      return await creditCardListApi.editCreditCardList(cardId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateCreditCardList = createAsyncThunk(
  '/ExpenseManagement/updateCardDetails',
  async (data: CreditCardList, thunkApi) => {
    try {
      return await creditCardListApi.updateCreditCardDetails(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteCreditCardList = createAsyncThunk(
  '/ExpenseManagement/deleteCardData',
  async (cardId: number, thunkApi) => {
    try {
      return await creditCardListApi.deleteCreditCardDetails(cardId)
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
      .addMatcher(
        isAnyOf(
          getCreditCardsList.fulfilled,
          duplicateCardNumberDetails.fulfilled,
          addCreditCardsList.fulfilled,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.getCardsList = action.payload
        },
      )
      .addMatcher(
        isAnyOf(
          editCreditCardDetails.fulfilled,
          updateCreditCardList.fulfilled,
          deleteCreditCardList.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getCreditCardsList.pending,
          duplicateCardNumberDetails.pending,
          editCreditCardDetails.pending,
          updateCreditCardList.pending,
          deleteCreditCardList.pending,
          addCreditCardsList.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getCreditCardsList.rejected,
          duplicateCardNumberDetails.rejected,
          editCreditCardDetails.rejected,
          updateCreditCardList.rejected,
          deleteCreditCardList.rejected,
          addCreditCardsList.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.creditCardList.isLoading
const creditCards = (state: RootState): CreditCardList[] =>
  state.creditCardList.getCardsList

const creditCardListThunk = {
  getCreditCardsList,
  addCreditCardsList,
  duplicateCardNumberDetails,
  editCreditCardDetails,
  updateCreditCardList,
  deleteCreditCardList,
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
