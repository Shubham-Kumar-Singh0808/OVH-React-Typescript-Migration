import { ApiLoadingState } from '../../middleware/api/apiList'

export type allAlertsTypes = {
  employeeId: number
  endIndex: number
  startIndex: number
}
export type UpdateTypes = {
  employeeId: number
  alertId: number
}
export type AlertsData = {
  id: number
  msg: string
  empId: string
  msgDate: string
  alertType: string
  alertStatus: boolean
  latestSatatus: boolean
  projectId: null
}
export type NotificationAlertsData = {
  alertsSize: number
  alertsList: AlertsData[]
}
export type NotificationSliceState = {
  notificationAlerts: AlertsData[]
  isLoading: ApiLoadingState
  listSize: number
  updateAlertsList: UpdateList
}

export type UpdateList = {
  id: number
  msg: string
  empId: null | number
  msgDate: string
  alertType: string
  alertStatus: boolean
  latestSatatus: boolean
  projectId: null
}
