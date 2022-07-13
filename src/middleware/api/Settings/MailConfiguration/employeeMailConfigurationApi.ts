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

const getMailTemplateTypes = async (): Promise<
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
      searchText: props.templateName,
      type: props.templateTypeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const employeeMailConfigurationApi = {
  getMailTemplateTypes,
  getEmployeeEmailTemplate,
}

export default employeeMailConfigurationApi
