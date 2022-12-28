import {
  IncomingLeadershipListItem,
  LeadershipListQueryParameters,
} from '../../../../types/Achievements/LeadershipEnrollmentList/LeadershipEnrollmentListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  LeadershipEnrollmentListApiConfig,
} from '../../apiList'

const getLeadershipList = async (
  query: LeadershipListQueryParameters,
): Promise<IncomingLeadershipListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: LeadershipEnrollmentListApiConfig.getLeadershipList,
    method: AllowedHttpMethods.get,
    params: {
      ...query,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const LeadershipEnrollmentListApi = {
  getLeadershipList,
}

export default LeadershipEnrollmentListApi
