import { ApiLoadingState } from '../../middleware/api/apiList'

export type allAlertsTypes = {
  employeeId: number
  endIndex: number
  startIndex: number
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
}
