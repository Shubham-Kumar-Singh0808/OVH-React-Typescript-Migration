import axios from 'axios'
import { AllowedHttpMethods, skillsApiConfig } from '../../apiList'
import { Skill } from '../../../../types/MyProfile/Skills/skillTypes'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getAllSkills = async (categoryId: number): Promise<Skill[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: skillsApiConfig.getSkillListForCategory,
    method: AllowedHttpMethods.get,
    params: { categoryId },
    data: { categoryId },
  })

  const response = await axios(requestConfig)
  return response.data
}

const createSkill = async (
  categoryId: number,
  skillName: string,
): Promise<Skill[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: skillsApiConfig.addNewSkillForCategory,
    method: AllowedHttpMethods.get,
    params: {
      categoryId,
      skillName,
    },
    data: {
      categoryId,
      skillName,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const deleteSkill = async (skillId: number): Promise<Skill[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: skillsApiConfig.deleteSkillForCategory,
    method: AllowedHttpMethods.get,
    params: {
      skillId,
    },
    data: {
      skillId,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const skillApi = { getAllSkills, createSkill, deleteSkill }

export default skillApi
