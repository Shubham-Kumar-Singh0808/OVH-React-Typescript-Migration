import {
  Holidays,
  SaveHoliday,
} from '../../../types/Dashboard/Holidays/upcomingHolidaysTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import { dashboardApiConfig, AllowedHttpMethods } from '../apiList'

const getUpcomingHolidays = async (): Promise<Holidays[] | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.getUpcomingHolidays,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getAllUpcomingHolidaysList = async (
  country: string,
): Promise<Holidays[] | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.getAllUpcomingHolidaysList,
    method: AllowedHttpMethods.get,
    params: {
      country,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addHoliday = async (
  addNewHoliday: SaveHoliday,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.addHoliday,
    method: AllowedHttpMethods.post,
    data: addNewHoliday,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const holidaysApi = {
  getUpcomingHolidays,
  getAllUpcomingHolidaysList,
  addHoliday,
}

export default holidaysApi
