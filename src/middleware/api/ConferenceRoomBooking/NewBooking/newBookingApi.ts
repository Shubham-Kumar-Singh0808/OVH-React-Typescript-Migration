import { GetBookingsForSelection } from '../../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'
import {
  ConfirmNewMeetingAppointment,
  GetBookedRoomParams,
} from '../../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'
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

const getAllBookedDetailsForRoom = async (
  props: GetBookedRoomParams,
): Promise<GetBookingsForSelection[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: newBookingApiConfig.getAllMeetingAppointmentList,
    method: AllowedHttpMethods.get,
    params: {
      date: props.date,
      roomid: props.roomid,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const newBookingApi = {
  confirmNewMeetingAppointment,
  getAllBookedDetailsForRoom,
}

export default newBookingApi
