import { CreateNewTicket } from '../../../../types/Support/RaiseNewTicket/createNewTicketTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, createNewTicketApiConfig } from '../../apiList'

const createNewTicket = async (
  raiseNewTicket: CreateNewTicket,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: createNewTicketApiConfig.createNewTicket,
    method: AllowedHttpMethods.post,
    data: raiseNewTicket,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const createNewTicketApi = {
  createNewTicket,
}

export default createNewTicketApi
