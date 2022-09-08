import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import addTrackerListApi from '../../../../middleware/api/Support/Raise Ticket/Add Tracker List/addTrackerListApi'
import { RootState } from '../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import {
  Tracker,
  AddTrackerSliceState,
} from '../../../../types/Support/Raise Ticket/addTrackerListTypes'

const addNewTracker = createAsyncThunk(
  'addTracker/addNewTracker',
  async ({ name, permission, id }: Tracker, thunkApi) => {
    try {
      return await addTrackerListApi.addNewTracker({
        name,
        permission,
        id,
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
      return await addTrackerListApi.deleteTrackerList(id)
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
