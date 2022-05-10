import {
  EmployeeQualifications,
  EmployeeCertifications,
  EmployeeSkills,
} from '../../../types/Qualifications/qualificationTypes'

import { methods, qualificationsApi } from '../apiList'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../utils/apiUtils'

export const fetchEmployeeQualifications = async (
  employeeId: string | number,
): Promise<EmployeeQualifications> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.getEmployeeQualifications,
    method: methods.get,
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
    method: methods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

export const fetchEmployeeSkills = async (): Promise<EmployeeSkills[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.getEmployeeSkillsList,
    method: methods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}
