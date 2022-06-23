import { AllowedHttpMethods, employeeLeaveSettingsConfig } from '../../apiList'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

import {
  EmployeeSaveLeaveCalenderTypes,
  EmployeeLeaveCategories,
  EmployeeLeaveCalenderTypes,
} from '../../../../types/Settings/LeaveSettings/employeeLeaveCalenderTypes'

const getEmployeeLeaveCalenderSettings =
  async (): Promise<EmployeeLeaveCalenderTypes> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: employeeLeaveSettingsConfig.getEmployeeLeaveCalenderSettings,
      method: AllowedHttpMethods.get,
    })

    const response = await axios(requestConfig)
    return response.data
  }

const saveEmployeeLeaveCalenderSettings = async (
  employeeLeaveCalender: EmployeeSaveLeaveCalenderTypes,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeLeaveSettingsConfig.saveLeaveCalendarSettings,
    method: AllowedHttpMethods.post,
    data: employeeLeaveCalender,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeLeaveCategories = async (): Promise<
  EmployeeLeaveCategories[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeLeaveSettingsConfig.getEmployeeLeaveCategories,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const employeeLeaveSettingsApi = {
  saveEmployeeLeaveCalenderSettings,
  getEmployeeLeaveCategories,
  getEmployeeLeaveCalenderSettings,
}
export default employeeLeaveSettingsApi
