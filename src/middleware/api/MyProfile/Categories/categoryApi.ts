import { AllowedHttpMethods, categoriesApiConfig } from '../../apiList'

import { CategoryListItem } from '../../../../types/MyProfile/Categories/categoryTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getAllCategoryList = async (): Promise<CategoryListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApiConfig.getAllCategories,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const postNewCategoryByName = async (
  toAddCategoryName: string,
): Promise<CategoryListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApiConfig.addCategory,
    method: AllowedHttpMethods.get,
    params: {
      categoryName: toAddCategoryName,
    },
    data: {
      categoryName: toAddCategoryName,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const deleteCategoryById = async (
  categoryId: number,
): Promise<CategoryListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApiConfig.deleteCategory,
    method: AllowedHttpMethods.get,
    params: {
      categoryId: categoryId,
    },
    data: {
      categoryId: categoryId,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const categoryApi = {
  getAllCategoryList,
  postNewCategoryByName,
  deleteCategoryById,
}

export default categoryApi
