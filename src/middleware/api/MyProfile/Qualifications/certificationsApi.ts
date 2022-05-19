import { AllowedHttpMethods, qualificationsApiConfig } from '../../apiList'
import {
  EditEmployeeCertificates,
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
    url: qualificationsApiConfig.getEmployeeCertificatesList,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

export const getAllTechnologies = async (): Promise<
  getAllTechnologyLookUp[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApiConfig.getAllTechnologyList,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

export const getCertificateByTechnologyName = async (
  technologyName: string,
): Promise<getCertificateType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApiConfig.getCertificateByTechnology,
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
    url: qualificationsApiConfig.addEmployeeCertificates,
    method: AllowedHttpMethods.post,
    data: employeeCertificateDetails,
  })
  const responseVisa = await axios(requestConfig)
  return responseVisa.data
}

export const getCertificationInformationById = async (
  id: number,
): Promise<EditEmployeeCertificates> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: `${qualificationsApiConfig.getEmployeeCertificate}/${id}`,
    method: AllowedHttpMethods.get,
  })
  const responseVisa = await axios(requestConfig)
  return responseVisa.data
}
export const updateEmployeeCertificateDetails = async (
  certificateDetails: EmployeeCertifications,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApiConfig.updateEmployeeCertificate,
    method: AllowedHttpMethods.put,
    data: certificateDetails,
  })
  const response = await axios(requestConfig)
  return response.data
}

export const deleteEmployeeCertification = async (
  certificationId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApiConfig.deleteEmployeeCertificate,
    method: AllowedHttpMethods.delete,
    params: {
      certificationId: certificationId,
    },
    data: {
      certificationId: certificationId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const certificationsApi = {
  getEmployeeCertifications,
  getAllTechnologies,
  getCertificateByTechnologyName,
  addNewCertificate,
  getCertificationInformationById,
  updateEmployeeCertificateDetails,
  deleteEmployeeCertification,
}
export default certificationsApi
