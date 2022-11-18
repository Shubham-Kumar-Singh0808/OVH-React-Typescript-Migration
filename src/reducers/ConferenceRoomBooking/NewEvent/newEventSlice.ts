import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import newEventApi from '../../../middleware/api/ConferenceRoomBooking/NewEvent/newEventApi'
import { RootState } from '../../../stateStore'
import {
  InitialNewEventSliceState,
  LoggedEmployee,
  ProjectMembers,
  RoomsByLocation,
  UniqueAttendeeParams,
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

const getProjectMembers = createAsyncThunk(
  'newEventSlice/getProjectMembers',
  async (projectName: string, thunkApi) => {
    try {
      return await newEventApi.getProjectMembers(projectName)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const uniqueAttendee = createAsyncThunk(
  'newEventSlice/uniqueAttendee',
  async (props: UniqueAttendeeParams, thunkApi) => {
    try {
      return await newEventApi.uniqueAttendee(props)
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
  projectMembers: [],
}

const newEventSlice = createSlice({
  name: 'newEvent',
  initialState: initialNewEventState,
  reducers: {
    clearProjectMembers: (state) => {
      state.projectMembers = []
    },
  },
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
      .addCase(getProjectMembers.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.projectMembers = action.payload
      })
      .addCase(uniqueAttendee.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(
        isAnyOf(
          getLoggedEmployee.pending,
          getRoomsByLocation.pending,
          getProjectMembers.pending,
          uniqueAttendee.pending,
        ),
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

const projectMembers = (state: RootState): ProjectMembers[] =>
  state.newEvent.projectMembers

const newEventThunk = {
  getLoggedEmployee,
  getRoomsByLocation,
  getAllEmployees,
  getProjectMembers,
}

const newEventSelectors = {
  isLoading,
  loggedEmployee,
  roomsByLocation,
  allEmployeesProfiles,
  projectMembers,
}

export const newEventService = {
  ...newEventThunk,
  actions: newEventSlice.actions,
  selectors: newEventSelectors,
}

export default newEventSlice.reducer
