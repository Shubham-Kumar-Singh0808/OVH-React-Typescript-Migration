import { AllowedHttpMethods, qualificationsApiConfig } from '../../apiList'
import {
  EditEmployeeCertificates,
  EmployeeCertifications,
  getAllTechnologyLookUp,
  getCertificateType,
} from '../../../../types/MyProfile/Qualifications/certificationTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeeCertificates = async (): Promise<EmployeeCertifications[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApiConfig.getEmployeeCertificates,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getAllTechnologies = async (): Promise<
  getAllTechnologyLookUp[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApiConfig.getAllTechnologies,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getCertificateByTechnologyName = async (
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

const addEmployeeCertification = async (
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

const getCertificationInformationById = async (
  id: number,
): Promise<EditEmployeeCertificates> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: `${qualificationsApiConfig.getEmployeeCertificate}/${id}`,
    method: AllowedHttpMethods.get,
  })
  const responseVisa = await axios(requestConfig)
  return responseVisa.data
}
const updateEmployeeCertificate = async (
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

const deleteEmployeeCertification = async (
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
  getEmployeeCertificates,
  getAllTechnologies,
  getCertificateByTechnologyName,
  addEmployeeCertification,
  getCertificationInformationById,
  updateEmployeeCertificate,
  deleteEmployeeCertification,
}
export default certificationsApi
