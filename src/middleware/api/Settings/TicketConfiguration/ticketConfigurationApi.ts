import { AllowedHttpMethods, ticketConfigurationApiConfig } from '../../apiList'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  TicketConfigurationCategories,
  TicketConfigurationDepartments,
  TicketConfigurationSubCategories,
  TicketConfigurationSubCategoryList,
  TicketConfigurationSubCategoryType,
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

const ticketConfigurationApi = {
  getTicketConfigurationDepartments,
  getTicketConfigurationCategories,
  getTicketConfigurationSubCategories,
  getTicketConfigurationSubCategoryList,
  deleteSubCategory,
}

export default ticketConfigurationApi
