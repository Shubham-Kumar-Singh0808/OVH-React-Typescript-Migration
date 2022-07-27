import {
  GetSearchScheduledCandidatesProps,
  GetSearchScheduledCandidatesResponse,
} from '../../../../types/Recruitment/ScheduledInterviews/scheduledInterviewsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, scheduledInterviewsApiConfig } from '../../apiList'

const getScheduledCandidatesForEmployee = async (
  props: GetSearchScheduledCandidatesProps,
): Promise<GetSearchScheduledCandidatesResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: scheduledInterviewsApiConfig.searchScheduledCandidatesForEmployee,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      fromDate: props.fromDate,
      startIndex: props.startIndex ?? 0,
      status: props.status,
      toDate: props.toDate,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getScheduledCandidates = async (
  props: GetSearchScheduledCandidatesProps,
): Promise<GetSearchScheduledCandidatesResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: scheduledInterviewsApiConfig.searchScheduledCandidates,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      fromDate: props.fromDate,
      startIndex: props.startIndex ?? 0,
      toDate: props.toDate,
      search: props.search ?? '',
      skill: props.skill ?? '',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportScheduledCandidatesList = async (props: {
  fromDate: string
  toDate: string
  skill: string
}): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: scheduledInterviewsApiConfig.downloadScheduleCandidates,
    method: AllowedHttpMethods.get,
    params: {
      fromDate: props.fromDate,
      toDate: props.toDate,
      skill: props.skill,
      token: localStorage.getItem('token') ?? '',
      tenantKey: localStorage.getItem('tenantKey') ?? '',
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const scheduledInterviewsApi = {
  getScheduledCandidatesForEmployee,
  getScheduledCandidates,
  exportScheduledCandidatesList,
}

export default scheduledInterviewsApi
