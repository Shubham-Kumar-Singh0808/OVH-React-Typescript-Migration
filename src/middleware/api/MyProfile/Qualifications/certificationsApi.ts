import { AllowedHttpMethods, qualificationsApi } from '../../apiList'
import {
  EmployeeCertifications,
  getAllTechnologyLookUp,
  getCertificateType,
} from '../../../../types/MyProfile/Qualifications/certificationTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

export const getEmployeeCertifications = async (): Promise<
  EmployeeCertifications[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.getEmployeeCertificatesList,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

export const getAllTechnologies = async (): Promise<
  getAllTechnologyLookUp[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.getAllTechnologyList,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

export const getCertificateByTechnologyName = async (
  technologyName: string,
): Promise<getCertificateType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.getCertificateByTechnology,
    method: AllowedHttpMethods.get,
    params: {
      technologyName: technologyName,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

export const addNewCertificate = async (
  employeeCertificateDetails: EmployeeCertifications,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.addEmployeeCertificates,
    method: AllowedHttpMethods.post,
    data: employeeCertificateDetails,
  })
  const responseVisa = await axios(requestConfig)
  return responseVisa.data
}

export const getCertificationInformationById = async (
  id: number,
): Promise<EmployeeCertifications> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: `${qualificationsApi.getEmployeeCertificate}/${id}`,
    method: AllowedHttpMethods.get,
  })
  const responseVisa = await axios(requestConfig)
  return responseVisa.data
}
