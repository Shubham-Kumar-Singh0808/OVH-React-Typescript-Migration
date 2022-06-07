import {
  AllowedHttpMethods,
  employeeCertificationsApiConfig,
} from '../../../apiList'
import {
  CertificateType,
  EditEmployeeCertificates,
  EmployeeCertifications,
  Technology,
} from '../../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'

const getEmployeeCertificates = async (): Promise<EmployeeCertifications[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeCertificationsApiConfig.getEmployeeCertificates,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getTechnologies = async (): Promise<Technology[] | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeCertificationsApiConfig.getTechnologies,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getCertificateByTechnologyName = async (
  technologyName: string,
): Promise<CertificateType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeCertificationsApiConfig.getCertificateByTechnology,
    method: AllowedHttpMethods.get,
    params: {
      technologyName: technologyName,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const createEmployeeCertification = async (
  employeeCertificateDetails: EmployeeCertifications,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeCertificationsApiConfig.createEmployeeCertification,
    method: AllowedHttpMethods.post,
    data: employeeCertificateDetails,
  })
  const responseVisa = await axios(requestConfig)
  return responseVisa.data
}

const getEmployeeCertificate = async (
  id: number,
): Promise<EditEmployeeCertificates> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: `${employeeCertificationsApiConfig.getEmployeeCertificate}/${id}`,
    method: AllowedHttpMethods.get,
  })
  const responseVisa = await axios(requestConfig)
  return responseVisa.data
}
const updateEmployeeCertificate = async (
  certificateDetails: EmployeeCertifications,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeCertificationsApiConfig.updateEmployeeCertificate,
    method: AllowedHttpMethods.put,
    data: certificateDetails,
  })
  const response = await axios(requestConfig)
  return response.data
}

const deleteEmployeeCertificate = async (
  certificationId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeCertificationsApiConfig.deleteEmployeeCertificate,
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

const employeeCertificationsApi = {
  getEmployeeCertificates,
  getTechnologies,
  getCertificateByTechnologyName,
  createEmployeeCertification,
  getEmployeeCertificate,
  updateEmployeeCertificate,
  deleteEmployeeCertificate,
}
export default employeeCertificationsApi
