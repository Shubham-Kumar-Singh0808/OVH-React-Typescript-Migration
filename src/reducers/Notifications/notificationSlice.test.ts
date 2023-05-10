import notificationReducer, {
  initialNotificationState,
  notificationService,
} from './notificationSlice'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { UpdateList } from '../../types/Notifications/notificationTypes'
import {
  mockAlertsData,
  mockNotificationAlertsData,
} from '../../test/data/notificationsData'

describe('notification Slice', () => {
  describe('getAllAlerts test', () => {
    it('Should be able to set isLoading to "loading" if getAllAlerts is pending', () => {
      const action = {
        type: notificationService.getAllAlerts.pending.type,
      }
      const state = notificationReducer(initialNotificationState, action)
      expect(state).toEqual({
        notificationAlerts: [],
        isLoading: ApiLoadingState.loading,
        listSize: 0,
        updateAlertsList: {} as UpdateList,
      })
    })

    it('Should be able to set isLoading to "success" if getAllAlerts is fulfilled', () => {
      const action = {
        type: notificationService.getAllAlerts.fulfilled.type,
        payload: mockNotificationAlertsData,
      }
      const state = notificationReducer(initialNotificationState, action)
      expect(state).toEqual({
        notificationAlerts: mockNotificationAlertsData.alertsList,
        isLoading: ApiLoadingState.succeeded,
        listSize: 85,
        updateAlertsList: {} as UpdateList,
      })
    })

    it('Should be able to set isLoading to "failed" if getAllAlerts is rejected', () => {
      const action = {
        type: notificationService.getAllAlerts.rejected.type,
      }
      const state = notificationReducer(initialNotificationState, action)
      expect(state).toEqual({
        notificationAlerts: [],
        isLoading: ApiLoadingState.failed,
        listSize: 0,
        updateAlertsList: {} as UpdateList,
      })
    })
  })
  describe('getUpdateAlert test', () => {
    it('Should be able to set isLoading to "loading" if getUpdateAlert is pending', () => {
      const action = {
        type: notificationService.getUpdateAlert.pending.type,
      }
      const state = notificationReducer(initialNotificationState, action)
      expect(state).toEqual({
        notificationAlerts: [],
        isLoading: ApiLoadingState.loading,
        listSize: 0,
        updateAlertsList: {} as UpdateList,
      })
    })

    it('Should be able to set isLoading to "success" if getUpdateAlert is fulfilled', () => {
      const action = {
        type: notificationService.getUpdateAlert.fulfilled.type,
        payload: mockAlertsData,
      }
      const state = notificationReducer(initialNotificationState, action)
      expect(state).toEqual({
        notificationAlerts: [],
        isLoading: ApiLoadingState.succeeded,
        listSize: 0,
        updateAlertsList: mockAlertsData,
      })
    })

    it('Should be able to set isLoading to "failed" if getUpdateAlert is rejected', () => {
      const action = {
        type: notificationService.getUpdateAlert.rejected.type,
      }
      const state = notificationReducer(initialNotificationState, action)
      expect(state).toEqual({
        notificationAlerts: [],
        isLoading: ApiLoadingState.failed,
        listSize: 0,
        updateAlertsList: {} as UpdateList,
      })
    })
  })
})
