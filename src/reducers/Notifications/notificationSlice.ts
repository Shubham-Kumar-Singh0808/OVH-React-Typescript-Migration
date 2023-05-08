import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import notificationApi from '../../middleware/api/Notifications/notificationsApi'
import {
  AlertsData,
  NotificationSliceState,
  UpdateTypes,
  allAlertsTypes,
} from '../../types/Notifications/notificationTypes'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { RootState } from '../../stateStore'

const getAllAlerts = createAsyncThunk(
  'notifications/allAlerts',
  async (props: allAlertsTypes, thunkApi) => {
    try {
      return await notificationApi.allAlerts(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const getUpdateAlert = createAsyncThunk(
  'notifications/updateAlert',
  async (props: UpdateTypes, thunkApi) => {
    try {
      return await notificationApi.updateAlert(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialNotificationState: NotificationSliceState = {
  notificationAlerts: [],
  isLoading: ApiLoadingState.idle,
  listSize: 0,
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: initialNotificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAlerts.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.notificationAlerts = action.payload.alertsList
        state.listSize = action.payload.alertsSize
      })
      .addCase(getUpdateAlert.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addCase(getAllAlerts.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAllAlerts.rejected, (state) => {
        state.isLoading = ApiLoadingState.failed
      })
      .addCase(getUpdateAlert.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getUpdateAlert.rejected, (state) => {
        state.isLoading = ApiLoadingState.failed
      })
  },
})
const isLoading = (state: RootState): LoadingState =>
  state.notification.isLoading

const notificationAlerts = (state: RootState): AlertsData[] =>
  state.notification.notificationAlerts

const listSize = (state: RootState): number => state.notification.listSize

export const notificationThunk = {
  getAllAlerts,
  getUpdateAlert,
}

export const notificationSelectors = {
  isLoading,
  notificationAlerts,
  listSize,
}

export const notificationService = {
  ...notificationThunk,
  actions: notificationSlice.actions,
  selectors: notificationSelectors,
}

export default notificationSlice.reducer
