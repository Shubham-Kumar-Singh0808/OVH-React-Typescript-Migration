import {
  DownloadFinanceList,
  EmployeeAccountApiProps,
  GetFinanceDetailsResponse,
} from '../../../../types/Finance/EmployeeAccounts/employeeAccountsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { employeeAccountsApiConfig, AllowedHttpMethods } from '../../apiList'

const getFinanceDetails = async (
  props: EmployeeAccountApiProps,
): Promise<GetFinanceDetailsResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeAccountsApiConfig.financeDetails,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
      employeeName: props.employeeName,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportFinanceList = async (
  props: DownloadFinanceList,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeAccountsApiConfig.exportFinanceList,
    method: AllowedHttpMethods.get,
    params: {
      employeeNameSearch: props.employeeNameSearch,
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const employeeAccountsApi = {
  getFinanceDetails,
  exportFinanceList,
}

export default employeeAccountsApi
