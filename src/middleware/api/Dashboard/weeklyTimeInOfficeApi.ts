import { TimeInOffice } from '../../../types/Dashboard/TimeInOffice/weeklyTimeInOfficeTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import { dashboardApiConfig, AllowedHttpMethods } from '../apiList'

const getEmployeeTimeInOffice = async (): Promise<
  TimeInOffice[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.getEmployeeTimeInOffice,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const weeklyTimeInOfficeApi = {
  getEmployeeTimeInOffice,
}

export default weeklyTimeInOfficeApi
