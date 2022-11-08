import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import myTicketsApi from '../../../middleware/api/Support/MyTickets/myTicketsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  GetTicketsProps,
  MyTicket,
  MyTicketsSliceState,
  TicketHistory,
  TicketHistoryProps,
} from '../../../types/Support/MyTickets/myTicketsTypes'

const getTickets = createAsyncThunk(
  'support/getTickets',
  async (props: GetTicketsProps, thunkApi) => {
    try {
      return await myTicketsApi.getTickets(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const ticketHistoryDetails = createAsyncThunk(
  'support/ticketHistoryDetails',
  async (props: TicketHistoryProps, thunkApi) => {
    try {
      return await myTicketsApi.ticketHistoryDetails(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const cancelTicket = createAsyncThunk(
  'clients/cancelTicket',
  async (requestId: number, thunkApi) => {
    try {
      return await myTicketsApi.cancelTicket(requestId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialMyTicketsState: MyTicketsSliceState = {
  ticketList: { size: 0, list: [] },
  ticketHistory: { size: 0, list: [] },
  allTickets: [],
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
  toggle: '',
}

const myTicketsSlice = createSlice({
  name: 'support',
  initialState: initialMyTicketsState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    toggle: (state, action) => {
      state.toggle = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.ticketList = action.payload
      })
      .addCase(ticketHistoryDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.ticketHistory = action.payload
      })
      .addMatcher(
        isAnyOf(ticketHistoryDetails.pending, getTickets.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})
const isLoading = (state: RootState): LoadingState => state.tickets.isLoading

const allTickets = (state: RootState): MyTicket[] =>
  state.tickets.ticketList.list

const allTicketsListSize = (state: RootState): number =>
  state.tickets.ticketList.size

const ticketHistory = (state: RootState): TicketHistory[] =>
  state.tickets.ticketHistory.list

const toggle = (state: RootState): string => state.tickets.toggle

const pageFromState = (state: RootState): number => state.tickets.currentPage
const pageSizeFromState = (state: RootState): number => state.tickets.pageSize

const myTicketsThunk = {
  getTickets,
  ticketHistoryDetails,
  cancelTicket,
}

const myTicketsSelectors = {
  isLoading,
  allTickets,
  pageFromState,
  pageSizeFromState,
  ticketHistory,
  allTicketsListSize,
  toggle,
}

export const myTicketsService = {
  ...myTicketsThunk,
  actions: myTicketsSlice.actions,
  selectors: myTicketsSelectors,
}

export default myTicketsSlice.reducer
