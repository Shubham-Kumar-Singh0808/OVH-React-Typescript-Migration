import {
  EditHolidayDetails,
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

const deleteHoliday = async (
  holidayId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.deleteHoliday,
    method: AllowedHttpMethods.delete,
    params: {
      holidayId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getHolidayInformation = async (
  holidayId: number,
): Promise<EditHolidayDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.getHolidayInformation,
    method: AllowedHttpMethods.get,
    params: {
      holidayId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateHoliday = async (
  holidayDetails: EditHolidayDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.updateHoliday,
    method: AllowedHttpMethods.put,
    data: holidayDetails,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const holidaysApi = {
  getUpcomingHolidays,
  getAllUpcomingHolidaysList,
  addHoliday,
  deleteHoliday,
  getHolidayInformation,
  updateHoliday,
}

export default holidaysApi
