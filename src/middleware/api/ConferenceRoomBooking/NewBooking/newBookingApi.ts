import { ConfirmNewMeetingAppointment } from '../../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, newBookingApiConfig } from '../../apiList'

const confirmNewMeetingAppointment = async (
  newMeetingAppointment: ConfirmNewMeetingAppointment,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: newBookingApiConfig.confirmNewMeetingAppointment,
    method: AllowedHttpMethods.post,
    data: newMeetingAppointment,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const newBookingApi = {
  confirmNewMeetingAppointment,
}

export default newBookingApi
