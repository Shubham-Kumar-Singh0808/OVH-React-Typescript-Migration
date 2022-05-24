import { AllowedHttpMethods, certificationsApiConfig } from '../../apiList'
import {
  EditEmployeeCertificates,
  EmployeeCertifications,
  Technology,
  CertificateType,
} from '../../../../types/MyProfile/Qualifications/certificationTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeeCertificates = async (): Promise<EmployeeCertifications[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificationsApiConfig.getEmployeeCertificates,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getTechnologies = async (): Promise<Technology[] | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificationsApiConfig.getTechnologies,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getCertificateByTechnologyName = async (
  technologyName: string,
): Promise<CertificateType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificationsApiConfig.getCertificateByTechnology,
    method: AllowedHttpMethods.get,
    params: {
      technologyName: technologyName,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const addEmployeeCertification = async (
  employeeCertificateDetails: EmployeeCertifications,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificationsApiConfig.addEmployeeCertificates,
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
    url: `${certificationsApiConfig.getEmployeeCertificate}/${id}`,
    method: AllowedHttpMethods.get,
  })
  const responseVisa = await axios(requestConfig)
  return responseVisa.data
}
const updateEmployeeCertificate = async (
  certificateDetails: EmployeeCertifications,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificationsApiConfig.updateEmployeeCertificate,
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
    url: certificationsApiConfig.deleteEmployeeCertificate,
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
  getEmployeeCertificates,
  getTechnologies,
  getCertificateByTechnologyName,
  addEmployeeCertification,
  getEmployeeCertificate,
  updateEmployeeCertificate,
  deleteEmployeeCertificate,
}
export default certificationsApi
