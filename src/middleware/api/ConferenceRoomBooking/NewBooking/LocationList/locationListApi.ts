import {
  AddLocationProps,
  getAllMeetingLocations,
} from '../../../../../types/ConferenceRoomBooking/NewBooking/LocationList/locationListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { addLocationListApiConfig, AllowedHttpMethods } from '../../../apiList'

const getAllMeetingLocationsData = async (
  props: AddLocationProps,
): Promise<getAllMeetingLocations> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addLocationListApiConfig.getAllMeetingLocations,
    method: AllowedHttpMethods.get,
    params: {
      startIndex: props.startIndex ?? 0,
      endIndex: props.endIndex ?? 20,
    },
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
