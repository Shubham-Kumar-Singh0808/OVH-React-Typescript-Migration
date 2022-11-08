import { getAllMeetingLocations } from '../../../../../types/ConferenceRoomBooking/NewBooking/LocationList/locationListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { addLocationListApiConfig, AllowedHttpMethods } from '../../../apiList'

const getAllMeetingLocationsData = async (): Promise<
  getAllMeetingLocations[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addLocationListApiConfig.getAllMeetingLocations,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addLocation = async (name: string): Promise<string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addLocationListApiConfig.addLocation,
    method: AllowedHttpMethods.post,
    data: {
      locationName: name,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteLocation = async (id: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addLocationListApiConfig.deleteLocation,
    method: AllowedHttpMethods.delete,
    params: {
      locationId: id,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addLocationListApi = {
  getAllMeetingLocationsData,
  addLocation,
  deleteLocation,
}

export default addLocationListApi
