import { AllowedHttpMethods, categoriesApiConfig } from '../../apiList'
import { Category } from '../../../../types/MyProfile/Categories/categoryTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'

const getAllCategories = async (): Promise<Category[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApiConfig.getAllCategories,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const createCategory = async (categoryName: string): Promise<Category[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApiConfig.addCategory,
    method: AllowedHttpMethods.get,
    params: {
      categoryName,
    },
    data: {
      categoryName,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteCategory = async (categoryId: number): Promise<Category[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApiConfig.deleteCategory,
    method: AllowedHttpMethods.get,
    params: {
      categoryId,
    },
    data: {
      categoryId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const categoryApi = {
  getAllCategories,
  createCategory,
  deleteCategory,
}

export default categoryApi
