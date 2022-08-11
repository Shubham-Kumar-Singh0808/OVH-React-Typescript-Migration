import qs from 'qs'
import {
  AllowedHttpMethods,
  employeeHandbookSettingsApiConfig,
} from '../../apiList'
import {
  AddNewHandbookPage,
  EmployeeCountry,
  EmployeeHandbookListApiProps,
  EmployeeHandbookListResponse,
  TotalHandbookList,
} from '../../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { ApiParams } from '../../../../types/commonTypes'

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
  const response = await useAxios(requestConfig)
  return response.data
}

const getTotalHandbookList = async (): Promise<TotalHandbookList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeHandbookSettingsApiConfig.getTotalHandbookList,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
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
  const response = await useAxios(requestConfig)
  return response.data
}

const getEmployeeCountries = async (): Promise<
  EmployeeCountry[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeHandbookSettingsApiConfig.getEmployeeCountries,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addNewHandbook = async (
  prepareObject: AddNewHandbookPage,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeHandbookSettingsApiConfig.addNewHandbook,
    method: AllowedHttpMethods.post,
    params: { list: prepareObject.list },
    paramsSerializer: (params: ApiParams) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
    data: {
      description: prepareObject.description,
      displayOrder: prepareObject.displayOrder,
      pageName: prepareObject.pageName,
      title: prepareObject.title,
      type: 'HandBook',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const employeeHandbookSettingsApi = {
  getEmployeeHandbooks,
  getTotalHandbookList,
  deleteEmployeeHandbook,
  getEmployeeCountries,
  addNewHandbook,
}

export default employeeHandbookSettingsApi
