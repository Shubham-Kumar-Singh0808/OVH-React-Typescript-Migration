import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import updateTicketApi from '../../../../middleware/api/Support/TicketApprovals/UpdateTicket/updateTicketApi'
import { RootState } from '../../../../stateStore'
import { ValidationError } from '../../../../types/commonTypes'
import {
  GetActiveEmployee,
  GetAudit,
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

const uploadSupportDoc = createAsyncThunk(
  'updateTicket/uploadSupportDoc',
  async (prepareObject: { ticketId: number; file: FormData }, thunkApi) => {
    try {
      return await updateTicketApi.uploadSupportDoc(prepareObject)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateTicketDetails = createAsyncThunk(
  'updateTicket/updateTicketDetails',
  async (updateObject: GetTicketToEdit, thunkApi) => {
    try {
      return await updateTicketApi.updateTicketDetails(updateObject)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const approveTicket = createAsyncThunk(
  'updateTicket/approveTicket',
  async (ticketId: number, thunkApi) => {
    try {
      return await updateTicketApi.approveTicket(ticketId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialUpdateTicketSliceState: UpdateTicketSliceState = {
  isLoading: ApiLoadingState.idle,
  activeEmployees: [],
  auditDetails: { size: 0, list: [] },
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
          uploadSupportDoc.fulfilled,
          updateTicketDetails.fulfilled,
          approveTicket.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getTicketToEdit.pending,
          getActiveEmployeeList.pending,
          getAudit.pending,
          uploadSupportDoc.pending,
          updateTicketDetails.pending,
          approveTicket.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const isLoading = (state: RootState): ApiLoadingState =>
  state.updateTicket.isLoading

const ticketHistoryDetails = (state: RootState): GetAudit[] =>
  state.updateTicket.auditDetails.list

const ticketDetailsToEdit = (state: RootState): GetTicketToEdit =>
  state.updateTicket.ticketDetailsToEdit

const activeEmployees = (state: RootState): GetActiveEmployee[] =>
  state.updateTicket.activeEmployees

const updateTicketThunk = {
  getTicketToEdit,
  getActiveEmployeeList,
  getAudit,
  uploadSupportDoc,
  updateTicketDetails,
  approveTicket,
}

const updateTicketSelectors = {
  isLoading,
  ticketHistoryDetails,
  ticketDetailsToEdit,
  activeEmployees,
}

export const updateTicketService = {
  ...updateTicketThunk,
  actions: updateTicketSlice.actions,
  selectors: updateTicketSelectors,
}

export default updateTicketSlice.reducer
