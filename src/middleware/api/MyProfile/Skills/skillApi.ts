import { methods, skillsApi } from '../../apiList'

import { SkillListItemType } from '../../../../types/MyProfile/Skills/skillTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

export const getAllSkillListById = async (
  categoryId: number,
): Promise<SkillListItemType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: skillsApi.getSkillListForCategory,
    method: methods.get,
    params: { categoryId: categoryId },
    data: { categoryId: categoryId },
  })

  const response = await axios(requestConfig)
  return response.data
}

export const postNewSkillByName = async (
  categoryId: number,
  toAddSkillName: string,
): Promise<SkillListItemType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: skillsApi.addNewSkillForCategory,
    method: methods.get,
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
): Promise<SkillListItemType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: skillsApi.deleteSkillForCategory,
    method: methods.get,
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
