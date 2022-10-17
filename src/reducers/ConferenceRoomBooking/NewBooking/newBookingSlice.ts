import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import newBookingApi from '../../../middleware/api/ConferenceRoomBooking/NewBooking/LocationList/newBookingApi'
import { RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import {
  GetAllProjectNames,
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

const getAllProjectSearchData = createAsyncThunk(
  'newBooking/getAllProjectSearchData',
  async (searchString: string, thunkApi) => {
    try {
      return await newBookingApi.getAllProjectSearchData(searchString)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialNewBookingListState: newBookingSliceState = {
  loggedEmployeeName: {} as NewBookingLoggedEmployeeName,
  allEmployeesProfiles: [],
  getAllProjects: [],
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
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.allEmployeesProfiles = action.payload
      })
      .addCase(getAllProjectSearchData.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getAllProjects = action.payload
      })
      .addCase(getAllProjectSearchData.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const LoggedEmployeeName = (state: RootState): NewBookingLoggedEmployeeName =>
  state.newBooking.loggedEmployeeName

const allEmployeesProfiles = (
  state: RootState,
): NewBookingLoggedEmployeeName[] => state.newBooking.allEmployeesProfiles

const projectNames = (state: RootState): GetAllProjectNames[] =>
  state.newBooking.getAllProjects

const newBookingThunk = {
  getLoggedEmployeeName,
  getAllEmployees,
  getAllProjectSearchData,
}

const newBookingSelectors = {
  LoggedEmployeeName,
  allEmployeesProfiles,
  projectNames,
}

export const newBookingService = {
  ...newBookingThunk,
  actions: newBookingSlice.actions,
  selectors: newBookingSelectors,
}
export default newBookingSlice.reducer
