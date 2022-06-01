import {
  AllowedHttpMethods,
  shiftConfigurationApiConfig,
} from '../../../../apiList'

import { EmployeeShiftDetails } from '../../../../../../types/EmployeeDirectory/EmployeeList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../../../utils/apiUtils'

export const getEmployeeShifts = async (): Promise<EmployeeShiftDetails[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: shiftConfigurationApiConfig.getAllShifts,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const shiftConfigurationApi = {
  getEmployeeShifts,
}

export default shiftConfigurationApi
