import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import bookingListApi from '../../../middleware/api/ConferenceRoomBooking/BookingList/bookingListApi'
import {
  BookingListSliceState,
  getBookingsForSelectionProps,
  MeetingLocations,
  RoomsOfLocation,
} from '../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'

const getAllMeetingLocations = createAsyncThunk(
  'conferenceRoomBooking/getAllMeetingLocations',
  async (_, thunkApi) => {
    try {
      return await bookingListApi.getAllMeetingLocations()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getRoomsOfLocation = createAsyncThunk<
  RoomsOfLocation[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('conferenceRoomBooking/getRoomsOfLocation', async (categoryId, thunkApi) => {
  try {
    return await bookingListApi.getRoomsOfLocation(categoryId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getBookingsForSelection = createAsyncThunk(
  'conferenceRoomBooking/getBookingsForSelection',
  async (props: getBookingsForSelectionProps, thunkApi) => {
    try {
      return await bookingListApi.getBookingsForSelection(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialBookingListState: BookingListSliceState = {
  meetingLocation: [],
  roomsOfLocation: [],
  isLoading: ApiLoadingState.idle,
}

const bookingListSlice = createSlice({
  name: 'conferenceRoomBooking',
  initialState: initialBookingListState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllMeetingLocations.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.meetingLocation = action.payload
      })
      .addCase(getRoomsOfLocation.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.roomsOfLocation = action.payload as RoomsOfLocation[]
      })
      .addMatcher(
        isAnyOf(
          getAllMeetingLocations.pending,
          getRoomsOfLocation.pending,
          getBookingsForSelection.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const AllMeetingLocations = (state: RootState): MeetingLocations[] =>
  state.bookingList.meetingLocation

const RoomsOfLocationResponse = (state: RootState): RoomsOfLocation[] =>
  state.bookingList.roomsOfLocation

const bookingListSelectors = {
  RoomsOfLocationResponse,
  AllMeetingLocations,
}

const bookingListThunk = {
  getAllMeetingLocations,
  getRoomsOfLocation,
  getBookingsForSelection,
}

export const bookingListService = {
  ...bookingListThunk,
  actions: bookingListSlice.actions,
  selectors: bookingListSelectors,
}

export default bookingListSlice.reducer
