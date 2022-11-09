import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import roomListApi from '../../../../middleware/api/ConferenceRoomBooking/NewBooking/RoomList/roomListApi'
import { RootState } from '../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import {
  AddRoomListSliceState,
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

const initialAddRoomListState: AddRoomListSliceState = {
  meetingRooms: [],
  isLoading: ApiLoadingState.idle,
}

const roomListSlice = createSlice({
  name: 'roomList',
  initialState: initialAddRoomListState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getMeetingRooms.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.meetingRooms = action.payload
      })
      .addMatcher(
        isAnyOf(
          getMeetingRooms.fulfilled,
          addRoom.fulfilled,
          deleteRoom.fulfilled,
          updateRoom.fulfilled,
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
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const roomNames = (state: RootState): getAllMeetingRooms[] =>
  state.roomList.meetingRooms

const addRoomNames = (state: RootState): getAllMeetingRooms[] =>
  state.roomList.meetingRooms

const deleteRoomNames = (state: RootState): getAllMeetingRooms[] =>
  state.roomList.meetingRooms

const updateRoomNames = (state: RootState): getAllMeetingRooms[] =>
  state.roomList.meetingRooms

const isLoading = (state: RootState): LoadingState => state.roomList.isLoading

const roomListThunk = {
  getMeetingRooms,
  addRoom,
  deleteRoom,
  updateRoom,
}

const roomListSelectors = {
  isLoading,
  roomNames,
  addRoomNames,
  deleteRoomNames,
  updateRoomNames,
}

export const roomListService = {
  ...roomListThunk,
  actions: roomListSlice.actions,
  selectors: roomListSelectors,
}

export default roomListSlice.reducer
