import {
  AddEvent,
  GetAllBookedDetailsForEvent,
  GetBookedEventsParams,
  LoggedEmployee,
  ProjectMember,
  RoomsByLocation,
  UniqueAttendeeParams,
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

const getProjectMembers = async (
  projectName: string,
): Promise<ProjectMember[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: newEventApiConfig.getAllAttendees,
    method: AllowedHttpMethods.get,
    params: {
      projectName,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const uniqueAttendee = async (
  props: UniqueAttendeeParams,
): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: newEventApiConfig.uniqueAttendee,
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

const timeCheck = async (time: string): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: newEventApiConfig.timeChecking,
    method: AllowedHttpMethods.get,
    params: {
      time,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getAllBookedDetailsForEvent = async (
  props: GetBookedEventsParams,
): Promise<GetAllBookedDetailsForEvent[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: newEventApiConfig.getAllBookedDetailsForEvent,
    method: AllowedHttpMethods.get,
    params: {
      fromdate: props.fromDate,
      roomid: props.roomId,
      toDate: props.toDate,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addNewEvent = async (props: AddEvent): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: newEventApiConfig.addNewEvent,
    method: AllowedHttpMethods.post,
    data: props,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const newEventApi = {
  getLoggedEmployee,
  getRoomsByLocation,
  getAllEmployees,
  getProjectMembers,
  uniqueAttendee,
  timeCheck,
  getAllBookedDetailsForEvent,
  addNewEvent,
}

export default newEventApi
