import {
  AllowedHttpMethods,
  employeeHandbookSettingsApiConfig,
} from '../../apiList'
import {
  AddNewHandbookPage,
  EmployeeCountry,
  EmployeeHandbookListApiProps,
  EmployeeHandbookListResponse,
  CountryList,
} from '../../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeeHandbooks = async (
  props: EmployeeHandbookListApiProps,
): Promise<EmployeeHandbookListResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeHandbookSettingsApiConfig.getEmployeeHandbooks,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const deleteEmployeeHandbook = async (
  bookId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeHandbookSettingsApiConfig.deleteEmployeeHandbook,
    method: AllowedHttpMethods.delete,
    params: {
      bookId: bookId,
    },
    data: {
      bookId: bookId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeCountries = async (): Promise<
  EmployeeCountry[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeHandbookSettingsApiConfig.getEmployeeCountries,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const addNewHandbook = async (
  prepareObject: AddNewHandbookPage,
): Promise<number | undefined> => {
  const { list, ...restPrepareObject } = prepareObject
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeHandbookSettingsApiConfig.addNewHandbook,
    method: AllowedHttpMethods.post,
    params: prepareObject.list?.reduce((acc, each, index) => {
      // const a = `list${each}`
      acc['list'] = each
      return acc
    }, {} as any),
    data: restPrepareObject,
  })

  const response = await axios(requestConfig)
  return response.data
}

const employeeHandbookSettingsApi = {
  getEmployeeHandbooks,
  deleteEmployeeHandbook,
  getEmployeeCountries,
  addNewHandbook,
}

export default employeeHandbookSettingsApi
