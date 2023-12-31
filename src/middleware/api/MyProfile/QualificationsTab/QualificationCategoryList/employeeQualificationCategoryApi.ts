import {
  AllowedHttpMethods,
  employeeQualificationCategoryApiConfig,
} from '../../../apiList'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { QualificationCategory } from '../../../../../types/MyProfile/QualificationsTab/QualificationCategoryList/employeeQualificationCategoryTypes'

const getQualificationCategories = async (): Promise<
  QualificationCategory[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeQualificationCategoryApiConfig.getQualificationCategories,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const createQualificationCategory = async ({
  qualificationCategory,
  qualificationName,
}: QualificationCategory): Promise<QualificationCategory[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeQualificationCategoryApiConfig.createQualificationCategory,
    method: AllowedHttpMethods.post,
    data: {
      qualificationCategory,
      qualificationName,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteQualificationCategory = async (
  id: number,
): Promise<QualificationCategory[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeQualificationCategoryApiConfig.deleteQualificationCategory,
    method: AllowedHttpMethods.delete,
    params: {
      id,
    },
    data: {
      id,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const employeeQualificationCategoryApi = {
  getQualificationCategories,
  createQualificationCategory,
  deleteQualificationCategory,
}
export default employeeQualificationCategoryApi
