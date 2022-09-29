import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import trackerListApi from '../../../../middleware/api/Support/RaiseTicket/TrackerList/trackerListApi'
import { ValidationError } from '../../../../types/commonTypes'
import { AddTrackerSliceState } from '../../../../types/Support/RaiseNewTicket/TrackerList/trackerListTypes'

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
      return await trackerListApi.deleteTracker(id)
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
      .addMatcher(
        isAnyOf(addNewTracker.pending, deleteTrackerList.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(deleteTrackerList.fulfilled, addNewTracker.fulfilled),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
  },
})

const addTrackerListThunk = {
  addNewTracker,
  deleteTrackerList,
}

export const addTrackerListService = {
  ...addTrackerListThunk,
  actions: addTrackerSlice.actions,
}

export default addTrackerSlice.reducer
