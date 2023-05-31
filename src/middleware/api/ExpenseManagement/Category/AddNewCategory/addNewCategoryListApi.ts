import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { AllowedHttpMethods, categoryListApiConfig } from '../../../apiList'

const addNewCategory = async (
  categoryName: string,
): Promise<string | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoryListApiConfig.addCategory,
    method: AllowedHttpMethods.post,
    data: categoryName,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const checkDuplicateCategory = async (
  categoryName: string,
): Promise<string | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoryListApiConfig.checkForDuplicateCategory,
    method: AllowedHttpMethods.get,
    data: categoryName,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addNewCategoryApi = {
  addNewCategory,
  checkDuplicateCategory,
}

export default addNewCategoryApi
