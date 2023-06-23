import { IncomingRecruitmentHistory } from '../../../../types/MyProfile/RecruitmentHistory/RecruitmentHistoryTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  profileRecruitmentHistoryApiConfig,
} from '../../apiList'

const getEmployeeHistoryApi = async (
  loggedInEmpId: number,
): Promise<IncomingRecruitmentHistory> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: profileRecruitmentHistoryApiConfig.getEmployeeHistory,
    method: AllowedHttpMethods.get,
    params: {
      loggedInEmpId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const recruitmentHistoryApi = {
  getEmployeeHistoryApi,
}

export default recruitmentHistoryApi
