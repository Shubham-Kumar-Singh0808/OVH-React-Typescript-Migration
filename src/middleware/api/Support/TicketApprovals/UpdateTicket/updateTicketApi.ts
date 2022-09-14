import {
  GetActiveEmployee,
  GetAudit,
  GetTicketToEdit,
} from '../../../../../types/Support/TicketApprovals/UpdateTicket/updateTicketTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { AllowedHttpMethods, updateTicketApiConfig } from '../../../apiList'

const getTicketToEdit = async (ticketId: number): Promise<GetTicketToEdit> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: updateTicketApiConfig.getTicket,
    method: AllowedHttpMethods.get,
    params: {
      ticketId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAudit = async (
  ticketId: number,
): Promise<{ size: number; list: GetAudit[] }> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: updateTicketApiConfig.getAudit,
    method: AllowedHttpMethods.get,
    params: {
      filterName: 'support',
      id: ticketId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getActiveEmployeeList = async (): Promise<GetActiveEmployee[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: updateTicketApiConfig.getActiveEmployeeList,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const uploadSupportDoc = async (prepareObject: {
  ticketId: number
  file: FormData
}): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: updateTicketApiConfig.uploadSupportTicketDocuments,
    method: AllowedHttpMethods.post,
    data: prepareObject.file,
    params: {
      ticketId: prepareObject.ticketId,
    },
    additionalHeaders: {
      'Content-Type': 'multipart/form-data',
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateTicketDetails = async (
  updateTicketObj: GetTicketToEdit,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: updateTicketApiConfig.updateIndividualTickets,
    method: AllowedHttpMethods.put,
    data: updateTicketObj,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const approveTicket = async (ticketId: number): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: updateTicketApiConfig.approveTicketByManager,
    method: AllowedHttpMethods.put,
    params: {
      ticketId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updateTicketApi = {
  getTicketToEdit,
  getAudit,
  getActiveEmployeeList,
  uploadSupportDoc,
  updateTicketDetails,
  approveTicket,
}

export default updateTicketApi
