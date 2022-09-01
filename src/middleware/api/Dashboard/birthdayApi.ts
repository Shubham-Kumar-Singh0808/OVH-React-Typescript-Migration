import {
  BirthdayListApiProps,
  BirthdaysListResponse,
} from '../../../types/Dashboard/Birthdays/birthdayListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import { AllowedHttpMethods, dashboardApiConfig } from '../apiList'

const getAllEmployeesBirthdayList = async (
  props: BirthdayListApiProps,
): Promise<BirthdaysListResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.getAllEmployeesBirthdayList,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const birthdayApi = {
  getAllEmployeesBirthdayList,
}

export default birthdayApi
