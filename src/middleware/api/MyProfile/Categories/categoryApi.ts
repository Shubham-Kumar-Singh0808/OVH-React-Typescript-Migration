import { categoriesApi, methods } from '../../apiList'

import { CategoryListItemType } from '../../../../types/MyProfile/Categories/categoryTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

export const getAllCategoryList = async (): Promise<CategoryListItemType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApi.getAllCategories,
    method: methods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

export const postNewCategoryByName = async (
  toAddCategoryName: string,
): Promise<CategoryListItemType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApi.addCategory,
    method: methods.get,
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
): Promise<CategoryListItemType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApi.deleteCategory,
    method: methods.get,
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
