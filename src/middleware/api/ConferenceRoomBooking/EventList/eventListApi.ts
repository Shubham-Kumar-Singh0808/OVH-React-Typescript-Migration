import {
  EventListApiProps,
  GetEventListResponse,
} from '../../../../types/ConferenceRoomBooking/EventList/eventListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, eventListApiConfig } from '../../apiList'

const getAllEvents = async (
  props: EventListApiProps,
): Promise<GetEventListResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: eventListApiConfig.getAllEvents,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      dateSelection: props.dateSelection ?? '',
      startIndex: props.startIndex ?? 0,
      eventTypeId: props.eventTypeId ?? '',
      searchFromDate: props.searchFromDate ?? '',
      searchToDate: props.searchToDate ?? '',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const cancelEvent = async (eventId: number): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: eventListApiConfig.cancelEvent,
    method: AllowedHttpMethods.put,
    params: {
      eventId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const eventListApi = {
  getAllEvents,
  cancelEvent,
}

export default eventListApi
