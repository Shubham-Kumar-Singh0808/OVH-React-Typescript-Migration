import axios from 'axios'
import { AllowedHttpMethods, profileHistoryConfig } from '../../apiList'
import { ProfileUpdateData } from '../../../../types/MyProfile/ProfileHistory/profileHistoryTypes'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getProfileHistory = async (
  employeeId: string | undefined,
): Promise<ProfileUpdateData[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: profileHistoryConfig.getprofileHistory,
    method: AllowedHttpMethods.get,
    params: {
      employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data.list
}

const profileHistoryApi = {
  getProfileHistory,
}
export default profileHistoryApi
