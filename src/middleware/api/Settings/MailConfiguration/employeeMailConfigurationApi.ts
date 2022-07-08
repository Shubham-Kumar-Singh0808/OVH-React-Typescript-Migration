import axios from 'axios'
import {
  employeeMailConfigurationApiConfig,
  AllowedHttpMethods,
} from '../../apiList'
import {
  EmployeeGetMailTemplate,
  EmployeeGetEmailTemplateProps,
  EmployeeGetMailTemplateTypes,
} from '../../../../types/Settings/MailConfiguration/employeeMailConfigurationTypes'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeeMailTemplateTypes = async (): Promise<
  EmployeeGetMailTemplateTypes[]
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
): Promise<EmployeeGetMailTemplate[]> => {
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

const employeeMailConfigurationApi = {
  getEmployeeMailTemplateTypes,
  getEmployeeMailTemplate,
  exportEmployeeMailTemplateData,
}

export default employeeMailConfigurationApi
