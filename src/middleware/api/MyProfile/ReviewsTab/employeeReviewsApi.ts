import { employeeReviewsApiConfig, AllowedHttpMethods } from '../../apiList'
import { EmployeeReviews } from '../../../../types/MyProfile/ReviewsTab/reviewsTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
const getEmployeeReviews = async (
  employeeId: number | string,
): Promise<EmployeeReviews[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReviewsApiConfig.getEmployeeReviews,
    method: AllowedHttpMethods.get,
    params: {
      employeeId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
const employeeReviewsApi = {
  getEmployeeReviews,
}
export default employeeReviewsApi
