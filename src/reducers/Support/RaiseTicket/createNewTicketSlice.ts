import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import createNewTicketApi from '../../../middleware/api/Support/RaiseTicket/createNewTicketApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import {
  CreateNewTicket,
  createNewTicketSliceState,
} from '../../../types/Support/RaiseNewTicket/createNewTicketTypes'

const createNewTicket = createAsyncThunk<
  { ticketId: number },
  CreateNewTicket,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'support/createNewTicket',
  async (raiseNewTicket: CreateNewTicket, thunkApi) => {
    try {
      return await createNewTicketApi.createNewTicket(raiseNewTicket)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const uploadSupportTicketsDocuments = createAsyncThunk(
  'support/uploadSupportTicketsDocuments',
  async (prepareObject: { ticketId: number; file: FormData }, thunkApi) => {
    try {
      return await createNewTicketApi.uploadSupportTicketsDocuments(
        prepareObject,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialCreateTicketState: createNewTicketSliceState = {
  createNewTicket: {} as CreateNewTicket,
  isLoading: ApiLoadingState.idle,
}

const createNewTicketSlice = createSlice({
  name: 'support',
  initialState: initialCreateTicketState,
  reducers: {
    clearNewTicketFields: (state) => {
      state.createNewTicket = {} as CreateNewTicket
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          uploadSupportTicketsDocuments.fulfilled,
          createNewTicket.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(uploadSupportTicketsDocuments.pending, createNewTicket.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const createNewTicketThunk = {
  createNewTicket,
  uploadSupportTicketsDocuments,
}

export const createNewTicketService = {
  ...createNewTicketThunk,
  actions: createNewTicketSlice.actions,
}

export default createNewTicketSlice.reducer
