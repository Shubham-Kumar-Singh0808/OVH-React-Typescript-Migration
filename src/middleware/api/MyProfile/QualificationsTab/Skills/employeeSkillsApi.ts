import { AllowedHttpMethods, employeeSkillsApiConfig } from '../../../apiList'

import { SkillListItem } from '../../../../../types/MyProfile/QualificationsTab/Skills/employeeSkillTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'
import { EmployeeSkills } from '../../../../../types/MyProfile/QualificationsTab/Skills/employeeSkillTypes'

const getEmployeeSkills = async (): Promise<EmployeeSkills[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeSkillsApiConfig.getEmployeeSkills,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getAllSkillListById = async (
  categoryId: number,
): Promise<SkillListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeSkillsApiConfig.getSkillListForCategory,
    method: AllowedHttpMethods.get,
    params: { categoryId: categoryId },
    data: { categoryId: categoryId },
  })

  const response = await axios(requestConfig)
  return response.data
}

const postNewSkillByName = async (
  categoryId: number,
  toAddSkillName: string,
): Promise<SkillListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeSkillsApiConfig.addNewSkillForCategory,
    method: AllowedHttpMethods.get,
    params: {
      categoryId: categoryId,
      skillName: toAddSkillName,
    },
    data: {
      categoryId: categoryId,
      skillName: toAddSkillName,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const deleteSkillById = async (skillId: number): Promise<SkillListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeSkillsApiConfig.deleteSkillForCategory,
    method: AllowedHttpMethods.get,
    params: {
      skillId: skillId,
    },
    data: {
      skillId: skillId,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const skillApi = {
  getEmployeeSkills,
  getAllSkillListById,
  postNewSkillByName,
  deleteSkillById,
}

export default skillApi
