import {
  EmployeeQualifications,
  EmployeeCertifications,
  EmployeeSkills,
  PostGraduationAndGraduationList,
} from '../../../../types/MyProfile/Qualifications/qualificationTypes'

import { AllowedHttpMethods, qualificationsApi } from '../../apiList'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

export const fetchEmployeeQualifications = async (
  employeeId: string | number,
): Promise<EmployeeQualifications> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.getEmployeeQualifications,
    method: AllowedHttpMethods.get,
    params: {
      empID: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

export const fetchEmployeeCertifications = async (): Promise<
  EmployeeCertifications[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.getEmployeeCertificatesList,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

export const fetchEmployeeSkills = async (): Promise<EmployeeSkills[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.getEmployeeSkillsList,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

export const fetchPgLookUpAndGraduationLookUpListItems =
  async (): Promise<PostGraduationAndGraduationList> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: qualificationsApi.getPostGraduationAndGraduationList,
      method: AllowedHttpMethods.get,
    })
    const response = await axios(requestConfig)
    return response.data
  }

export const saveEmployeeQualifications =
  async (): Promise<EmployeeQualifications> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: qualificationsApi.addEmployeeQualifications,
      method: AllowedHttpMethods.post,
    })
    const response = await axios(requestConfig)
    return response.data
  }
export const updateEmployeeQualifications =
  async (): Promise<EmployeeQualifications> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: qualificationsApi.updateEmployeeQualifications,
      method: AllowedHttpMethods.put,
    })
    const response = await axios(requestConfig)
    return response.data
  }
