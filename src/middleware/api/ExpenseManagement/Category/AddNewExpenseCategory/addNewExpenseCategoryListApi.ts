import { EditCategory } from '../../../../../types/ExpenseManagement/Category/AddExpenseCategory/addExpenseCategoryTypes'
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
    data: {
      categoryName,
    },
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

const editNewCategory = async (
  categoryId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoryListApiConfig.editCategory,
    method: AllowedHttpMethods.get,
    params: { categoryId },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateNewCategory = async (data: EditCategory): Promise<EditCategory> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoryListApiConfig.updateCategory,
    method: AllowedHttpMethods.put,
    data,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deleteCategory = async (
  categoryId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoryListApiConfig.deleteCategory,
    method: AllowedHttpMethods.delete,
    params: { categoryId },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addNewCategoryApi = {
  addNewCategory,
  checkDuplicateCategory,
  editNewCategory,
  updateNewCategory,
  deleteCategory,
}

export default addNewCategoryApi
