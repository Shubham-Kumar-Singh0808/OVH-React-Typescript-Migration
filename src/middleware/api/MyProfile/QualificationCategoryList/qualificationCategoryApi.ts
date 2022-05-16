import { AllowedHttpMethods, qualificationCategoryApi } from '../../apiList'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import { QualificationCategoryList } from '../../../../types/MyProfile/QualificationCategoryList/qualificationCategoryTypes'

export const getAllQualificationCategoryList = async (): Promise<
  QualificationCategoryList[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationCategoryApi.getAllQualificationCategories,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

export const postNewQualificationCategoryByName = async ({
  qualificationCategory,
  qualificationName,
}: QualificationCategoryList): Promise<QualificationCategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationCategoryApi.addNewQualificationCategory,
    method: AllowedHttpMethods.post,
    data: {
      qualificationCategory: qualificationCategory,
      qualificationName: qualificationName,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

export const deleteQualificationCategoryById = async (
  id: number,
): Promise<QualificationCategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationCategoryApi.deleteQualificationCategory,
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
