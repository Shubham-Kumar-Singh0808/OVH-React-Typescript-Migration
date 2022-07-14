import { UserAccessToFeatures } from '../../../../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
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
  const response = await useAxios(requestConfig)
  return response.data
}

const userAccessToFeaturesApi = {
  getUserAccessToFeatures,
}
export default userAccessToFeaturesApi
