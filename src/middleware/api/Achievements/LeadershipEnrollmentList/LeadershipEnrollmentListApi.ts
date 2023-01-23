import {
  ApproveRejectLeadershipQueryParameters,
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

const approveLeadership = async (
  query: ApproveRejectLeadershipQueryParameters,
): Promise<void> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: LeadershipEnrollmentListApiConfig.leadershipApprove,
    method: AllowedHttpMethods.put,
    params: {
      ...query,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const rejectLeadership = async (
  query: ApproveRejectLeadershipQueryParameters,
): Promise<void> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: LeadershipEnrollmentListApiConfig.leadershipReject,
    method: AllowedHttpMethods.put,
    params: {
      ...query,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const LeadershipEnrollmentListApi = {
  getLeadershipList,
  approveLeadership,
  rejectLeadership,
}

export default LeadershipEnrollmentListApi
