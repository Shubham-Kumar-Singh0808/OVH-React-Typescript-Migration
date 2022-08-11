import { AllowedHttpMethods, applyLeaveAPiConfig } from '../../apiList'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  EmployeeLeaveApply,
  EmployeeLeaveType,
} from '../../../../types/Leaves/ApplyLeave/employeeApplyLeaves'

const getEmployeeLeaveType = async (
  employeeId: number | string | undefined,
): Promise<EmployeeLeaveType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: applyLeaveAPiConfig.getLeaveType,
    method: AllowedHttpMethods.get,
    params: {
      employeeId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const employeeLeaveApply = async (
  prepareObject: EmployeeLeaveApply,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: applyLeaveAPiConfig.applyLeave,
    method: AllowedHttpMethods.post,
    data: prepareObject,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const employeeLeaveApplyApi = {
  getEmployeeLeaveType,
  employeeLeaveApply,
}

export default employeeLeaveApplyApi
