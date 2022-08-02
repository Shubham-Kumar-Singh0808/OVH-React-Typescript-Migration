import { AllowedHttpMethods, addNewEmployeeAPiConfig } from '../../../apiList'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'

const checkIsUserExists = async (userName: string): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.getCheckIfUserExist,
    method: AllowedHttpMethods.get,
    params: {
      userName,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getUserApi = {
  checkIsUserExists,
}

export default getUserApi
