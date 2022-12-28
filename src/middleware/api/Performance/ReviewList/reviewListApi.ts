import { EmpDepartments } from '../../../../types/Performance/ReviewList/reviewListTypes'
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

export const reviewListApi = {
  getEmployeeDepartments,
}
