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

const addQualificationCategory = async ({
  qualificationCategory,
  qualificationName,
}: QualificationCategoryList): Promise<QualificationCategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationCategoryApiConfig.addQualificationCategory,
    method: AllowedHttpMethods.post,
    data: {
      qualificationCategory: qualificationCategory,
      qualificationName: qualificationName,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const deleteQualificationCategory = async (
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
  addQualificationCategory,
  deleteQualificationCategory,
}
export default qualificationCategoryApi
