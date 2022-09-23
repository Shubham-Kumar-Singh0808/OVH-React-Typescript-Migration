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

const newBookingApi = {
  getLoggedEmployeeName,
}

export default newBookingApi
