import axios from 'axios'
import { AllowedHttpMethods, ticketConfigurationApiConfig } from '../../apiList'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import {
  TicketConfigurationCategories,
  TicketConfigurationDepartments,
  TicketConfigurationSubCategories,
} from '../../../../types/Settings/TicketConfiguration/ticketConfigurationTypes'

const getTicketConfigurationDepartments = async (): Promise<
  TicketConfigurationDepartments[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketConfigurationApiConfig.getDepartments,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
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
  const response = await axios(requestConfig)
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
  const response = await axios(requestConfig)
  return response.data
}

const ticketConfigurationApi = {
  getTicketConfigurationDepartments,
  getTicketConfigurationCategories,
  getTicketConfigurationSubCategories,
}

export default ticketConfigurationApi
