import axios from 'axios'
import {
  AllowedHttpMethods,
  employeeHandbookSettingsApiConfig,
} from '../../apiList'
import {
  AddNewHandbookPage,
  EmployeeCountry,
  EmployeeHandbookListApiProps,
  EmployeeHandbookListResponse,
} from '../../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'
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
      bookId,
    },
    data: {
      bookId,
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
  // const { list, ...restPrepareObject } = prepareObject
  const newVal = prepareObject.list.map((val) => `list=${val}`)
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeHandbookSettingsApiConfig.addNewHandbook,
    method: AllowedHttpMethods.post,
    params: {
      list: newVal,
    },
    // params: prepareObject.list?.reduce((acc, each, index) => {
    //   // const a = `list${each}`
    //   acc['list'] = each
    //   return acc
    // }, {} as any),
    data: {
      description: prepareObject.description,
      displayOrder: prepareObject.displayOrder,
      pageName: prepareObject.pageName,
      title: prepareObject.title,
    },
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
