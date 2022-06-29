import axios from 'axios'
import { AllowedHttpMethods, addNewEmployeeAPiConfig } from '../../../apiList'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'

const checkIsUserExists = async (userName: string): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.getCheckIfUserExist,
    method: AllowedHttpMethods.get,
    params: {
      userName,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const getUserApi = {
  checkIsUserExists,
}

export default getUserApi
