import {
  LoggedEmployee,
  RoomsByLocation,
} from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, newEventApiConfig } from '../../apiList'

const getLoggedEmployee = async (): Promise<LoggedEmployee> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: newEventApiConfig.getLoggedEmployeeName,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getRoomsByLocation = async (
  locationId: number,
): Promise<RoomsByLocation[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: newEventApiConfig.getRoomsOfLocation,
    method: AllowedHttpMethods.get,
    params: {
      locationId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getAllEmployees = async (
  searchString: string,
): Promise<LoggedEmployee[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: newEventApiConfig.getAllProfileEmployeesData,
    method: AllowedHttpMethods.get,
    params: {
      searchStr: searchString,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const newEventApi = {
  getLoggedEmployee,
  getRoomsByLocation,
  getAllEmployees,
}

export default newEventApi
