import {
  GetAllTechnology,
  country,
} from '../../../../types/Recruitment/CandidateList/CandidateListTypes'
import {
  IncomingInterviewStatusReport,
  OutgoingStatusReportFilterOptions,
} from '../../../../types/Recruitment/InterviewStatusReport/InterviewStatusReportTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  interviewStatusReportApiConfig,
} from '../../apiList'

const getAllTechnology = async (): Promise<GetAllTechnology[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: interviewStatusReportApiConfig.getAllTechnology,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getAllEmpCountries = async (): Promise<country[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: interviewStatusReportApiConfig.getAllEmpCountries,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getInterviewStatusReport = async (
  finalData: OutgoingStatusReportFilterOptions,
): Promise<IncomingInterviewStatusReport> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: interviewStatusReportApiConfig.getInterviewStatusReport,
    method: AllowedHttpMethods.post,
    data: {
      ...finalData,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const interviewStatusReportApi = {
  getAllTechnology,
  getAllEmpCountries,
  getInterviewStatusReport,
}

export default interviewStatusReportApi
