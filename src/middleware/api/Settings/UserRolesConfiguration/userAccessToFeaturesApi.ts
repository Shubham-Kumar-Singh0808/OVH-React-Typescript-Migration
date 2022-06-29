import axios from 'axios'
import { UserAccessToFeatures } from '../../../../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import { AllowedHttpMethods, userApiConfig } from '../../apiList'

const getUserAccessToFeatures = async (
  userId: string,
): Promise<UserAccessToFeatures[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userApiConfig.getUserAccessToFeatures,
    method: AllowedHttpMethods.get,
    params: {
      userId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const userAccessToFeaturesApi = {
  getUserAccessToFeatures,
}
export default userAccessToFeaturesApi
