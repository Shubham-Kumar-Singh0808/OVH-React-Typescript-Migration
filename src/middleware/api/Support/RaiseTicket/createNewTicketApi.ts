import { CreateNewTicket } from '../../../../types/Support/RaiseNewTicket/createNewTicketTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, createNewTicketApiConfig } from '../../apiList'

const createNewTicket = async (
  raiseNewTicket: CreateNewTicket,
): Promise<{ ticketId: number }> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: createNewTicketApiConfig.createNewTicket,
    method: AllowedHttpMethods.post,
    data: raiseNewTicket,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const uploadSupportTicketsDocuments = async (prepareObject: {
  ticketId: number
  file: FormData
}): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: createNewTicketApiConfig.uploadSupportTicketsDocument,
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

const createNewTicketApi = {
  createNewTicket,
  uploadSupportTicketsDocuments,
}

export default createNewTicketApi
