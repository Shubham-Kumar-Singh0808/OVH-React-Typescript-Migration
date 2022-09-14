import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import addLocationListApi from '../../../../middleware/api/Conference Room Booking/New Booking/Add Location List/addLocationListApi'
import { RootState } from '../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import {
  AddLocationSliceState,
  getAllMeetingLocations,
} from '../../../../types/Conference Room Booking/New Booking/Add Location List/addLocationListTypes'

const getAllMeetingLocationsData = createAsyncThunk(
  'addLocationList/getAllMeetingLocationsData',
  async (_, thunkApi) => {
    try {
      return await addLocationListApi.getAllMeetingLocationsData()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addLocation = createAsyncThunk(
  'addLocationList/addLocation',
  async (locationName: string, thunkApi) => {
    try {
      return await addLocationListApi.addLocation(locationName)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteLocation = createAsyncThunk(
  'addLocationList/deleteLocation',
  async (id: number, thunkApi) => {
    try {
      return await addLocationListApi.deleteLocation(id)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAddLocationListState: AddLocationSliceState = {
  meetingLocations: [],
  isLoading: ApiLoadingState.idle,
}

const addLocationListSlice = createSlice({
  name: 'addLocationList',
  initialState: initialAddLocationListState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addMatcher(
        isAnyOf(
          getAllMeetingLocationsData.pending,
          addLocation.pending,
          deleteLocation.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getAllMeetingLocationsData.fulfilled,
          addLocation.fulfilled,
          deleteLocation.fulfilled,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.meetingLocations = action.payload as getAllMeetingLocations[]
        },
      )
  },
})

const locationNames = (state: RootState): getAllMeetingLocations[] =>
  state.addLocationList.meetingLocations

const addLocationNames = (state: RootState): getAllMeetingLocations[] =>
  state.addLocationList.meetingLocations

const deleteLocationNames = (state: RootState): getAllMeetingLocations[] =>
  state.addLocationList.meetingLocations

const isLoading = (state: RootState): LoadingState =>
  state.addLocationList.isLoading

const addLocationListThunk = {
  getAllMeetingLocationsData,
  addLocation,
  deleteLocation,
}

const allocateEmployeeSelectors = {
  isLoading,
  locationNames,
  addLocationNames,
  deleteLocationNames,
}

export const addLocationListService = {
  ...addLocationListThunk,
  actions: addLocationListSlice.actions,
  selectors: allocateEmployeeSelectors,
}

export default addLocationListSlice.reducer
