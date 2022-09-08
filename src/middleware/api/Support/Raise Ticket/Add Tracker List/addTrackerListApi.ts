import { Tracker } from '../../../../../types/Support/Raise Ticket/addTrackerListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { addTrackerApiConfig, AllowedHttpMethods } from '../../../apiList'

const addNewTracker = async ({
  name,
  permission,
}: Tracker): Promise<Tracker[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addTrackerApiConfig.addNewTracker,
    method: AllowedHttpMethods.post,
    data: {
      name,
      permission,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteTrackerList = async (
  trackerId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addTrackerApiConfig.deleteTrackerList,
    method: AllowedHttpMethods.delete,
    params: {
      trackerId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addTrackerApi = {
  addNewTracker,
  deleteTrackerList,
}

export default addTrackerApi
