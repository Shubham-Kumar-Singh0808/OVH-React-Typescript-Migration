import { NewBookingLoggedEmployeeName } from '../../../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { AllowedHttpMethods, newBookingApiConfig } from '../../../apiList'

const getLoggedEmployeeName = async (): Promise<
  NewBookingLoggedEmployeeName[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: newBookingApiConfig.getLoggedEmployeeName,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const getAllEmployees = async (
  searchString: string,
): Promise<NewBookingLoggedEmployeeName[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: newBookingApiConfig.getAllProfileEmployeesData,
    method: AllowedHttpMethods.get,
    params: {
      searchStr: searchString,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const newBookingApi = {
  getLoggedEmployeeName,
  getAllEmployees,
}

export default newBookingApi
