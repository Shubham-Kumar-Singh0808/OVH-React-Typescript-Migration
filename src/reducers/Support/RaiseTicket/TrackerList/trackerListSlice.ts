import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import trackerListApi from '../../../../middleware/api/Support/RaiseTicket/TrackerList/trackerListApi'
import { RootState } from '../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import {
  AddTrackerSliceState,
  Tracker,
} from '../../../../types/Support/RaiseNewTicket/TrackerList/trackerListTypes'

const addNewTracker = createAsyncThunk(
  'addTracker/addNewTracker',
  async (
    {
      name,
      permission,
    }: {
      name: string
      permission: boolean
    },
    thunkApi,
  ) => {
    try {
      return await trackerListApi.addNewTracker({
        name,
        permission,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteTrackerList = createAsyncThunk(
  'addTracker/deleteTrackerList',
  async (id: number, thunkApi) => {
    try {
      return await trackerListApi.deleteTrackerList(id)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAddTrackerSliceState: AddTrackerSliceState = {
  isLoading: ApiLoadingState.idle,
  trackerList: [],
}
const addTrackerSlice = createSlice({
  name: 'addTracker',
  initialState: initialAddTrackerSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewTracker.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.trackerList = action.payload
      })
      .addCase(addNewTracker.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(addNewTracker.fulfilled), (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(isAnyOf(addNewTracker.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(deleteTrackerList.fulfilled), (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
  },
})

const addTracker = (state: RootState): Tracker[] =>
  state.addTrackerLists.trackerList

const deleteTracker = (state: RootState): Tracker[] =>
  state.addTrackerLists.trackerList

const isLoading = (state: RootState): LoadingState =>
  state.employeeLeaveSummary.isLoading

const addTrackerListThunk = {
  addNewTracker,
  deleteTrackerList,
}

const addTrackerListSelectors = {
  isLoading,
  addTracker,
  deleteTracker,
}

export const addTrackerListService = {
  ...addTrackerListThunk,
  actions: addTrackerSlice.actions,
  selectors: addTrackerListSelectors,
}

export default addTrackerSlice.reducer
