import { AllowedHttpMethods, employeeSkillsApiConfig } from '../../../apiList'

import { EmployeeSkills } from '../../../../../types/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'

const getEmployeeSkills = async (): Promise<EmployeeSkills[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeSkillsApiConfig.getEmployeeSkills,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const employeeSkillApi = {
  getEmployeeSkills,
}

export default employeeSkillApi
