import {
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

const employeeAccountsApi = {
  getFinanceDetails,
}

export default employeeAccountsApi
