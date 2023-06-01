import { CategoryList } from '../../../../types/ExpenseManagement/Category/categoryListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, categoryListApiConfig } from '../../apiList'

const getExpenseCategories = async (): Promise<CategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoryListApiConfig.getCategoryList,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const categoryListApi = {
  getExpenseCategories,
}

export default categoryListApi
