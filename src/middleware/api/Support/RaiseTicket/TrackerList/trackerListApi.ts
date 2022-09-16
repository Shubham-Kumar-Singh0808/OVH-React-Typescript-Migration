import { TrackerList } from '../../../../../types/Support/TicketApprovals/ticketApprovalsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { addTrackerApiConfig, AllowedHttpMethods } from '../../../apiList'

const addNewTracker = async ({
  name,
  permission,
}: {
  name: string
  permission: boolean
}): Promise<TrackerList[]> => {
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

const deleteTrackerList = async (trackerId: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addTrackerApiConfig.deleteTrackerList,
    method: AllowedHttpMethods.delete,
    params: {
      id: trackerId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const trackerListApi = {
  addNewTracker,
  deleteTrackerList,
}

export default trackerListApi
