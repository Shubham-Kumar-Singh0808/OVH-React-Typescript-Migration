import { AllowedHttpMethods, employeeLeaveSettingsConfig } from '../../apiList'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

import {
  EmployeeSaveLeaveCalenderSetting,
  EmployeeLeaveCategory,
  EmployeeAddUpdateLeaveCategory,
} from '../../../../types/Settings/LeaveSettings/employeeLeaveCalenderTypes'

const getEmployeeLeaveCalenderSettings =
  async (): Promise<EmployeeSaveLeaveCalenderSetting> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: employeeLeaveSettingsConfig.getLeaveCalenderSettings,
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
  EmployeeLeaveCategory[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeLeaveSettingsConfig.getLeaveCategories,
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
  employeeLeaveCategory: EmployeeAddUpdateLeaveCategory,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeLeaveSettingsConfig.addUpdateLeaveCategory,
    method: AllowedHttpMethods.post,
    data: employeeLeaveCategory,
  })
  const responseVisa = await axios(requestConfig)
  return responseVisa.data
}

const updateEmployeeLeaveCategory = async (
  employeeLeaveCategory: EmployeeAddUpdateLeaveCategory,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeLeaveSettingsConfig.addUpdateLeaveCategory,
    method: AllowedHttpMethods.put,
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
  updateEmployeeLeaveCategory,
}
export default employeeLeaveSettingsApi
