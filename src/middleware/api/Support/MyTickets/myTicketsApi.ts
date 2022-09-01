import {
  GetMyTicketsResponse,
  GetTicketsProps,
} from '../../../../types/Support/MyTickets/myTicketsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  ticketListInformationApiConfig,
} from '../../apiList'

const getTickets = async (
  props: GetTicketsProps,
): Promise<GetMyTicketsResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketListInformationApiConfig.getTicketListInformation,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      multiSearch: props.multiSearch,
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportTicketListData = async (
  props: GetTicketsProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketListInformationApiConfig.exportTicketList,
    method: AllowedHttpMethods.get,
    params: {
      multiSearch: props.multiSearch ?? '',
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const myTicketsApi = {
  getTickets,
  exportTicketListData,
}

export default myTicketsApi
