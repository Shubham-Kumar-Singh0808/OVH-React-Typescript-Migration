import { EventTypeList } from '../../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { AllowedHttpMethods, eventTypeListApiConfig } from '../../../apiList'

const getAllEventTypes = async (): Promise<EventTypeList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: eventTypeListApiConfig.getAllEventTypes,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addEventType = async (name: string): Promise<string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: eventTypeListApiConfig.addEventType,
    method: AllowedHttpMethods.post,
    data: {
      name,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteEventType = async (id: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: eventTypeListApiConfig.deleteEventType,
    method: AllowedHttpMethods.delete,
    params: {
      eventTypeId: id,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updateEventType = async (props: {
  id: number
  name: string
}): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: eventTypeListApiConfig.updateEventType,
    method: AllowedHttpMethods.put,
    data: {
      id: props.id,
      name: props.name,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const eventTypeListApi = {
  getAllEventTypes,
  addEventType,
  deleteEventType,
  updateEventType,
}

export default eventTypeListApi
