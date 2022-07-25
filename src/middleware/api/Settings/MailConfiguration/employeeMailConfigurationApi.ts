import axios from 'axios'
import {
  employeeMailConfigurationApiConfig,
  AllowedHttpMethods,
} from '../../apiList'
import {
  EmployeeMailTemplate,
  EmployeeGetEmailTemplateProps,
  EmployeeMailTemplateType,
  EditEmployeeMailTemplate,
} from '../../../../types/Settings/MailConfiguration/employeMailConfigurationTypes'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeeMailTemplateTypes = async (): Promise<
  EmployeeMailTemplateType[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeMailConfigurationApiConfig.getMailTemplateTypes,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeMailTemplate = async (
  props: EmployeeGetEmailTemplateProps,
): Promise<EmployeeMailTemplate[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeMailConfigurationApiConfig.getMailTemplates,
    method: AllowedHttpMethods.get,
    params: {
      searchText: props.templateName ?? '',
      type: props.templateTypeId ?? '',
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const exportEmployeeMailTemplateData = async (
  props: EmployeeGetEmailTemplateProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeMailConfigurationApiConfig.exportMailTemplatesList,
    method: AllowedHttpMethods.get,
    params: {
      searchText: props.templateName ?? '',
      type: props.templateTypeId ?? '',
      token: localStorage.getItem('token') ?? '',
      tenantKey: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })
  const response = await axios(requestConfig)
  return response.data
}

const deleteMailTemplate = async (id: number): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeMailConfigurationApiConfig.deleteMailTemplate,
    method: AllowedHttpMethods.delete,
    params: {
      id,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const updateMailTemplate = async (
  prepareObject: EditEmployeeMailTemplate,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeMailConfigurationApiConfig.updateMailTemplate,
    method: AllowedHttpMethods.put,
    data: prepareObject,
  })

  const response = await axios(requestConfig)
  return response.data
}

const employeeMailConfigurationApi = {
  getEmployeeMailTemplateTypes,
  getEmployeeMailTemplate,
  exportEmployeeMailTemplateData,
  updateMailTemplate,
  deleteMailTemplate,
}

export default employeeMailConfigurationApi
