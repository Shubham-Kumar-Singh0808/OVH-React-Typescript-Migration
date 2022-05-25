import { AllowedHttpMethods, skillsApiConfig } from '../../apiList'

import { SkillListItem } from '../../../../types/MyProfile/Skills/skillTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getAllSkillListById = async (
  categoryId: number,
): Promise<SkillListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: skillsApiConfig.getSkillListForCategory,
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
    url: skillsApiConfig.addNewSkillForCategory,
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
    url: skillsApiConfig.deleteSkillForCategory,
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

const skillApi = { getAllSkillListById, postNewSkillByName, deleteSkillById }

export default skillApi
