import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import newEventApi from '../../../middleware/api/ConferenceRoomBooking/NewEvent/newEventApi'
import { RootState } from '../../../stateStore'
import {
  AddEvent,
  GetAllBookedDetailsForEvent,
  GetBookedEventsParams,
  InitialNewEventSliceState,
  LoggedEmployee,
  ProjectMember,
  RoomsByLocation,
  TrainerDetails,
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

const getAllBookedDetailsForEvent = createAsyncThunk(
  'newEventSlice/getAllBookedDetailsForEvent',
  async (props: GetBookedEventsParams, thunkApi) => {
    try {
      return await newEventApi.getAllBookedDetailsForEvent(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const timeCheck = createAsyncThunk(
  'newEventSlice/timeCheck',
  async (time: string, thunkApi) => {
    try {
      return await newEventApi.timeCheck(time)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addNewEvent = createAsyncThunk(
  'newEventSlice/addNewEvent',
  async (props: AddEvent, thunkApi) => {
    try {
      return await newEventApi.addNewEvent(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialNewEventState: InitialNewEventSliceState = {
  isLoading: ApiLoadingState.idle,
  loggedEmployee: {} as LoggedEmployee,
  roomsByLocation: [],
  allEmployeesProfiles: [],
  projectMembers: [],
  error: null,
  allBookedDetailsForEvent: [],
  trainer: {} as TrainerDetails,
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
        state.error = null
      })
      .addCase(getAllBookedDetailsForEvent.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.allBookedDetailsForEvent = action.payload
      })
      .addCase(addNewEvent.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addCase(uniqueAttendee.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as number
      })
      .addMatcher(
        isAnyOf(
          getLoggedEmployee.pending,
          getRoomsByLocation.pending,
          getProjectMembers.pending,
          uniqueAttendee.pending,
          getAllBookedDetailsForEvent.pending,
          addNewEvent.pending,
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

const projectMembers = (state: RootState): ProjectMember[] =>
  state.newEvent.projectMembers

const trainer = (state: RootState): TrainerDetails => state.newEvent.trainer

const selectError = (state: RootState): number => state.newEvent.error as number

const allBookedDetailsForEvent = (
  state: RootState,
): GetAllBookedDetailsForEvent[] => state.newEvent.allBookedDetailsForEvent

const newEventThunk = {
  getLoggedEmployee,
  getRoomsByLocation,
  getAllEmployees,
  getProjectMembers,
  uniqueAttendee,
  getAllBookedDetailsForEvent,
  timeCheck,
  addNewEvent,
}

const newEventSelectors = {
  isLoading,
  loggedEmployee,
  roomsByLocation,
  allEmployeesProfiles,
  projectMembers,
  selectError,
  allBookedDetailsForEvent,
  trainer,
}

export const newEventService = {
  ...newEventThunk,
  actions: newEventSlice.actions,
  selectors: newEventSelectors,
}

export default newEventSlice.reducer
