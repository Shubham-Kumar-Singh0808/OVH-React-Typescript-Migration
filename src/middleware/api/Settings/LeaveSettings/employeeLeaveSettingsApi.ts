import { AllowedHttpMethods, employeeLeaveSettingsConfig } from '../../apiList'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

import {
  EmployeeSaveLeaveCalenderSetting,
  EmployeeLeaveCategories,
  EmployeeLeaveCalenderTypes,
  EmployeeAddLeaveCategories,
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
  employeeLeaveCalender: EmployeeSaveLeaveCalenderSetting,
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

const deleteEmployeeLeaveCategory = async (
  leaveCategoryId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeLeaveSettingsConfig.deleteLeaveCategory,
    method: AllowedHttpMethods.delete,
    params: {
      leaveCategoryId: leaveCategoryId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const addEmployeeLeaveCategory = async (
  employeeLeaveCategory: EmployeeAddLeaveCategories,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeLeaveSettingsConfig.addLeaveCategory,
    method: AllowedHttpMethods.post,
    data: employeeLeaveCategory,
  })
  const responseVisa = await axios(requestConfig)
  return responseVisa.data
}

const employeeLeaveSettingsApi = {
  saveEmployeeLeaveCalenderSettings,
  getEmployeeLeaveCategories,
  getEmployeeLeaveCalenderSettings,
  deleteEmployeeLeaveCategory,
  addEmployeeLeaveCategory,
}
export default employeeLeaveSettingsApi
