import {
  DownloadFeedbackFormInterface,
  EditExistingEventDetails,
  EventListApiProps,
  FeedbackFormApiProps,
  GetEventListResponse,
  GetFeedbackFormResponse,
  UpdateEventDetails,
  UploadFeedbackFormInterface,
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

const getFeedbackFormList = async (
  props: FeedbackFormApiProps,
): Promise<GetFeedbackFormResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: eventListApiConfig.getFeedbackFormList,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
      eventId: props.eventId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const downloadFeedbackForm = async (
  prepareObject: DownloadFeedbackFormInterface,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: eventListApiConfig.downloadFeedbackForm,
    method: AllowedHttpMethods.get,
    params: {
      fileName: prepareObject.fileName,
      token: prepareObject.token,
      tenantKey: prepareObject.tenantKey,
    },
    responseType: 'blob',
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const uploadFeedbackForm = async (
  prepareObject: UploadFeedbackFormInterface,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: eventListApiConfig.uploadFeedbackForm,
    method: AllowedHttpMethods.post,
    data: prepareObject.file,
    params: {
      eventId: prepareObject.eventId,
    },
    additionalHeaders: {
      'Content-Type': 'multipart/form-data',
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const editEvent = async (
  eventId: number,
): Promise<EditExistingEventDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: eventListApiConfig.editEvent,
    method: AllowedHttpMethods.get,
    params: {
      id: eventId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateEvent = async (
  updateEventDetails: UpdateEventDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: eventListApiConfig.updateEvent,
    method: AllowedHttpMethods.post,
    data: updateEventDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const eventListApi = {
  getAllEvents,
  cancelEvent,
  getFeedbackFormList,
  downloadFeedbackForm,
  uploadFeedbackForm,
  editEvent,
  updateEvent,
}

export default eventListApi
