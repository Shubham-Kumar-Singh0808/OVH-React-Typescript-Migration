import {
  AllowedHttpMethods,
  employeeHandbookSettingsApiConfig,
} from '../../apiList'
import {
  EmployeeHandbookListApiProps,
  EmployeeHandbookListResponse,
} from '../../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeeHandbooks = async (
  props: EmployeeHandbookListApiProps,
): Promise<EmployeeHandbookListResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeHandbookSettingsApiConfig.getEmployeeHandbooks,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const deleteEmployeeHandbook = async (
  bookId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeHandbookSettingsApiConfig.deleteEmployeeHandbook,
    method: AllowedHttpMethods.delete,
    params: {
      bookId: bookId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const employeeHandbookSettingsApi = {
  getEmployeeHandbooks,
  deleteEmployeeHandbook,
}

export default employeeHandbookSettingsApi
