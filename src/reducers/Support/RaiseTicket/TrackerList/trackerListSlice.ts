import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import trackerListApi from '../../../../middleware/api/Support/RaiseTicket/TrackerList/trackerListApi'
import { RootState } from '../../../../stateStore'
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
  currentPage: 1,
  pageSize: 20,
}
const addTrackerSlice = createSlice({
  name: 'addTracker',
  initialState: initialAddTrackerSliceState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
  },
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

const pageFromState = (state: RootState): number =>
  state.addTrackerLists.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.addTrackerLists.pageSize

const trackerListSelectors = {
  pageFromState,
  pageSizeFromState,
}

const addTrackerListThunk = {
  addNewTracker,
  deleteTrackerList,
}

export const addTrackerListService = {
  ...addTrackerListThunk,
  actions: addTrackerSlice.actions,
  selectors: trackerListSelectors,
}

export default addTrackerSlice.reducer
