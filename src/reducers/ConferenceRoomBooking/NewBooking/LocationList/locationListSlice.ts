import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import addLocationListApi from '../../../../middleware/api/ConferenceRoomBooking/NewBooking/LocationList/locationListApi'
import { RootState } from '../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import {
  AddLocationProps,
  AddLocationSliceState,
  getAllMeetingLocations,
  LocationList,
} from '../../../../types/ConferenceRoomBooking/NewBooking/LocationList/locationListTypes'

const getAllMeetingLocationsData = createAsyncThunk(
  'addLocationList/getAllMeetingLocationsData',
  async (props: AddLocationProps, thunkApi) => {
    try {
      return await addLocationListApi.getAllMeetingLocationsData(props)
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
  meetingLocations: { size: 0, List: [] },
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
  locationList: [],
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
          state.meetingLocations = action.payload as getAllMeetingLocations
        },
      )
  },
})

const locationNames = (state: RootState): LocationList[] =>
  state.addLocationList.meetingLocations.List

// const addLocationNames = (state: RootState): getAllMeetingLocations[] =>
//   state.addLocationList.meetingLocations

// const deleteLocationNames = (state: RootState): getAllMeetingLocations[] =>
//   state.addLocationList.meetingLocations

const isLoading = (state: RootState): LoadingState =>
  state.addLocationList.isLoading

const pageFromState = (state: RootState): number =>
  state.addLocationList.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.addLocationList.pageSize

const locationListSize = (state: RootState): number =>
  state.addLocationList.meetingLocations.size

const addLocationListThunk = {
  getAllMeetingLocationsData,
  addLocation,
  deleteLocation,
}

const locationListSelectors = {
  isLoading,
  locationNames,
  // addLocationNames,
  // deleteLocationNames,
  pageFromState,
  pageSizeFromState,
  locationListSize,
}

export const addLocationListService = {
  ...addLocationListThunk,
  actions: addLocationListSlice.actions,
  selectors: locationListSelectors,
}

export default addLocationListSlice.reducer
