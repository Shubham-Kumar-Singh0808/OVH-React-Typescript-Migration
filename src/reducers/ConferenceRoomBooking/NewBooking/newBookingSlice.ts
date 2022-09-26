import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import newBookingApi from '../../../middleware/api/ConferenceRoomBooking/NewBooking/LocationList/newBookingApi'
import { RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import {
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

const initialNewBookingListState: newBookingSliceState = {
  loggedEmployeeName: [],
  isLoading: ApiLoadingState.idle,
}

const newBookingSlice = createSlice({
  name: 'addLocationList',
  initialState: initialNewBookingListState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getLoggedEmployeeName.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getLoggedEmployeeName.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.loading
        state.loggedEmployeeName = action.payload
      })
  },
})

const LoggedEmployeeName = (state: RootState): NewBookingLoggedEmployeeName[] =>
  state.newBooking.loggedEmployeeName

const newBookingThunk = {
  getLoggedEmployeeName,
  getAllEmployees,
}

const newBookingSelectors = { LoggedEmployeeName }

export const newBookingService = {
  ...newBookingThunk,
  actions: newBookingSlice.actions,
  selectors: newBookingSelectors,
}
export default newBookingSlice.reducer
