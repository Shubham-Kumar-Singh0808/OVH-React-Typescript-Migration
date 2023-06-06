import {
  CategoryList,
  SubCategoryList,
} from '../../../../types/ExpenseManagement/Sub-Category/subCategoryListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  ExpenseSubCategoryListApiConfig,
} from '../../apiList'

const getCategoryList = async (): Promise<CategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ExpenseSubCategoryListApiConfig.getCategoryList,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getSubCategoryList = async (): Promise<SubCategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ExpenseSubCategoryListApiConfig.getSubCategoryList,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addSubCategoryList = async ({
  categoryId,
  subCategoryName,
}: {
  categoryId: number
  subCategoryName: string
}): Promise<SubCategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ExpenseSubCategoryListApiConfig.addSubCategoryList,
    method: AllowedHttpMethods.post,
    data: { categoryId, subCategoryName },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const existSubCategoryList = async ({
  categoryId,
  subCategoryName,
}: {
  categoryId: number
  subCategoryName: string
}): Promise<SubCategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ExpenseSubCategoryListApiConfig.checkForDuplicateSubCategory,
    method: AllowedHttpMethods.get,
    params: { categoryId, subCategoryName },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const editSubCategoryList = async (
  subCategoryId: number,
): Promise<SubCategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ExpenseSubCategoryListApiConfig.editSubCategory,
    method: AllowedHttpMethods.get,
    params: { subCategoryId },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updateSubCategoryList = async (
  data: SubCategoryList,
): Promise<SubCategoryList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ExpenseSubCategoryListApiConfig.updateSubCategory,
    method: AllowedHttpMethods.put,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteSubCategoryList = async (
  subCategoryId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ExpenseSubCategoryListApiConfig.deleteSubCategory,
    method: AllowedHttpMethods.delete,
    params: { subCategoryId },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const subCategoryListApi = {
  getCategoryList,
  getSubCategoryList,
  addSubCategoryList,
  existSubCategoryList,
  editSubCategoryList,
  updateSubCategoryList,
  deleteSubCategoryList,
}

export default subCategoryListApi
