import {
  AllowedHttpMethods,
  qualificationCategoryApiConfig,
} from '../../apiList'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import { QualificationCategoryList } from '../../../../types/MyProfile/QualificationCategoryList/qualificationCategoryTypes'

const getQualificationCategories = async (): Promise<
  QualificationCategoryList[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationCategoryApiConfig.getQualificationCategories,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const addQualificationCategoryByName = async ({
  qualificationCategory,
  qualificationName,
}: QualificationCategoryList): Promise<QualificationCategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationCategoryApiConfig.addNewQualificationCategory,
    method: AllowedHttpMethods.post,
    data: {
      qualificationCategory: qualificationCategory,
      qualificationName: qualificationName,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const deleteQualificationCategoryById = async (
  id: number,
): Promise<QualificationCategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationCategoryApiConfig.deleteQualificationCategory,
    method: AllowedHttpMethods.delete,
    params: {
      id: id,
    },
    data: {
      id: id,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const qualificationCategoryApi = {
  getQualificationCategories,
  addQualificationCategoryByName,
  deleteQualificationCategoryById,
}
export default qualificationCategoryApi
