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
  async (id: number | string, thunkApi) => {
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

const extendPip = createAsyncThunk(
  'pipList/extendPip',
  async (props: GetPipList, thunkApi) => {
    try {
      return await pipListApi.extendPip(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const removeFromPip = createAsyncThunk(
  'pipList/removeFromPip',
  async (props: GetPipList, thunkApi) => {
    try {
      return await pipListApi.removeFromPip(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updatePipDetails = createAsyncThunk(
  'pipList/updatePipDetails',
  async (props: GetPipList, thunkApi) => {
    try {
      return await pipListApi.updatePipDetails(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const savePIPClearnceCertificate = createAsyncThunk(
  'pipList/savePIPClearnceCertificate',
  async (employeeId: number | string, thunkApi) => {
    try {
      return await pipListApi.savePIPClearnceCertificate(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const curMonth = 'Current Month'
export const initialPipListState: PipListSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  listSize: 0,
  pipListData: [],
  selectedEmployeePipStatus: EmployeePipStatus.pip,
  performanceRatings: [],
  activeEmployee: [],
  employeePIPTimeline: { size: 0, list: [] },
  list: {} as GetPipList,
  pipListValue: curMonth,
  fromDate: '',
  toDate: '',
}

const pipListSlice = createSlice({
  name: 'pipList',
  initialState: initialPipListState,
  reducers: {
    setMonthValue: (state, action) => {
      state.pipListValue = action.payload
    },
    changeSelectedEmployeePipStatus: (state, action) => {
      state.selectedEmployeePipStatus = action.payload as EmployeePipStatus
    },
    clearPIPList: (state) => {
      state.pipListValue = 'Current Month'
    },
    setFromDate: (state, action) => {
      state.fromDate = action.payload
    },
    setToDate: (state, action) => {
      state.toDate = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPIPList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.pipListData = action.payload?.list
        state.listSize = action.payload?.size
      })
      .addCase(getPIPHistory.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeePIPTimeline = action.payload
      })
      .addCase(getPerformanceRatings.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.performanceRatings = action.payload
      })
      .addCase(activeEmployee.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.activeEmployee = action.payload
      })
      .addMatcher(
        isAnyOf(
          extendPip.fulfilled,
          updatePipDetails.fulfilled,
          viewPipDetails.fulfilled,
          removeFromPip.fulfilled,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.list = action.payload
        },
      )
      .addMatcher(
        isAnyOf(
          extendPip.pending,
          updatePipDetails.pending,
          viewPipDetails.pending,
          removeFromPip.pending,
          getAllPIPList.pending,
          exportPIPList.pending,
          getPerformanceRatings.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          extendPip.rejected,
          updatePipDetails.rejected,
          viewPipDetails.rejected,
          removeFromPip.rejected,
          getAllPIPList.rejected,
          exportPIPList.rejected,
          getPerformanceRatings.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
      .addMatcher(
        isAnyOf(addPIP.fulfilled, exportPIPList.fulfilled),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
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

const viewEmployeePipDetails = (state: RootState): GetPipList =>
  state.pipList.list

const clearenceCertificate = (state: RootState): GetPipList =>
  state.pipList.list

const getPIPValue = (state: RootState): string | undefined =>
  state.pipList.pipListValue

const getFromDateValue = (state: RootState): string | Date =>
  state.pipList.fromDate

const getToDateValue = (state: RootState): string | Date => state.pipList.toDate

export const pipListThunk = {
  getAllPIPList,
  exportPIPList,
  getPerformanceRatings,
  activeEmployee,
  addPIP,
  viewPipDetails,
  getPIPHistory,
  extendPip,
  removeFromPip,
  updatePipDetails,
  savePIPClearnceCertificate,
}

export const pipListSelectors = {
  isLoading,
  selectedEmployeePipStatus,
  listSize,
  pipListData,
  performanceRatings,
  employeeData,
  employeePIPTimeline,
  viewEmployeePipDetails,
  clearenceCertificate,
  getPIPValue,
  getFromDateValue,
  getToDateValue,
}

export const pipListService = {
  ...pipListThunk,
  actions: pipListSlice.actions,
  selectors: pipListSelectors,
}

export default pipListSlice.reducer
