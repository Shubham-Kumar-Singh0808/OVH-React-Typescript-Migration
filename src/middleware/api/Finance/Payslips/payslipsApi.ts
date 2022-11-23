import { EmployeePayslips } from '../../../../types/Finance/Payslips/payslipsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, paySlipsApiConfig } from '../../apiList'

const empPaySlips = async ({
  empId,
  year,
}: {
  empId: number
  year: number
}): Promise<EmployeePayslips[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: paySlipsApiConfig.getEmployeePayslipsForSelectedYear,
    method: AllowedHttpMethods.get,
    params: {
      empId,
      year,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const payslipsApi = {
  empPaySlips,
}

export default payslipsApi
