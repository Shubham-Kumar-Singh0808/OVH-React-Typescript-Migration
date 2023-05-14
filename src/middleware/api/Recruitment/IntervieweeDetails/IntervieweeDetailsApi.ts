import { TimeLineList } from '../../../../types/Recruitment/IntervieweeDetails/IntervieweeDetailsTypes'
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

const IntervieweeDetailsApi = {
  timeLineDetails,
}

export default IntervieweeDetailsApi
