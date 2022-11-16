import { AllowedHttpMethods, ticketConfigurationApiConfig } from '../../apiList'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  AddCategory,
  AddSubCategoryDetails,
  Category,
  TicketConfigurationCategories,
  TicketConfigurationDepartments,
  TicketConfigurationSubCategories,
  TicketConfigurationSubCategoryList,
  TicketConfigurationSubCategoryType,
  TicketHistoryProps,
  TicketHistoryResponse,
} from '../../../../types/Settings/TicketConfiguration/ticketConfigurationTypes'

const getTicketConfigurationDepartments = async (): Promise<
  TicketConfigurationDepartments[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketConfigurationApiConfig.getDepartments,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getTicketConfigurationCategories = async (
  deptId: number,
): Promise<TicketConfigurationCategories[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketConfigurationApiConfig.getCategories,
    method: AllowedHttpMethods.get,
    params: { deptId },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getTicketConfigurationSubCategories = async (
  categoryId: number,
): Promise<TicketConfigurationSubCategories[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketConfigurationApiConfig.getSubCategories,
    method: AllowedHttpMethods.get,
    params: { categoryId },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getTicketConfigurationSubCategoryList = async (
  prepareObject: TicketConfigurationSubCategoryType,
): Promise<TicketConfigurationSubCategoryList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketConfigurationApiConfig.getSubCategoryList,
    method: AllowedHttpMethods.post,
    data: {
      departmentId: prepareObject.departmentId,
      categoryId: prepareObject.categoryId ?? '',
      subCategoryId: prepareObject.subCategoryId ?? '',
    },
    params: {
      endIndex: prepareObject.endIndex ?? 20,
      startIndex: prepareObject.startIndex ?? 0,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deleteSubCategory = async (
  subCategoryId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketConfigurationApiConfig.deleteSubCategory,
    method: AllowedHttpMethods.delete,
    params: {
      subCategoryId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const ticketHistory = async (
  props: TicketHistoryProps,
): Promise<TicketHistoryResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketConfigurationApiConfig.ticketHistory,
    method: AllowedHttpMethods.get,
    params: {
      filterName: props.filterName ?? 20,
      id: props.id,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addSubCategory = async (
  newSubCategoryDetails: AddSubCategoryDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketConfigurationApiConfig.addSubCategory,
    method: AllowedHttpMethods.post,
    data: newSubCategoryDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getAllCategory = async (): Promise<Category[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketConfigurationApiConfig.getAllCategory,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addCategory = async (
  newCategoryDetails: AddCategory,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketConfigurationApiConfig.addCategory,
    method: AllowedHttpMethods.post,
    data: newCategoryDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateCategory = async (
  updateCategoryDetails: Category,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketConfigurationApiConfig.updateCategory,
    method: AllowedHttpMethods.put,
    data: updateCategoryDetails,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteCategory = async (
  categoryId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketConfigurationApiConfig.deleteCategory,
    method: AllowedHttpMethods.delete,
    params: {
      categoryId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const ticketConfigurationApi = {
  getTicketConfigurationDepartments,
  getTicketConfigurationCategories,
  getTicketConfigurationSubCategories,
  getTicketConfigurationSubCategoryList,
  deleteSubCategory,
  ticketHistory,
  addSubCategory,
  getAllCategory,
  addCategory,
  updateCategory,
  deleteCategory,
}

export default ticketConfigurationApi
