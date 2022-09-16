import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import eventTypeListApi from '../../../../middleware/api/ConferenceRoomBooking/NewEvent/EventTypeList/eventTypeListApi'
import { RootState } from '../../../../stateStore'
import { ValidationError } from '../../../../types/commonTypes'

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

type initialEventTypeSliceState = {
  eventTypeList: {
    id: number
    name: string
  }[]
  isLoading: ApiLoadingState
}

const initialEventTypeState: initialEventTypeSliceState = {
  eventTypeList: [],
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
        state.eventTypeList = action.payload
      })
      .addMatcher(isAnyOf(getEventTypes.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const eventTypeList = (
  state: RootState,
): {
  id: number
  name: string
}[] => state.eventTypeList.eventTypeList

const eventTypeListThunk = {
  getEventTypes,
}

const eventTypeListSelectors = {
  eventTypeList,
}

export const eventTypeListService = {
  ...eventTypeListThunk,
  actions: eventTypeListSlice.actions,
  selectors: eventTypeListSelectors,
}

export default eventTypeListSlice.reducer
