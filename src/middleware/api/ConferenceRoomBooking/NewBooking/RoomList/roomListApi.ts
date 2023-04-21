import {
  getAllMeetingLocations,
  getAllMeetingRooms,
} from '../../../../../types/ConferenceRoomBooking/NewBooking/RoomList/roomListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { AllowedHttpMethods, roomListApiConfig } from '../../../apiList'

const getMeetingRooms = async (): Promise<getAllMeetingRooms[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: roomListApiConfig.getAllMeetingRooms,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addRoom = async ({
  roomName,
  locationId,
}: {
  roomName: string
  locationId: number
}): Promise<getAllMeetingRooms[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: roomListApiConfig.addRoom,
    method: AllowedHttpMethods.post,
    data: {
      roomName,
      locationId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deleteRoom = async (roomId: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: roomListApiConfig.deleteRoom,
    method: AllowedHttpMethods.delete,
    params: {
      id: roomId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}
const updateRoom = async (
  getAllMeetingRoom: getAllMeetingRooms,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: roomListApiConfig.updateRoom,
    method: AllowedHttpMethods.put,
    data: getAllMeetingRoom,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getRoomsOfLocation = async (
  locationId: number,
): Promise<getAllMeetingRooms[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: roomListApiConfig.getRoomsOfLocation,
    method: AllowedHttpMethods.get,
    params: {
      locationId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getMeetingLocations = async (): Promise<getAllMeetingLocations[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: roomListApiConfig.getAllMeetingLocations,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const roomListApi = {
  getMeetingRooms,
  addRoom,
  deleteRoom,
  updateRoom,
  getRoomsOfLocation,
  getMeetingLocations,
}

export default roomListApi
