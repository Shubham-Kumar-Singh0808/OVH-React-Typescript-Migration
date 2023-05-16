import {
  EmployeeAppraisalForm,
  GetPerformanceRatings,
  PageDetails,
  ReviewCommentsResponse,
} from '../../../../types/Performance/MyReview/myReviewTypes'
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

const getEmployeeReviewForm = async (
  empId: number,
): Promise<EmployeeAppraisalForm> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myReviewApiConfig.getEmployeeReviewForm,
    method: AllowedHttpMethods.get,
    params: {
      employeeid: empId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const saveAppraisalForm = async (
  saveAppraisalForm: EmployeeAppraisalForm,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myReviewApiConfig.saveAppraisalForm,
    method: AllowedHttpMethods.post,
    data: saveAppraisalForm,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getReviewComments = async (
  appraisalFormId: number,
): Promise<ReviewCommentsResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myReviewApiConfig.getReviewComments,
    method: AllowedHttpMethods.get,
    params: {
      appraisalFormId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getPerformanceRatings = async (): Promise<GetPerformanceRatings[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myReviewApiConfig.getPerformanceRatings,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const submitAppraisalFormForRating = async (
  submitAppraisalForm: EmployeeAppraisalForm,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myReviewApiConfig.getEmployeeAppraisalRating,
    method: AllowedHttpMethods.post,
    data: submitAppraisalForm,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const existingAppraisalForm = async (
  appraisalFormId: number,
): Promise<EmployeeAppraisalForm> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myReviewApiConfig.existingAppraisalForm,
    method: AllowedHttpMethods.get,
    params: {
      appraisalFormId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

export const myReviewApi = {
  getEmployeePerformanceReview,
  getEmployeeReviewForm,
  saveAppraisalForm,
  getReviewComments,
  getPerformanceRatings,
  submitAppraisalFormForRating,
  existingAppraisalForm,
}
