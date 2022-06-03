import { AllowedHttpMethods, profileHistoryConfig } from '../../apiList'

import { List } from '../../../../types/MyProfile/ProfileHistory/profileHistoryTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getProfileHistory = async (employeeId: string): Promise<List[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: profileHistoryConfig.getprofileHistory,
    method: AllowedHttpMethods.get,
    params: {
      employeeId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  console.log(response)
  return response.data.list
}

const profileHistoryApi = {
  getProfileHistory,
}
export default profileHistoryApi
