import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import investmentCheckListApi from '../../../middleware/api/Finance/InvestmentCheckList/investmentCheckListApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  Invest,
  InvestmentCheckListSliceState,
  Section,
} from '../../../types/Finance/InvestmentCheckList/investmentCheckListTypes'

const getInvestments = createAsyncThunk<
  Invest[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('investmentCheckList/getInvestments', async (sectionId: number, thunkApi) => {
  try {
    return await investmentCheckListApi.getInvestments(sectionId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getSections = createAsyncThunk(
  'investmentCheckList/getSections',
  async (_, thunkApi) => {
    try {
      return await investmentCheckListApi.getSections()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialInvestmentCheckListState: InvestmentCheckListSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  investments: [],
  sections: [],
}

const investmentCheckListSlice = createSlice({
  name: 'investmentCheckList',
  initialState: initialInvestmentCheckListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInvestments.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.investments = [
          ...state.investments,
          ...(action.payload as Invest[]),
        ]
      })
      .addCase(getSections.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.sections = action.payload
      })
      .addMatcher(
        isAnyOf(getSections.pending, getInvestments.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(getSections.rejected, getInvestments.rejected),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.investmentCheckList.isLoading

const investments = (state: RootState): Invest[] =>
  state.investmentCheckList.investments

const sections = (state: RootState): Section[] =>
  state.investmentCheckList.sections

const investmentCheckListThunk = {
  getInvestments,
  getSections,
}

const investmentCheckListSelectors = {
  isLoading,
  investments,
  sections,
}

export const investmentCheckListService = {
  ...investmentCheckListThunk,
  actions: investmentCheckListSlice.actions,
  selectors: investmentCheckListSelectors,
}

export default investmentCheckListSlice.reducer
