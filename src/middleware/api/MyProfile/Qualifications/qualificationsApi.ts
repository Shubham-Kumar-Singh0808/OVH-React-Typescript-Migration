import { AllowedHttpMethods, qualificationsApiConfig } from '../../apiList'
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
    url: qualificationsApiConfig.getEmployeeQualifications,
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
    url: qualificationsApiConfig.getEmployeeSkillsList,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

export const getPgLookUpAndGraduationLookUpListItems =
  async (): Promise<PostGraduationAndGraduationList> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: qualificationsApiConfig.getPostGraduationAndGraduationList,
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
    url: qualificationsApiConfig.addEmployeeQualifications,
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
    url: qualificationsApiConfig.updateEmployeeQualifications,
    method: AllowedHttpMethods.put,
    params: {
      empId: addQualification.empId as number,
    },
    data: addQualification,
  })
  const response = await axios(requestConfig)
  return response.data
}

const qualificationsApi = {
  getEmployeeQualifications,
  getEmployeeSkills,
  getPgLookUpAndGraduationLookUpListItems,
  saveInitialEmployeeQualifications,
  updateEmployeeQualifications,
}
export default qualificationsApi
