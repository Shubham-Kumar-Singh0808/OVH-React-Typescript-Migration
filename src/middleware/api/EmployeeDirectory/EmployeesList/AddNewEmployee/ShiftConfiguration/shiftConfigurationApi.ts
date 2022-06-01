import {
  AllowedHttpMethods,
  shiftConfigurationApiConfig,
} from '../../../../apiList'

import { EmployeeShiftDetails } from '../../../../../../types/EmployeeDirectory/EmployeeList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../../../utils/apiUtils'

const getEmployeeShifts = async (): Promise<EmployeeShiftDetails[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: shiftConfigurationApiConfig.getAllShifts,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const createEmployeeTimeSlot = async (
  employeeShiftDetails: EmployeeShiftDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: shiftConfigurationApiConfig.addTimeSlot,
    method: AllowedHttpMethods.post,
    data: employeeShiftDetails,
  })

  const response = await axios(requestConfig)
  return response.data
}

const shiftConfigurationApi = {
  getEmployeeShifts,
  createEmployeeTimeSlot,
}

export default shiftConfigurationApi
