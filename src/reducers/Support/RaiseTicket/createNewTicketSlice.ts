import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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
  number | undefined,
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

const initialCreateTicketState: createNewTicketSliceState = {
  createNewTicket: {} as CreateNewTicket,
  isLoading: ApiLoadingState.idle,
}

const createNewTicketSlice = createSlice({
  name: 'support',
  initialState: initialCreateTicketState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createNewTicket.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(createNewTicket.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
  },
})

const createNewTicketThunk = {
  createNewTicket,
}

export const createNewTicketService = {
  ...createNewTicketThunk,
  actions: createNewTicketSlice.actions,
}

export default createNewTicketSlice.reducer
