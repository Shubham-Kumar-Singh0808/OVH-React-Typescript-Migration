import { AllowedHttpMethods, categoriesApi } from '../../apiList'

import { CategoryListItem } from '../../../../types/MyProfile/Categories/categoryTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

export const getAllCategoryList = async (): Promise<CategoryListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApi.getAllCategories,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

export const postNewCategoryByName = async (
  toAddCategoryName: string,
): Promise<CategoryListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApi.addCategory,
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

export const deleteCategoryById = async (
  categoryId: number,
): Promise<CategoryListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApi.deleteCategory,
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
