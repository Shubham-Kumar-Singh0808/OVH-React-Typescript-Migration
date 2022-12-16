import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import eventTypeListApi from '../../../../middleware/api/ConferenceRoomBooking/NewEvent/EventTypeList/eventTypeListApi'
import { RootState } from '../../../../stateStore'
import { ValidationError } from '../../../../types/commonTypes'
import { EventTypeList } from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

const getEventTypes = createAsyncThunk(
  'eventTypeList/getEventTypes',
  async (_, thunkApi) => {
    try {
      return await eventTypeListApi.getAllEventTypes()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addEventType = createAsyncThunk(
  'eventTypeList/addEventType',
  async (name: string, thunkApi) => {
    try {
      return await eventTypeListApi.addEventType(name)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteEventType = createAsyncThunk(
  'eventTypeList/deleteEventType',
  async (id: number, thunkApi) => {
    try {
      return await eventTypeListApi.deleteEventType(id)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateEventType = createAsyncThunk(
  'eventTypeList/updateEventType',
  async (
    props: {
      id: number
      name: string
    },
    thunkApi,
  ) => {
    try {
      return await eventTypeListApi.updateEventType(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

type initialEventTypeSliceState = {
  eventTypes: EventTypeList[]
  isLoading: ApiLoadingState
}

const initialEventTypeState: initialEventTypeSliceState = {
  eventTypes: [],
  isLoading: ApiLoadingState.idle,
}

const eventTypeListSlice = createSlice({
  name: 'eventTypeList',
  initialState: initialEventTypeState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEventTypes.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.eventTypes = action.payload
      })
      .addMatcher(
        isAnyOf(
          getEventTypes.pending,
          addEventType.pending,
          deleteEventType.pending,
          updateEventType.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getEventTypes.fulfilled,
          addEventType.fulfilled,
          deleteEventType.fulfilled,
          updateEventType.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
  },
})

const eventTypeList = (
  state: RootState,
): {
  id: number
  name: string
}[] => state.eventTypeList.eventTypes

const isLoading = (state: RootState): ApiLoadingState =>
  state.eventTypeList.isLoading

const eventTypeListThunk = {
  getEventTypes,
  addEventType,
  deleteEventType,
  updateEventType,
}

const eventTypeListSelectors = {
  eventTypeList,
  isLoading,
}

export const eventTypeListService = {
  ...eventTypeListThunk,
  actions: eventTypeListSlice.actions,
  selectors: eventTypeListSelectors,
}

export default eventTypeListSlice.reducer
