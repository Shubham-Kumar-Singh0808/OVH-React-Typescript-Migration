import type { PayloadAction } from '@reduxjs/toolkit'
// eslint-disable-next-line no-duplicate-imports
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import bookingListApi from '../../../middleware/api/ConferenceRoomBooking/BookingList/bookingListApi'
import {
  BookingListSliceState,
  ChangeBookingStatusParams,
  EditMeetingRequest,
  GetBookingsForSelection,
  GetBookingsForSelectionProps,
  MeetingLocations,
  RoomsOfLocation,
  UpdateRoomBooking,
} from '../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'
import { UniqueAttendeeParams } from '../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

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

const cancelRoomBooking = createAsyncThunk(
  'conferenceRoomBooking/cancelRoomBooking',
  async (id: number, thunkApi) => {
    try {
      return await bookingListApi.cancelRoomBooking(id)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const editMeetingRequest = createAsyncThunk<
  EditMeetingRequest | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('conferenceRoomBooking/editMeetingRequest', async (id: number, thunkApi) => {
  try {
    return await bookingListApi.editMeetingRequest(id)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const editUniqueAttendee = createAsyncThunk(
  'newEventSlice/uniqueAttendee',
  async (props: UniqueAttendeeParams, thunkApi) => {
    try {
      return await bookingListApi.editUniqueAttendee(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const confirmUpdateMeetingRequest = createAsyncThunk<
  number | undefined,
  UpdateRoomBooking,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'conferenceRoomBooking/confirmUpdateMeetingRequest',
  async (updateMeetingAppointment: UpdateRoomBooking, thunkApi) => {
    try {
      return await bookingListApi.confirmUpdateMeetingRequest(
        updateMeetingAppointment,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const changeMeetingStatusThunk = createAsyncThunk(
  'conferenceRoomBooking/changeMeetingStatusThunk',
  async (finalParams: ChangeBookingStatusParams, thunkApi) => {
    try {
      return await bookingListApi.changeMeetingStatus(finalParams)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
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
  editMeetingRequest: {} as EditMeetingRequest,
  currentFilters: { location: -1, status: '', room: '', meetingStatus: '' },
  LocationValue: '1',
  RoomValue: '',
  MeetingStatus: 'New',
  SelectCustom: 'Today',
  FromDateValue: '',
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
    clearRoomTable: (state) => {
      state.roomsOfLocation = []
    },
    setLocationValue: (state, action) => {
      state.LocationValue = action.payload
    },
    setRoomValue: (state, action) => {
      state.RoomValue = action.payload
    },
    setMeetingStatus: (state, action) => {
      state.MeetingStatus = action.payload
    },
    setSelectCustom: (state, action) => {
      state.SelectCustom = action.payload
    },
    setFromDateValue: (state, action) => {
      state.FromDateValue = action.payload
    },
    saveBookingFilterOptions: (
      state,
      action: PayloadAction<GetBookingsForSelectionProps>,
    ) => {
      state.currentFilters = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllMeetingLocations.fulfilled, (state, action) => {
        state.meetingLocation = action.payload
      })
      .addCase(getRoomsOfLocation.fulfilled, (state, action) => {
        state.roomsOfLocation = action.payload as RoomsOfLocation[]
      })
      .addCase(getBookingsForSelection.fulfilled, (state, action) => {
        state.getBookingsForSelection = action.payload
      })
      .addCase(editMeetingRequest.fulfilled, (state, action) => {
        state.editMeetingRequest = action.payload as EditMeetingRequest
      })
      .addMatcher(
        isAnyOf(
          getAllMeetingLocations.fulfilled,
          getRoomsOfLocation.fulfilled,
          getBookingsForSelection.fulfilled,
          editMeetingRequest.fulfilled,
          changeMeetingStatusThunk.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getAllMeetingLocations.pending,
          getRoomsOfLocation.pending,
          getBookingsForSelection.pending,
          editMeetingRequest.pending,
          changeMeetingStatusThunk.pending,
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

const editExistingMeetingRequest = (state: RootState): EditMeetingRequest =>
  state.bookingList.editMeetingRequest

const LocationValue = (state: RootState): string =>
  state.bookingList.LocationValue
const RoomValue = (state: RootState): string => state.bookingList.RoomValue
const MeetingStatus = (state: RootState): string =>
  state.bookingList.MeetingStatus
const SelectCustom = (state: RootState): string =>
  state.bookingList.SelectCustom
const FromDateValue = (state: RootState): string | Date =>
  state.bookingList.FromDateValue

const bookingListSelectors = {
  isLoading,
  roomsOfLocationResponse,
  allMeetingLocations,
  bookingsForSelection,
  pageFromState,
  pageSizeFromState,
  editExistingMeetingRequest,
  LocationValue,
  RoomValue,
  MeetingStatus,
  SelectCustom,
  FromDateValue,
}

const bookingListThunk = {
  getAllMeetingLocations,
  getRoomsOfLocation,
  getBookingsForSelection,
  cancelRoomBooking,
  editMeetingRequest,
  editUniqueAttendee,
  confirmUpdateMeetingRequest,
  changeMeetingStatusThunk,
}

export const bookingListService = {
  ...bookingListThunk,
  actions: bookingListSlice.actions,
  selectors: bookingListSelectors,
}

export default bookingListSlice.reducer
