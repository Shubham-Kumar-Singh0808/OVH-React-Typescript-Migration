import {
  provisionPeriodApiProps,
  UpcomingProvisionPeriodResponse,
} from '../../../types/Dashboard/ProbationaryEndDates/provisionPeriodTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import { dashboardApiConfig, AllowedHttpMethods } from '../apiList'

const getEmployeesUnderProbationPeriod = async (
  props: provisionPeriodApiProps,
): Promise<UpcomingProvisionPeriodResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.getEmployeesUnderProbationPeriod,
    method: AllowedHttpMethods.get,
    params: {
      employeeId: props.employeeId,
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const employeeProvisionPeriodApi = {
  getEmployeesUnderProbationPeriod,
}

export default employeeProvisionPeriodApi
