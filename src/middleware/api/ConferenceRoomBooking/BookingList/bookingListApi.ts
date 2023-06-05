import {
  EditMeetingRequest,
  GetBookingsForSelection,
  GetBookingsForSelectionProps,
  MeetingLocations,
  RoomsOfLocation,
  UpdateRoomBooking,
} from '../../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'
import { UniqueAttendeeParams } from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'
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
  props: GetBookingsForSelectionProps,
): Promise<GetBookingsForSelection[]> => {
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

const cancelRoomBooking = async (id: number): Promise<void> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: bookingListApiConfig.cancelRoomBooking + id + '/Cancelled',
    method: AllowedHttpMethods.put,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const confirmUpdateMeetingRequest = async (
  updateMeetingAppointment: UpdateRoomBooking,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: bookingListApiConfig.confirmUpdateMeetingRequest,
    method: AllowedHttpMethods.post,
    data: updateMeetingAppointment,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const editMeetingRequest = async (id: number): Promise<EditMeetingRequest> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: bookingListApiConfig.editMeeting,
    method: AllowedHttpMethods.get,
    params: {
      id,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const editUniqueAttendee = async (
  props: UniqueAttendeeParams,
): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: bookingListApiConfig.uniqueAttendee,
    method: AllowedHttpMethods.get,
    params: {
      attendeeId: props.attendeeId,
      attendeeName: props.attendeeName,
      endTime: props.endTime,
      meetingRequestId: props.meetingRequestId,
      startTime: props.startTime,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const bookingListApi = {
  getAllMeetingLocations,
  getRoomsOfLocation,
  getBookingsForSelection,
  cancelRoomBooking,
  confirmUpdateMeetingRequest,
  editMeetingRequest,
  editUniqueAttendee,
}

export default bookingListApi
