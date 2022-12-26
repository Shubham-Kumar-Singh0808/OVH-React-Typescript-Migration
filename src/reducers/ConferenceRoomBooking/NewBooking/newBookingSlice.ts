import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import newBookingApi from '../../../middleware/api/ConferenceRoomBooking/NewBooking/newBookingApi'
import { ValidationError } from '../../../types/commonTypes'
import {
  ConfirmNewMeetingAppointment,
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

const initialNewBookingListState: newBookingSliceState = {
  loggedEmployeeName: {} as NewBookingLoggedEmployeeName,
  allEmployeesProfiles: [],
  isLoading: ApiLoadingState.idle,
  toggle: '',
}

const newBookingSlice = createSlice({
  name: 'addLocationList',
  initialState: initialNewBookingListState,
  reducers: {},
})

const newBookingThunk = {
  confirmNewMeetingAppointment,
}

export const newBookingService = {
  ...newBookingThunk,
  actions: newBookingSlice.actions,
}
export default newBookingSlice.reducer
