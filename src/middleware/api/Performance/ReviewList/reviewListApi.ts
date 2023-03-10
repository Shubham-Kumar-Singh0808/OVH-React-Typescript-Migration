import {
  ActiveCycle,
  AppraisalCycle,
  Designation,
  EmpDepartments,
  ReviewListApiProps,
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

const activeCycle = async (): Promise<ActiveCycle> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: reviewListApiConfig.activeCycle,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const exportReviewList = async (
  props: ReviewListApiProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: reviewListApiConfig.exportReviewList,
    method: AllowedHttpMethods.get,
    params: {
      activecycleId: props.activecycleId ?? '',
      empStatus: props.empStatus ?? 'Active',
      departmentName: props.departmentName ?? '',
      designationName: props.designationName ?? '',
      appraisalFormStatus: props.appraisalFormStatus ?? '',
      status: props.status ?? '',
      search: props.search ?? '',
      ratings: props.ratings ?? '',
      fromDate: props.fromDate ?? '',
      toDate: props.toDate ?? '',
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}

export const reviewListApi = {
  getEmployeeDepartments,
  getReviewList,
  getAppraisalCycles,
  getDesignations,
  exportReviewList,
  activeCycle,
}
