import { AllowedHttpMethods, profileHistoryConfig } from '../../apiList'
import { ProfileUpdateData } from '../../../../types/MyProfile/ProfileHistory/profileHistoryTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'

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
  const response = await useAxios(requestConfig)
  return response.data.list
}

const profileHistoryApi = {
  getProfileHistory,
}
export default profileHistoryApi
