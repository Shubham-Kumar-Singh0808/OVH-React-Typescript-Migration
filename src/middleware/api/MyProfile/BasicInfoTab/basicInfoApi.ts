import { AllowedHttpMethods, basicInfoApi } from '../../apiList'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

export const updateDefaultPicOnGenderChange = async (
  gender: string,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: basicInfoApi.defaultPicByGender,
    method: AllowedHttpMethods.post,
    params: {
      gender: gender,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
