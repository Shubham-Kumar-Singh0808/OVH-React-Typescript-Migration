import {
  NotificationAlertsData,
  allAlertsTypes,
} from '../../../types/Notifications/notificationTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import { AllowedHttpMethods, notificationsApiConfig } from '../apiList'

const allAlerts = async (
  props: allAlertsTypes,
): Promise<NotificationAlertsData> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: notificationsApiConfig.allAlerts,
    method: AllowedHttpMethods.get,
    params: {
      employeeId: props.employeeId,
      endIndex: props.endIndex,
      startIndex: props.startIndex,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const notificationApi = {
  allAlerts,
}

export default notificationApi
