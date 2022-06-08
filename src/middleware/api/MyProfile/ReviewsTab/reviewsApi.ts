import { reviewsTabApiConfig, AllowedHttpMethods } from '../../apiList'
import { EmployeeReviews } from '../../../../types/MyProfile/ReviewsTab/reviewsTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
const getEmployeeReviewDetails = async (
  employeeId: number | string,
): Promise<EmployeeReviews[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: reviewsTabApiConfig.getEmployeeReviews,
    method: AllowedHttpMethods.get,
    params: {
      employeeId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
const reviewsTabApi = {
  getEmployeeReviewDetails,
}
export default reviewsTabApi
