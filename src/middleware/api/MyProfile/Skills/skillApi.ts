import { AllowedHttpMethods, skillsApi } from '../../apiList'

import { SkillListItem } from '../../../../types/MyProfile/Skills/skillTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

export const getAllSkillListById = async (
  categoryId: number,
): Promise<SkillListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: skillsApi.getSkillListForCategory,
    method: AllowedHttpMethods.get,
    params: { categoryId: categoryId },
    data: { categoryId: categoryId },
  })

  const response = await axios(requestConfig)
  return response.data
}

export const postNewSkillByName = async (
  categoryId: number,
  toAddSkillName: string,
): Promise<SkillListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: skillsApi.addNewSkillForCategory,
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

export const deleteSkillById = async (
  skillId: number,
): Promise<SkillListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: skillsApi.deleteSkillForCategory,
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
