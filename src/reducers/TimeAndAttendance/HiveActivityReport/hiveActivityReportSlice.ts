import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import hiveActivityReportApi from '../../../middleware/api/TimeAndAttendance/HiveActivityReport/hiveActivityReportApi'
import { ValidationError } from '../../../types/commonTypes'
import {
  GetHiveActivityReportProps,
  HiveActivityReportSliceState,
} from '../../../types/TimeAndAttendance/HiveActivityReport/hiveActivityReportTypes'

const getEmployeeHiveActivityReport = createAsyncThunk(
  'hiveActivityReport/getEmployeeHiveActivityReport',
  async (props: GetHiveActivityReportProps, thunkApi) => {
    try {
      return await hiveActivityReportApi.getEmployeeHiveActivityReport(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialHiveActivityReportSliceState: HiveActivityReportSliceState = {
  selectedView: 'Me',
  managerHiveActivityReport: { list: [], size: 0 },
  employeeHiveActivityReport: {
    id: 0,
    userName: '',
    firstName: '',
    lastName: '',
    activityTimes: [],
    totalHiveTime: '',
    projectIdentifier: '',
  },
  isLoading: ApiLoadingState.idle,
}

const hiveActivityReportSlice = createSlice({
  name: 'hiveActivityReport',
  initialState: initialHiveActivityReportSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getEmployeeHiveActivityReport.fulfilled,
      (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeHiveActivityReport = action.payload
      },
    )
  },
})

const hiveActivityReportThunk = {
  getEmployeeHiveActivityReport,
}

const hiveActivityReportSelectors = {}

export const hiveActivityReportService = {
  ...hiveActivityReportThunk,
  actions: hiveActivityReportSlice.actions,
  selectors: hiveActivityReportSelectors,
}

export default hiveActivityReportSlice.reducer
