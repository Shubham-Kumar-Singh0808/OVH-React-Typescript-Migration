import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import addLocationListApi from '../../../../middleware/api/ConferenceRoomBooking/NewBooking/LocationList/locationListApi'
import { RootState } from '../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import {
  AddLocationSliceState,
  getAllMeetingLocations,
} from '../../../../types/ConferenceRoomBooking/NewBooking/LocationList/locationListTypes'

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
  currentPage: 1,
  pageSize: 20,
}

const addLocationListSlice = createSlice({
  name: 'addLocationList',
  initialState: initialAddLocationListState,
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

const pageFromState = (state: RootState): number =>
  state.addLocationList.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.addLocationList.pageSize

const addLocationListThunk = {
  getAllMeetingLocationsData,
  addLocation,
  deleteLocation,
}

const locationListSelectors = {
  isLoading,
  locationNames,
  addLocationNames,
  deleteLocationNames,
  pageFromState,
  pageSizeFromState,
}

export const addLocationListService = {
  ...addLocationListThunk,
  actions: addLocationListSlice.actions,
  selectors: locationListSelectors,
}

export default addLocationListSlice.reducer
