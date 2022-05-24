import {
  AllowedHttpMethods,
  employeeQualificationCategoryApiConfig,
} from '../../../apiList'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'
import { QualificationCategoryList } from '../../../../../types/MyProfile/QualificationsTab/QualificationCategoryList/employeeQualificationCategoryTypes'

const getQualificationCategories = async (): Promise<
  QualificationCategoryList[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeQualificationCategoryApiConfig.getQualificationCategories,
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
    url: employeeQualificationCategoryApiConfig.addQualificationCategory,
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
    url: employeeQualificationCategoryApiConfig.deleteQualificationCategory,
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

const employeeQualificationCategoryApi = {
  getQualificationCategories,
  addQualificationCategory,
  deleteQualificationCategory,
}
export default employeeQualificationCategoryApi
