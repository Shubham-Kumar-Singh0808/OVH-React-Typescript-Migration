import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import pipListApi from '../../../middleware/api/Performance/PIPList/pipListApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  GetAllPipListApiProps,
  PipListSliceState,
  EmployeePipStatus,
  GetPipList,
} from '../../../types/Performance/PipList/pipListTypes'

const getAllPIPList = createAsyncThunk(
  'pipList/getAllPIPList',
  async (props: GetAllPipListApiProps, thunkApi) => {
    try {
      return await pipListApi.getAllPIPList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const exportPIPList = createAsyncThunk(
  'pipList/exportPIPList',
  async (props: GetAllPipListApiProps, thunkApi) => {
    try {
      return await pipListApi.exportPIPList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialPipListState: PipListSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  listSize: 0,
  pipListData: [],
  selectedEmployeePipStatus: EmployeePipStatus.pip,
}
const pipListSlice = createSlice({
  name: 'pipList',
  initialState: initialPipListState,
  reducers: {
    changeSelectedEmployeePipStatus: (state, action) => {
      state.selectedEmployeePipStatus = action.payload as EmployeePipStatus
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPIPList.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.pipListData = action.payload.list
      state.listSize = action.payload.size
    })
  },
})

const isLoading = (state: RootState): LoadingState => state.pipList.isLoading

const listSize = (state: RootState): number => state.pipList.listSize

const selectedEmployeePipStatus = (state: RootState): EmployeePipStatus =>
  state.pipList.selectedEmployeePipStatus

const pipListData = (state: RootState): GetPipList[] =>
  state.pipList.pipListData

export const pipListThunk = {
  getAllPIPList,
  exportPIPList,
}

export const pipListSelectors = {
  isLoading,
  selectedEmployeePipStatus,
  listSize,
  pipListData,
}

export const pipListService = {
  ...pipListThunk,
  actions: pipListSlice.actions,
  selectors: pipListSelectors,
}

export default pipListSlice.reducer
