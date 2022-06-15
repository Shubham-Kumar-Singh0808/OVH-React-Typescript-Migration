import { AllowedHttpMethods, certificateTypeApiConfig } from '../../../apiList'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'
import { CertificateType } from '../../../../../types/EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypes'

const getCertificateTypes = async (): Promise<CertificateType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificateTypeApiConfig.getCertificateTypes,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const addCertificateType = async ({
  technologyId,
  certificateType,
}: CertificateType): Promise<CertificateType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificateTypeApiConfig.addCertificateType,
    method: AllowedHttpMethods.post,
    data: {
      technologyId: technologyId,
      certificateType: certificateType,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const deleteCertificateType = async (
  certificateId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificateTypeApiConfig.deleteCertificateType,
    method: AllowedHttpMethods.delete,
    params: {
      certificateId: certificateId,
    },
    data: {
      certificateId: certificateId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const certificateTypesApi = {
  getCertificateTypes,
  addCertificateType,
  deleteCertificateType,
}

export default certificateTypesApi
