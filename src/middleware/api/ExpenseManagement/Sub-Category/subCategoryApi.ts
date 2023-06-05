import {
  AddSubCategoryList,
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

const addSubCategoryList = async (
  props: AddSubCategoryList,
): Promise<AddSubCategoryList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ExpenseSubCategoryListApiConfig.addSubCategoryList,
    method: AllowedHttpMethods.post,
    params: { categoryId: props.id, subCategoryName: props.subCategoryName },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const existSubCategoryList = async (
  props: AddSubCategoryList,
): Promise<AddSubCategoryList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ExpenseSubCategoryListApiConfig.checkForDuplicateSubCategory,
    method: AllowedHttpMethods.get,
    params: { categoryId: props.id, subCategoryName: props.subCategoryName },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const subCategoryListApi = {
  getCategoryList,
  getSubCategoryList,
  addSubCategoryList,
  existSubCategoryList,
}

export default subCategoryListApi
