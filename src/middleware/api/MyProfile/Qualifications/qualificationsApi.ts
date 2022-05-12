import {
  EmployeeQualificationsType,
  CertificationDetailsType,
  SkillDetailsType,
} from '../../../../types/MyProfile/Qualifications/qualificationTypes'

import { AllowedHttpMethods, qualificationsApi } from '../../apiList'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

export const fetchEmployeeQualifications = async (
  employeeId: string | number,
): Promise<EmployeeQualificationsType> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.employeeQualifications,
    method: AllowedHttpMethods.get,
    params: {
      empID: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

export const fetchEmployeeCertifications = async (): Promise<
  CertificationDetailsType[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.getEmployeeCertificatesList,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

export const fetchEmployeeSkills = async (): Promise<SkillDetailsType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.getEmployeeSkillsList,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}
