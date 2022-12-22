import {
  AchievementTypeIdQueryParameter,
  IncomingActiveEmployee,
  IncomingEmployeeImageData,
  OutgoingNewAchievementType,
  OutgoingNewAchiever,
  OutgoingUpdateAchievementType,
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

const updateAchievementTypeDetails = async (
  incomingBody: OutgoingUpdateAchievementType,
): Promise<void> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AddAchieverApiConfig.updateAchievementTypeDetails,
    method: AllowedHttpMethods.put,
    data: incomingBody,
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

const getActiveEmployeeList = async (): Promise<IncomingActiveEmployee[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AddAchieverApiConfig.getActiveEmployeeList,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addAchievement = async (
  outBody: OutgoingNewAchiever,
): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AddAchieverApiConfig.addAchievement,
    method: AllowedHttpMethods.post,
    data: outBody,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getImageData = async (
  empId: number,
): Promise<IncomingEmployeeImageData> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AddAchieverApiConfig.getImageData,
    method: AllowedHttpMethods.get,
    params: {
      id: empId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AddAchieverApi = {
  addAchievementType,
  getAchievementTypeDetails,
  updateAchievementTypeDetails,
  deleteAchievementType,
  getActiveEmployeeList,
  addAchievement,
  getImageData,
}

export default AddAchieverApi
