import {
  EmpScheduleInterviewData,
  EmployeeProperties,
  Reschedule,
  Schedule,
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
): Promise<UpdateProps> => {
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

const interviewRoundCount = async (
  candidateId: number,
): Promise<EmpScheduleInterviewData> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: IntervieweeDetailsApiConfig.interviewRoundCount,
    method: AllowedHttpMethods.get,
    params: {
      candidateId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllEmployeeDetails = async (): Promise<EmployeeProperties[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: IntervieweeDetailsApiConfig.getAllEmployeeDetails,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const reScheduleInterview = async (data: Reschedule): Promise<Reschedule> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: IntervieweeDetailsApiConfig.reScheduleInterview,
    method: AllowedHttpMethods.post,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const scheduleInterview = async (data: Schedule): Promise<Schedule> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: IntervieweeDetailsApiConfig.scheduleInterview,
    method: AllowedHttpMethods.post,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const sendRejectedMessagetoCandidate = async (
  candidateId: number,
): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: IntervieweeDetailsApiConfig.sendRejectedMessagetoCandidate,
    method: AllowedHttpMethods.post,
    params: {
      candidateId,
    },
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
  getAllEmployeeDetails,
  interviewRoundCount,
  reScheduleInterview,
  scheduleInterview,
  sendRejectedMessagetoCandidate,
}

export default IntervieweeDetailsApi
