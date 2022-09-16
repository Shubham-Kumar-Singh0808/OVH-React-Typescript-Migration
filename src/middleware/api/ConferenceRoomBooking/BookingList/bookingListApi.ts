import {
  getBookingsForSelectionProps,
  MeetingLocations,
  RoomsOfLocation,
} from '../../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, bookingListApiConfig } from '../../apiList'

const getAllMeetingLocations = async (): Promise<MeetingLocations[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: bookingListApiConfig.getAllMeetingLocations,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getRoomsOfLocation = async (
  locationId: number,
): Promise<RoomsOfLocation[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: bookingListApiConfig.getRoomsOfLocation,
    method: AllowedHttpMethods.get,
    params: {
      locationId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getBookingsForSelection = async (
  props: getBookingsForSelectionProps,
): Promise<RoomsOfLocation> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: bookingListApiConfig.getBookingsForSelection,
    method: AllowedHttpMethods.get,
    params: {
      location: props.location ?? '',
      meetingStatus: props.meetingStatus ?? '',
      room: props.room ?? '',
      status: props.status ?? '',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const bookingListApi = {
  getAllMeetingLocations,
  getRoomsOfLocation,
  getBookingsForSelection,
}

export default bookingListApi
