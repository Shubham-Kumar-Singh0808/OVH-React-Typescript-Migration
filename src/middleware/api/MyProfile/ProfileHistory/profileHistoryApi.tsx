import { AllowedHttpMethods, profileHistoryConfig } from '../../apiList'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import { profileHistoryItem } from '../../../../types/MyProfile/ProfileHistory/profileHistoryTypes'

const getProfileHistory = async (
  employeeId: string,
): Promise<profileHistoryItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: profileHistoryConfig.getprofileHistory,
    method: AllowedHttpMethods.get,
    params: {
      employeeId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const profileHistoryApi = {
  getProfileHistory,
}
export default profileHistoryApi
