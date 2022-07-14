import { employeeReviewsApiConfig, AllowedHttpMethods } from '../../apiList'
import { EmployeeReview } from '../../../../types/MyProfile/ReviewsTab/employeeReviewsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'

const getEmployeeReviews = async (
  employeeId: number | string,
): Promise<EmployeeReview[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReviewsApiConfig.getEmployeeReviews,
    method: AllowedHttpMethods.get,
    params: {
      employeeId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}
const employeeReviewsApi = {
  getEmployeeReviews,
}
export default employeeReviewsApi
