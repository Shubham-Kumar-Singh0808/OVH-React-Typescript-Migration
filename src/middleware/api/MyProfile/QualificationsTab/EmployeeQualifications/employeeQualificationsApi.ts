/* eslint-disable @typescript-eslint/no-unused-vars */
// Todo: remove eslint and fix all the errors

import { AllowedHttpMethods, qualificationsApiConfig } from '../../../apiList'
import {
  EmployeeQualification,
  PostGraduationAndGraduationList,
} from '../../../../../types/MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'

const getEmployeeQualifications = async (
  employeeId: string | number | undefined,
): Promise<EmployeeQualification> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApiConfig.getEmployeeQualifications,
    method: AllowedHttpMethods.get,
    params: {
      empID: employeeId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getPgLookUpAndGraduationLookUpItems =
  async (): Promise<PostGraduationAndGraduationList> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: qualificationsApiConfig.getPostGraduationAndGraduationLookUp,
      method: AllowedHttpMethods.get,
    })
    const response = await useAxios(requestConfig)
    return response.data
  }

const addEmployeeQualifications = async (
  addQualification: EmployeeQualification,
): Promise<EmployeeQualification> => {
  const { id, ...addQualificationRest } = addQualification
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApiConfig.addEmployeeQualifications,
    method: AllowedHttpMethods.post,
    data: { ...addQualificationRest },
  })
  const response = await useAxios(requestConfig)
  return response.data
}
const updateEmployeeQualifications = async (
  addQualification: EmployeeQualification,
): Promise<EmployeeQualification> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationsApiConfig.updateEmployeeQualifications,
    method: AllowedHttpMethods.put,
    params: {
      empId: addQualification.empId as number,
    },
    data: addQualification,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const employeeQualificationsApi = {
  getEmployeeQualifications,
  getPgLookUpAndGraduationLookUpItems,
  addEmployeeQualifications,
  updateEmployeeQualifications,
}
export default employeeQualificationsApi
