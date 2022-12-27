import {
  IncomingEmployeeDetails,
  OutgoingLeadershipForm,
} from '../../../../types/Achievements/LeadershipEnrollmentForm/LeadershipEnrollmentFormTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  LeadershipEnrollmentFormApiConfig,
} from '../../apiList'

const getEmployeeDetails = async (): Promise<IncomingEmployeeDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: LeadershipEnrollmentFormApiConfig.employeeDetails,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addLeadership = async (outBody: OutgoingLeadershipForm) => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: LeadershipEnrollmentFormApiConfig.addLeadership,
    method: AllowedHttpMethods.post,
    data: outBody,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const LeadershipEnrollmentFormApi = {
  getEmployeeDetails,
  addLeadership,
}

export default LeadershipEnrollmentFormApi
