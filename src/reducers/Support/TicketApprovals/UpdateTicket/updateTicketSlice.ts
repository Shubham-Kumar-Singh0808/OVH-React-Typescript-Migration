import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import updateTicketApi from '../../../../middleware/api/Support/TicketApprovals/UpdateTicket/updateTicketApi'
import { RootState } from '../../../../stateStore'
import { ValidationError } from '../../../../types/commonTypes'
import {
  GetTicketToEdit,
  UpdateTicketSliceState,
} from '../../../../types/Support/TicketApprovals/UpdateTicket/updateTicketTypes'

const getTicketToEdit = createAsyncThunk(
  'updateTicket/getTicketToEdit',
  async (ticketId: number, thunkApi) => {
    try {
      return await updateTicketApi.getTicketToEdit(ticketId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getActiveEmployeeList = createAsyncThunk(
  'updateTicket/getActiveEmployeeList',
  async (_, thunkApi) => {
    try {
      return await updateTicketApi.getActiveEmployeeList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAudit = createAsyncThunk(
  'updateTicket/getAudit',
  async (ticketId: number, thunkApi) => {
    try {
      return await updateTicketApi.getAudit(ticketId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialUpdateTicketSliceState: UpdateTicketSliceState = {
  isLoading: ApiLoadingState.idle,
  activeEmployees: [],
  auditDetails: [],
  ticketDetailsToEdit: {} as GetTicketToEdit,
}

const updateTicketSlice = createSlice({
  name: 'updateTicket',
  initialState: initialUpdateTicketSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTicketToEdit.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.ticketDetailsToEdit = action.payload
      })
      .addCase(getActiveEmployeeList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.activeEmployees = action.payload
      })
      .addCase(getAudit.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.auditDetails = action.payload
      })
      .addMatcher(
        isAnyOf(
          getTicketToEdit.pending,
          getActiveEmployeeList.pending,
          getAudit.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const updateTicketThunk = {
  getTicketToEdit,
  getActiveEmployeeList,
  getAudit,
}

const isLoading = (state: RootState): ApiLoadingState =>
  state.updateTicket.isLoading

const updateTicketSelectors = {
  isLoading,
}

export const updateTicketService = {
  ...updateTicketThunk,
  actions: updateTicketSlice.actions,
  selectors: updateTicketSelectors,
}

export default updateTicketSlice.reducer
