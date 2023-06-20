import {
  IncomingMyReviewAppraisalForm,
  IncomingPerformanceRating,
  IncomingReviewCommentList,
  OutgoingSaveReviewCommentsParams,
  PageDetails,
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

const getAppraisalForm = async (
  employeeid: number,
): Promise<IncomingMyReviewAppraisalForm> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myReviewApiConfig.getAppraisalForm,
    method: AllowedHttpMethods.get,
    params: {
      employeeid,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getExistingAppraisalForm = async (
  appraisalFormId: number,
): Promise<IncomingMyReviewAppraisalForm> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myReviewApiConfig.getExistingAppraisalForm,
    method: AllowedHttpMethods.get,
    params: {
      appraisalFormId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getPerformanceRatings = async (): Promise<
  IncomingPerformanceRating[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myReviewApiConfig.getPerformanceRatings,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const employeeAppraisalForm = async (
  finalData: IncomingMyReviewAppraisalForm,
): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myReviewApiConfig.employeeAppraisalForm,
    method: AllowedHttpMethods.post,
    data: finalData,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const employeeAppraisalFormForRating = async (
  finalData: IncomingMyReviewAppraisalForm,
): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myReviewApiConfig.employeeAppraisalFormForRating,
    method: AllowedHttpMethods.post,
    data: finalData,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const saveReviewComments = async (
  finalParams: OutgoingSaveReviewCommentsParams,
): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myReviewApiConfig.saveReviewComments,
    method: AllowedHttpMethods.post,
    params: {
      ...finalParams,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getReviewComments = async (
  appraisalFormId: number,
): Promise<IncomingReviewCommentList> => {
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

const appraisalConfirmation = async (
  finalData: IncomingMyReviewAppraisalForm,
): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myReviewApiConfig.appraisalConfirmation,
    method: AllowedHttpMethods.put,
    data: finalData,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const myReviewApi = {
  getEmployeePerformanceReview,
  getAppraisalForm,
  getExistingAppraisalForm,
  getPerformanceRatings,
  employeeAppraisalForm,
  employeeAppraisalFormForRating,
  saveReviewComments,
  getReviewComments,
  appraisalConfirmation,
}

export default myReviewApi
