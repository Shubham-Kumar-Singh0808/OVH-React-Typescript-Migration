import {
  EmpScheduleInterviewData,
  TimeLineList,
  UpdateProps,
  saveButnprops,
} from '../../../../types/Recruitment/IntervieweeDetails/IntervieweeDetailsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, IntervieweeDetailsApiConfig } from '../../apiList'

const timeLineDetails = async (candidateId: number): Promise<TimeLineList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: IntervieweeDetailsApiConfig.timelinedetails,
    method: AllowedHttpMethods.get,
    params: {
      candidateId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const saveInitialComments = async (
  props: saveButnprops,
): Promise<TimeLineList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: IntervieweeDetailsApiConfig.saveInitialComments,
    method: AllowedHttpMethods.put,
    params: {
      initialComments: props.initialComments,
      personId: props.personId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updateCandidateInterviewStatus = async (
  data: UpdateProps,
): Promise<number | string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: IntervieweeDetailsApiConfig.updateCandidateInterviewStatus,
    method: AllowedHttpMethods.post,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const empScheduleInterviewDetails = async (
  interviewCycleId: number,
): Promise<EmpScheduleInterviewData> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: IntervieweeDetailsApiConfig.empScheduleInterviewDetails,
    method: AllowedHttpMethods.get,
    params: {
      interviewCycleId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updateInterview = async (
  data: EmpScheduleInterviewData,
): Promise<EmpScheduleInterviewData> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: IntervieweeDetailsApiConfig.updateInterview,
    method: AllowedHttpMethods.post,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const IntervieweeDetailsApi = {
  timeLineDetails,
  saveInitialComments,
  updateCandidateInterviewStatus,
  empScheduleInterviewDetails,
  updateInterview,
}

export default IntervieweeDetailsApi
