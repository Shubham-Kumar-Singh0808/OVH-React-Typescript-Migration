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

const getEmployeesHandbook = async (
  props: EmployeeHandbookListApiProps,
): Promise<EmployeeHandbookListResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeHandbookSettingsApiConfig.getEmployeeHandbookList,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const employeeHandbookSettingsApi = {
  getEmployeesHandbook,
}

export default employeeHandbookSettingsApi
