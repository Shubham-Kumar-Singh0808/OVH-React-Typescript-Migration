import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import roomListApi from '../../../../middleware/api/ConferenceRoomBooking/NewBooking/RoomList/roomListApi'
import { AppDispatch, RootState } from '../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import {
  AddRoomListSliceState,
  getAllMeetingLocations,
  getAllMeetingRooms,
} from '../../../../types/ConferenceRoomBooking/NewBooking/RoomList/roomListTypes'

const getMeetingRooms = createAsyncThunk(
  'roomList/getMeetingRooms',
  async (_, thunkApi) => {
    try {
      return await roomListApi.getMeetingRooms()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addRoom = createAsyncThunk(
  'roomList/addRoom',
  async (
    {
      roomName,
      locationId,
    }: {
      roomName: string
      locationId: number
    },
    thunkApi,
  ) => {
    try {
      return await roomListApi.addRoom({
        roomName,
        locationId,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteRoom = createAsyncThunk(
  'roomList/deleteRoom',
  async (roomId: number, thunkApi) => {
    try {
      return await roomListApi.deleteRoom(roomId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateRoom = createAsyncThunk(
  'roomList/deleteRoom',
  async (
    {
      id,
      locationId,
      locationName,
      roomName,
      roomStatus,
    }: {
      id: number
      locationId: number
      locationName: string
      roomName: string
      roomStatus: boolean
    },
    thunkApi,
  ) => {
    try {
      return await roomListApi.updateRoom({
        id,
        locationId,
        locationName,
        roomName,
        roomStatus,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getRoomsOfLocation = createAsyncThunk<
  getAllMeetingRooms[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('roomList/getRoomsOfLocation', async (locationId, thunkApi) => {
  try {
    return await roomListApi.getRoomsOfLocation(locationId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getMeetingLocations = createAsyncThunk(
  'roomList/getMeetingLocations',
  async (_, thunkApi) => {
    try {
      return await roomListApi.getMeetingLocations()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAddRoomListState: AddRoomListSliceState = {
  meetingRooms: [],
  meetingLocations: [],
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
}

const roomListSlice = createSlice({
  name: 'roomList',
  initialState: initialAddRoomListState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
  },
  extraReducers(builder) {
    builder

      .addCase(getMeetingRooms.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.meetingRooms = action.payload
      })
      .addCase(getRoomsOfLocation.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.meetingRooms = action.payload as getAllMeetingRooms[]
      })
      .addCase(getMeetingLocations.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.meetingLocations = action.payload
      })
      .addMatcher(
        isAnyOf(
          getMeetingRooms.fulfilled,
          addRoom.fulfilled,
          deleteRoom.fulfilled,
          updateRoom.fulfilled,
          getMeetingLocations.fulfilled,
          getRoomsOfLocation.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getMeetingRooms.pending,
          addRoom.pending,
          updateRoom.pending,
          deleteRoom.pending,
          getRoomsOfLocation.pending,
          getMeetingLocations.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getMeetingRooms.rejected,
          addRoom.rejected,
          updateRoom.rejected,
          deleteRoom.rejected,
          getRoomsOfLocation.rejected,
          getMeetingLocations.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const roomNames = (state: RootState): getAllMeetingRooms[] =>
  state.roomList.meetingRooms

const locationNames = (state: RootState): getAllMeetingLocations[] =>
  state.roomList.meetingLocations

const addRoomNames = (state: RootState): getAllMeetingRooms[] =>
  state.roomList.meetingRooms

const deleteRoomNames = (state: RootState): getAllMeetingRooms[] =>
  state.roomList.meetingRooms

const updateRoomNames = (state: RootState): getAllMeetingRooms[] =>
  state.roomList.meetingRooms

const isLoading = (state: RootState): LoadingState => state.roomList.isLoading

const pageFromState = (state: RootState): number => state.roomList.currentPage
const pageSizeFromState = (state: RootState): number => state.roomList.pageSize

const roomsOfLocationResponse = (state: RootState): getAllMeetingRooms[] =>
  state.roomList.meetingRooms

const roomListThunk = {
  getMeetingRooms,
  addRoom,
  deleteRoom,
  updateRoom,
  getRoomsOfLocation,
  getMeetingLocations,
}

const roomListSelectors = {
  isLoading,
  roomNames,
  addRoomNames,
  deleteRoomNames,
  updateRoomNames,
  pageSizeFromState,
  pageFromState,
  roomsOfLocationResponse,
  locationNames,
}

export const roomListService = {
  ...roomListThunk,
  actions: roomListSlice.actions,
  selectors: roomListSelectors,
}

export default roomListSlice.reducer
