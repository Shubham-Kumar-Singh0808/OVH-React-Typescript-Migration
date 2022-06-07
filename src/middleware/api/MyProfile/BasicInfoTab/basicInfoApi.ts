import { AllowedHttpMethods, basicInfoApiConfig } from '../../apiList'

import { EmployeeGeneralInformation } from '../../../../types/MyProfile/GeneralTab/generalInformationTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import { DownloadCVReturn, UploadFileReturn } from '../../../../types/apiTypes'

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

const uploadEmployeeCV = async (
  prepareObject: UploadFileReturn,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: basicInfoApiConfig.uploadEmployeeCV,
    method: AllowedHttpMethods.post,
    data: { data: prepareObject.file },
    params: {
      personId: prepareObject.personId,
    },
    additionalHeaders: {
      'Content-Type': 'multipart/form-data',
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeCV = async (
  prepareObject: DownloadCVReturn,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: basicInfoApiConfig.downloadEmployeeCV,
    method: AllowedHttpMethods.get,
    params: {
      fileName: prepareObject.fileName,
      token: prepareObject.token,
      tenantKey: prepareObject.tenantKey,
    },
    responseType: 'blob',
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
  uploadEmployeeCV,
  getEmployeeCV,
}
export default basicInfoApi
