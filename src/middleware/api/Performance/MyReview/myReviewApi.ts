import { PageDetails } from '../../../../types/Performance/MyReview/myReviewTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, myReviewApiConfig } from '../../apiList'

const getEmployeePerformanceReview = async (): Promise<PageDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myReviewApiConfig.getEmployeePerformanceReview,
    method: AllowedHttpMethods.get,
    params: {
      pageName: 'reviews',
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

export const myReviewApi = {
  getEmployeePerformanceReview,
}
