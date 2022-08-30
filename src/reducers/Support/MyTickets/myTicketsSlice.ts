import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import myTicketsApi from '../../../middleware/api/Support/MyTickets/myTicketsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  GetTicketsProps,
  MyTicket,
  MyTicketsSliceState,
} from '../../../types/Support/MyTickets/myTicketsTypes'

// const getTickets = createAsyncThunk(
//   'support/getTickets',
//   async (props: GetTicketsProps, thunkApi) => {
//     try {
//       return await myTicketsApi.getTickets(props)
//     } catch (error) {
//       const err = error as AxiosError
//       return thunkApi.rejectWithValue(err.response?.status as ValidationError)
//     }
//   },
// )
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

const initialMyTicketsState: MyTicketsSliceState = {
  ticketList: { list: [], size: 0 },
  allTickets: [],
  isLoading: ApiLoadingState.idle,
}

const myTicketsSlice = createSlice({
  name: 'support',
  initialState: initialMyTicketsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.ticketList = action.payload
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})
const isLoading = (state: RootState): LoadingState => state.tickets.isLoading

const allTickets = (state: RootState): MyTicket[] =>
  state.tickets.ticketList.list

const myTicketsThunk = {
  getTickets,
}

const myTicketsSelectors = {
  isLoading,
  allTickets,
}

export const myTicketsService = {
  ...myTicketsThunk,
  actions: myTicketsSlice.actions,
  selectors: myTicketsSelectors,
}

export default myTicketsSlice.reducer
