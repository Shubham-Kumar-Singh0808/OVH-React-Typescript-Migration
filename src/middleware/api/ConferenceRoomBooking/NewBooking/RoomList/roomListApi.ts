import { getAllMeetingRooms } from '../../../../../types/ConferenceRoomBooking/NewBooking/RoomList/roomListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { AllowedHttpMethods, roomListApiConfig } from '../../../apiList'

const getAllMeetingRoomsData = async (): Promise<getAllMeetingRooms[]> => {
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

const roomListApi = {
  getAllMeetingRoomsData,
  addRoom,
  deleteRoom,
  updateRoom,
}

export default roomListApi
