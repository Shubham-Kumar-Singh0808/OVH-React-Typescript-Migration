import {
  AchievementTypeIdQueryParameter,
  OutgoingNewAchievementType,
} from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { AchievementType } from '../../../../types/Achievements/commonAchievementTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AddAchieverApiConfig, AllowedHttpMethods } from '../../apiList'

const addAchievementType = async (
  outBody: OutgoingNewAchievementType,
): Promise<void> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AddAchieverApiConfig.addAchievementType,
    method: AllowedHttpMethods.post,
    data: outBody,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAchievementTypeDetails = async (
  query: AchievementTypeIdQueryParameter,
): Promise<AchievementType> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AddAchieverApiConfig.getAchievementTypeDetails,
    method: AllowedHttpMethods.get,
    params: {
      typeId: query.typeId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteAchievementType = async (
  query: AchievementTypeIdQueryParameter,
): Promise<void> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AddAchieverApiConfig.deleteAchievementType,
    method: AllowedHttpMethods.delete,
    params: {
      typeId: query.typeId.toString(),
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AddAchieverApi = {
  addAchievementType,
  getAchievementTypeDetails,
  deleteAchievementType,
}

export default AddAchieverApi
