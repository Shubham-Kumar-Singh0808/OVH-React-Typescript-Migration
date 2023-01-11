import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
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
  PerformanceRatings,
  ActiveEmployee,
  PipHistoryProps,
  PipHistory,
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

const getPerformanceRatings = createAsyncThunk(
  'pipList/getPerformanceRatings',
  async (_, thunkApi) => {
    try {
      return await pipListApi.getPerformanceRatings()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const activeEmployee = createAsyncThunk(
  'pipList/activeEmployee',
  async (_, thunkApi) => {
    try {
      return await pipListApi.activeEmployee()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addPIP = createAsyncThunk(
  'pipList/addPIP',
  async (
    {
      empId,
      endDate,
      improvement,
      rating,
      remarks,
      startDate,
    }: {
      empId: number
      endDate: string
      improvement: string
      rating: string
      remarks: string
      startDate: string
    },
    thunkApi,
  ) => {
    try {
      return await pipListApi.addPIP({
        empId,
        endDate,
        improvement,
        rating,
        remarks,
        startDate,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const viewPipDetails = createAsyncThunk(
  'pipList/viewPipDetails',
  async (id: number, thunkApi) => {
    try {
      return await pipListApi.viewPipDetails(id)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getPIPHistory = createAsyncThunk(
  'pipList/getPIPHistory',
  async (props: PipHistoryProps, thunkApi) => {
    try {
      return await pipListApi.getPIPHistory(props)
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
  performanceRatings: [],
  activeEmployee: [],
  employeePIPTimeline: { size: 0, list: [] },
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
    builder
      .addCase(getPIPHistory.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeePIPTimeline = action.payload
      })
      .addCase(getAllPIPList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.pipListData = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(getPerformanceRatings.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.performanceRatings = action.payload
      })
      .addCase(activeEmployee.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.activeEmployee = action.payload
      })
      .addMatcher(isAnyOf(addPIP.fulfilled), (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
  },
})

const isLoading = (state: RootState): LoadingState => state.pipList.isLoading

const listSize = (state: RootState): number => state.pipList.listSize

const selectedEmployeePipStatus = (state: RootState): EmployeePipStatus =>
  state.pipList.selectedEmployeePipStatus

const pipListData = (state: RootState): GetPipList[] =>
  state.pipList.pipListData

const performanceRatings = (state: RootState): PerformanceRatings[] =>
  state.pipList.performanceRatings

const employeeData = (state: RootState): ActiveEmployee[] =>
  state.pipList.activeEmployee

const employeePIPTimeline = (state: RootState): PipHistory[] =>
  state.pipList.employeePIPTimeline.list

export const pipListThunk = {
  getAllPIPList,
  exportPIPList,
  getPerformanceRatings,
  activeEmployee,
  addPIP,
  viewPipDetails,
  getPIPHistory,
}

export const pipListSelectors = {
  isLoading,
  selectedEmployeePipStatus,
  listSize,
  pipListData,
  performanceRatings,
  employeeData,
  employeePIPTimeline,
}

export const pipListService = {
  ...pipListThunk,
  actions: pipListSlice.actions,
  selectors: pipListSelectors,
}

export default pipListSlice.reducer
