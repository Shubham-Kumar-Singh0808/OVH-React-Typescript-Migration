import { CategoryList } from '../../../../../types/ExpenseManagement/Category/categoryListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { AllowedHttpMethods, categoryListApiConfig } from '../../../apiList'

const addNewCategory = async (
  categoryName: string,
): Promise<CategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoryListApiConfig.addCategory,
    method: AllowedHttpMethods.post,
    data: {
      categoryName,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const checkDuplicateCategory = async (
  categoryName: string,
): Promise<boolean | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoryListApiConfig.checkForDuplicateCategory,
    method: AllowedHttpMethods.get,
    params: { categoryName },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addNewCategoryApi = {
  addNewCategory,
  checkDuplicateCategory,
}

export default addNewCategoryApi
