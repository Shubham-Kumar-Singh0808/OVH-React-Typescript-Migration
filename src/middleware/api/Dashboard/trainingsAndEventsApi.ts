import { TrainingAndEvent } from '../../../types/Dashboard/TrainingsAndEvents/trainingsAndEventsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import { dashboardApiConfig, AllowedHttpMethods } from '../apiList'

const getUpcomingTrainings = async (): Promise<
  TrainingAndEvent[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.getUpcomingTrainings,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getUpcomingEvents = async (): Promise<TrainingAndEvent[] | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.getUpcomingEvents,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const trainingsAndEventsApi = {
  getUpcomingTrainings,
  getUpcomingEvents,
}

export default trainingsAndEventsApi
