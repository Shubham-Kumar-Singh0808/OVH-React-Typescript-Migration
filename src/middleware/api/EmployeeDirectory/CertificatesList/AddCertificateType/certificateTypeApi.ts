import { AllowedHttpMethods, certificateTypeApiConfig } from '../../../apiList'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { CertificateType } from '../../../../../types/EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypes'

const getCertificateTypes = async (): Promise<CertificateType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificateTypeApiConfig.getCertificateTypes,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const checkIsCertificateTypeExists = async ({
  technologyId,
  certificateType,
}: CertificateType): Promise<boolean | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificateTypeApiConfig.checkIsCertificateTypeExists,
    method: AllowedHttpMethods.get,
    params: {
      technologyId,
      certificateType,
    },
  })
  const response = await useAxios(requestConfig)
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
      technologyId,
      certificateType,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteCertificateType = async (
  certificateId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificateTypeApiConfig.deleteCertificateType,
    method: AllowedHttpMethods.delete,
    params: {
      certificateId,
    },
    data: {
      certificateId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getCertificateType = async (
  certificateId: number,
): Promise<CertificateType> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificateTypeApiConfig.getCertificateType,
    method: AllowedHttpMethods.get,
    params: {
      certificateId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateCertificateType = async (
  certificateTypeDetails: CertificateType,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificateTypeApiConfig.updateCertificateType,
    method: AllowedHttpMethods.put,
    data: certificateTypeDetails,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const certificateTypesApi = {
  getCertificateTypes,
  addCertificateType,
  checkIsCertificateTypeExists,
  deleteCertificateType,
  getCertificateType,
  updateCertificateType,
}

export default certificateTypesApi
