import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import bookingListApi from '../../../middleware/api/ConferenceRoomBooking/BookingList/bookingListApi'
import {
  BookingListSliceState,
  GetBookingsForSelection,
  GetBookingsForSelectionProps,
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
  async (props: GetBookingsForSelectionProps, thunkApi) => {
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
  getBookingsForSelection: [],
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
}

const bookingListSlice = createSlice({
  name: 'conferenceRoomBooking',
  initialState: initialBookingListState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
  },

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
      .addCase(getBookingsForSelection.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getBookingsForSelection = action.payload
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

const isLoading = (state: RootState): ApiLoadingState =>
  state.bookingList.isLoading

const pageFromState = (state: RootState): number =>
  state.bookingList.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.bookingList.pageSize

const allMeetingLocations = (state: RootState): MeetingLocations[] =>
  state.bookingList.meetingLocation

const roomsOfLocationResponse = (state: RootState): RoomsOfLocation[] =>
  state.bookingList.roomsOfLocation

const bookingsForSelection = (state: RootState): GetBookingsForSelection[] =>
  state.bookingList.getBookingsForSelection

const bookingListSelectors = {
  isLoading,
  roomsOfLocationResponse,
  allMeetingLocations,
  bookingsForSelection,
  pageFromState,
  pageSizeFromState,
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
