import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import invoicesApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/Invoices/invoicesApi'
import { AppDispatch, RootState } from '../../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../../types/commonTypes'
import {
  invoicesListSlice,
  InvoicesOfMilestone,
  InvoicesOfMilestoneList,
  InvoicesList,
  MilestoneList,
  InvoiceSummary,
} from '../../../../../types/ProjectManagement/Project/ProjectView/Invoices/invoicesTypes'

const getClosedMilestonesAndCRs = createAsyncThunk<
  InvoicesList,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectView/getClosedMilestonesAndCRs',
  async (projectId: number | string, thunkApi) => {
    try {
      return await invoicesApi.getClosedMilestonesAndCRs(projectId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getInvoicesOfMilestone = createAsyncThunk<
  InvoicesOfMilestoneList,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectView/getInvoicesOfMilestone',
  async (milestoneId: number, thunkApi) => {
    try {
      return await invoicesApi.getInvoicesOfMilestone(milestoneId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getInvoiceSummary = createAsyncThunk<
  InvoiceSummary,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('projectView/getInvoiceSummary', async (invoiceId: number, thunkApi) => {
  try {
    return await invoicesApi.getInvoiceSummary(invoiceId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialInvoicesState: invoicesListSlice = {
  invoicesList: { CRList: [], milestoneList: [] },
  milestoneList: [],
  isLoading: ApiLoadingState.idle,
  invoicesOfMilestoneList: { listSize: 0, list: [] },
  invoiceSummary: {} as InvoiceSummary,
}

const invoiceSlice = createSlice({
  name: 'projectView',
  initialState: initialInvoicesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClosedMilestonesAndCRs.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.invoicesList = action.payload
      })
      .addCase(getInvoicesOfMilestone.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.invoicesOfMilestoneList = action.payload
      })
      .addCase(getInvoiceSummary.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.invoiceSummary = action.payload
      })
      .addMatcher(
        isAnyOf(
          getClosedMilestonesAndCRs.pending,
          getInvoicesOfMilestone.pending,
          getInvoiceSummary.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.projectInvoices.isLoading

const allMilestoneList = (state: RootState): MilestoneList[] =>
  state.projectInvoices.invoicesList.milestoneList

const invoicesOfMilestoneList = (state: RootState): InvoicesOfMilestone[] =>
  state.projectInvoices.invoicesOfMilestoneList.list

const invoicesOfMilestoneSize = (state: RootState): number =>
  state.projectInvoices.invoicesOfMilestoneList.listSize

const invoiceSummary = (state: RootState): InvoiceSummary =>
  state.projectInvoices.invoiceSummary

const invoicesThunk = {
  getClosedMilestonesAndCRs,
  getInvoicesOfMilestone,
  getInvoiceSummary,
}

const inVoicesSelectors = {
  isLoading,
  allMilestoneList,
  invoicesOfMilestoneList,
  invoicesOfMilestoneSize,
  invoiceSummary,
}

export const invoicesService = {
  ...invoicesThunk,
  actions: invoiceSlice.actions,
  selectors: inVoicesSelectors,
}

export default invoiceSlice.reducer
