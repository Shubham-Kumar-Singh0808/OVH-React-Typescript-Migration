import { AllowedHttpMethods, basicInfoApiConfig } from '../../apiList'

import { EmployeeGeneralInformation } from '../../../../types/MyProfile/GeneralTab/generalInformationTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const updateDefaultPicOnGenderChange = async (
  gender: string,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: basicInfoApiConfig.defaultPicByGender,
    method: AllowedHttpMethods.post,
    params: {
      gender: gender,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const updateEmployeeBasicInformation = async (
  prepareObject: EmployeeGeneralInformation,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: basicInfoApiConfig.updateEmployeeDetails,
    method: AllowedHttpMethods.post,
    data: prepareObject,
  })
  const response = await axios(requestConfig)
  return response.data
}

const basicInfoApi = {
  updateDefaultPicOnGenderChange,
  updateEmployeeBasicInformation,
}
export default basicInfoApi
