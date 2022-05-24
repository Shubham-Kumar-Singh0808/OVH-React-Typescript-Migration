import { AllowedHttpMethods, qualificationsApiConfig } from '../../../apiList'
import {
  EmployeeQualifications,
  PostGraduationAndGraduationList,
} from '../../../../../types/MyProfile/QualificationsTab/Qualifications/employeeQualificationTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'

const getEmployeeQualifications = async (
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

const getPgLookUpAndGraduationLookUpItems =
  async (): Promise<PostGraduationAndGraduationList> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: qualificationsApiConfig.getPostGraduationAndGraduationLookUp,
      method: AllowedHttpMethods.get,
    })
    const response = await axios(requestConfig)
    return response.data
  }

const addEmployeeQualifications = async (
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
const updateEmployeeQualifications = async (
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
  getPgLookUpAndGraduationLookUpItems,
  addEmployeeQualifications,
  updateEmployeeQualifications,
}
export default qualificationsApi
