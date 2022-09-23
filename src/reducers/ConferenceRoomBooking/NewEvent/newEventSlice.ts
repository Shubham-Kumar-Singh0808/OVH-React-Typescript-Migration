import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import newEventApi from '../../../middleware/api/ConferenceRoomBooking/NewEvent/newEventApi'
import { RootState } from '../../../stateStore'
import {
  InitialNewEventSliceState,
  LoggedEmployee,
  RoomsByLocation,
} from '../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'
import { ValidationError } from '../../../types/SidebarMenu/sidebarMenuType'

const getLoggedEmployee = createAsyncThunk(
  'newEventSlice/getLoggedEmployee',
  async (_, thunkApi) => {
    try {
      return await newEventApi.getLoggedEmployee()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getRoomsByLocation = createAsyncThunk(
  'newEventSlice/getRoomsByLocation',
  async (id: number, thunkApi) => {
    try {
      return await newEventApi.getRoomsByLocation(id)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllEmployees = createAsyncThunk(
  'newEventSlice/getAllEmployees',
  async (searchString: string, thunkApi) => {
    try {
      return await newEventApi.getAllEmployees(searchString)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialNewEventState: InitialNewEventSliceState = {
  isLoading: ApiLoadingState.idle,
  loggedEmployee: {} as LoggedEmployee,
  roomsByLocation: [],
  allEmployeesProfiles: [],
}

const newEventSlice = createSlice({
  name: 'newEvent',
  initialState: initialNewEventState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedEmployee.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.loggedEmployee = action.payload
      })
      .addCase(getRoomsByLocation.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.roomsByLocation = action.payload
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.allEmployeesProfiles = action.payload
      })
      .addMatcher(
        isAnyOf(getLoggedEmployee.pending, getRoomsByLocation.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const isLoading = (state: RootState): ApiLoadingState =>
  state.newEvent.isLoading

const loggedEmployee = (state: RootState): LoggedEmployee =>
  state.newEvent.loggedEmployee

const roomsByLocation = (state: RootState): RoomsByLocation[] =>
  state.newEvent.roomsByLocation

const allEmployeesProfiles = (state: RootState): LoggedEmployee[] =>
  state.newEvent.allEmployeesProfiles

const newEventThunk = {
  getLoggedEmployee,
  getRoomsByLocation,
  getAllEmployees,
}

const newEventSelectors = {
  isLoading,
  loggedEmployee,
  roomsByLocation,
  allEmployeesProfiles,
}

export const newEventService = {
  ...newEventThunk,
  actions: newEventSlice.actions,
  selectors: newEventSelectors,
}

export default newEventSlice.reducer
