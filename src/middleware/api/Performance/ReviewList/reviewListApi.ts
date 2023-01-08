import {
  AppraisalCycle,
  Designation,
  EmpDepartments,
  ReviewListData,
  ReviewListResponse,
} from '../../../../types/Performance/ReviewList/reviewListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, reviewListApiConfig } from '../../apiList'

const getEmployeeDepartments = async (): Promise<EmpDepartments[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: reviewListApiConfig.getEmployeeDepartments,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getAppraisalCycles = async (): Promise<AppraisalCycle[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: reviewListApiConfig.getAppraisalCycles,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getReviewList = async (
  reviewListData: ReviewListData,
): Promise<ReviewListResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: reviewListApiConfig.getReviewList,
    method: AllowedHttpMethods.post,
    data: reviewListData,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getDesignations = async (deptId: number): Promise<Designation[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: reviewListApiConfig.getDesignations,
    method: AllowedHttpMethods.get,
    params: { deptId },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

export const reviewListApi = {
  getEmployeeDepartments,
  getReviewList,
  getAppraisalCycles,
  getDesignations,
}
