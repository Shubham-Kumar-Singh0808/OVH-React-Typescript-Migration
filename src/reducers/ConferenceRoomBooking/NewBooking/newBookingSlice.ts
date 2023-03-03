import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import newBookingApi from '../../../middleware/api/ConferenceRoomBooking/NewBooking/newBookingApi'
import { RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import { GetBookingsForSelection } from '../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'
import {
  ConfirmNewMeetingAppointment,
  GetBookedRoomParams,
  NewBookingLoggedEmployeeName,
  newBookingSliceState,
} from '../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'

const confirmNewMeetingAppointment = createAsyncThunk(
  'confirmNewMeetingAppointment/getAllProjectSearchData',
  async (newMeetingAppointment: ConfirmNewMeetingAppointment, thunkApi) => {
    try {
      return await newBookingApi.confirmNewMeetingAppointment(
        newMeetingAppointment,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllBookedDetailsForRoom = createAsyncThunk(
  'confirmNewMeetingAppointment/getAllBookedDetailsForRoom',
  async (props: GetBookedRoomParams, thunkApi) => {
    try {
      return await newBookingApi.getAllBookedDetailsForRoom(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialNewBookingListState: newBookingSliceState = {
  loggedEmployeeName: {} as NewBookingLoggedEmployeeName,
  allEmployeesProfiles: [],
  isLoading: ApiLoadingState.idle,
  toggle: '',
  getBookingsForSelection: [],
}

const newBookingSlice = createSlice({
  name: 'addLocationList',
  initialState: initialNewBookingListState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllBookedDetailsForRoom.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getBookingsForSelection = action.payload
      })
      .addCase(getAllBookedDetailsForRoom.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const newBookingThunk = {
  confirmNewMeetingAppointment,
  getAllBookedDetailsForRoom,
}

const slotsBookedForRoom = (state: RootState): GetBookingsForSelection[] =>
  state.newBooking.getBookingsForSelection

const projectNotesSelectors = {
  slotsBookedForRoom,
}

export const newBookingService = {
  ...newBookingThunk,
  actions: newBookingSlice.actions,
  selectors: projectNotesSelectors,
}
export default newBookingSlice.reducer
