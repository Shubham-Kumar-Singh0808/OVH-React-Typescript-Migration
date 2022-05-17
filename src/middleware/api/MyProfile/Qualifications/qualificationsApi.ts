import { AllowedHttpMethods, qualificationsApi } from '../../apiList'
import {
  EmployeeQualifications,
  EmployeeSkills,
  PostGraduationAndGraduationList,
} from '../../../../types/MyProfile/Qualifications/qualificationTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

export const getEmployeeQualifications = async (
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

export const getEmployeeSkills = async (): Promise<EmployeeSkills[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.getEmployeeSkillsList,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

export const getPgLookUpAndGraduationLookUpListItems =
  async (): Promise<PostGraduationAndGraduationList> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: qualificationsApi.getPostGraduationAndGraduationList,
      method: AllowedHttpMethods.get,
    })
    const response = await axios(requestConfig)
    return response.data
  }

export const saveInitialEmployeeQualifications = async (
  addQualification: EmployeeQualifications,
): Promise<EmployeeQualifications> => {
  const { id, ...addQualificationRest } = addQualification
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.addEmployeeQualifications,
    method: AllowedHttpMethods.post,
    data: { ...addQualificationRest },
  })
  const response = await axios(requestConfig)
  return response.data
}
export const updateEmployeeQualifications = async (
  addQualification: EmployeeQualifications,
): Promise<EmployeeQualifications> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApi.updateEmployeeQualifications,
    method: AllowedHttpMethods.put,
    params: {
      empId: addQualification.empId as number,
    },
    data: addQualification,
  })
  const response = await axios(requestConfig)
  return response.data
}
