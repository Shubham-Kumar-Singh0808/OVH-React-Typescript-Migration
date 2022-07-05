import axios from 'axios'
import {
  employeeMailConfigurationApiConfig,
  AllowedHttpMethods,
} from '../../apiList'
import {
  EmployeeGetEmailTemplate,
  EmployeeGetEmailTemplateProps,
  EmployeeGetMailTemplateTypes,
} from '../../../../types/Settings/MailConfiguration/employeemailConfigurationTypes'
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

const getEmployeeEmailTemplate = async (
  props: EmployeeGetEmailTemplateProps,
): Promise<EmployeeGetEmailTemplate[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeMailConfigurationApiConfig.getEmailTemplates,
    method: AllowedHttpMethods.get,
    params: {
      searchText: props.searchText,
      type: props.type,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const employeeMailConfigurationApi = {
  getEmployeeMailTemplateTypes,
  getEmployeeEmailTemplate,
}

export default employeeMailConfigurationApi
