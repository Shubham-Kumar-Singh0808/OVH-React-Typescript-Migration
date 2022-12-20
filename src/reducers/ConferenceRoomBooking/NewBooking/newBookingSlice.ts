import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import newBookingApi from '../../../middleware/api/ConferenceRoomBooking/NewBooking/LocationList/newBookingApi'
import { RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import {
  ConfirmNewMeetingAppointment,
  NewBookingLoggedEmployeeName,
  newBookingSliceState,
} from '../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'

const getLoggedEmployeeName = createAsyncThunk(
  'newBooking/getLoggedEmployeeName',
  async (_, thunkApi) => {
    try {
      return await newBookingApi.getLoggedEmployeeName()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllEmployees = createAsyncThunk(
  'newBooking/getAllEmployees',
  async (searchString: string, thunkApi) => {
    try {
      return await newBookingApi.getAllEmployees(searchString)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

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
  reducers: {
    toggle: (state, action) => {
      state.toggle = action.payload
    },
  },
  extraReducers(builder) {
    builder

      .addCase(getLoggedEmployeeName.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getLoggedEmployeeName.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.loading
        state.loggedEmployeeName = action.payload
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.allEmployeesProfiles = action.payload
      })
  },
})

const LoggedEmployeeName = (state: RootState): NewBookingLoggedEmployeeName =>
  state.newBooking.loggedEmployeeName

const toggle = (state: RootState): string => state.newBooking.toggle

const allEmployeesProfiles = (
  state: RootState,
): NewBookingLoggedEmployeeName[] => state.newBooking.allEmployeesProfiles

const newBookingThunk = {
  getLoggedEmployeeName,
  getAllEmployees,
  confirmNewMeetingAppointment,
}

const newBookingSelectors = {
  LoggedEmployeeName,
  allEmployeesProfiles,
  toggle,
}

export const newBookingService = {
  ...newBookingThunk,
  actions: newBookingSlice.actions,
  selectors: newBookingSelectors,
}
export default newBookingSlice.reducer
