import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import eventListApi from '../../../middleware/api/ConferenceRoomBooking/EventList/eventListApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  Event,
  EventListApiProps,
  EventListSliceState,
} from '../../../types/ConferenceRoomBooking/EventList/eventListTypes'

const getAllEvents = createAsyncThunk(
  'eventList/getAllEvents',
  async (props: EventListApiProps, thunkApi) => {
    try {
      return await eventListApi.getAllEvents(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const cancelEvent = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('eventList/cancelEvent', async (eventId, thunkApi) => {
  try {
    return await eventListApi.cancelEvent(eventId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialEventListState: EventListSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  events: [],
  selectedMonth: '',
  listSize: 0,
}
const eventListSlice = createSlice({
  name: 'eventList',
  initialState: initialEventListState,
  reducers: {
    changeSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload as string
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.events = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(cancelEvent.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(
        isAnyOf(getAllEvents.pending, cancelEvent.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState => state.eventList.isLoading
const events = (state: RootState): Event[] => state.eventList.events
const selectedMonth = (state: RootState): string =>
  state.eventList.selectedMonth
const listSize = (state: RootState): number => state.eventList.listSize

export const eventListThunk = {
  getAllEvents,
  cancelEvent,
}

export const eventListSelectors = {
  isLoading,
  events,
  listSize,
  selectedMonth,
}

export const eventListService = {
  ...eventListThunk,
  actions: eventListSlice.actions,
  selectors: eventListSelectors,
}

export default eventListSlice.reducer
