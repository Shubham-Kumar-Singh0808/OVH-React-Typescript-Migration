import axios from 'axios'
import {
  employeeMailConfigurationApiConfig,
  AllowedHttpMethods,
} from '../../apiList'
import { EmployeeGetMailTemplateTypes } from '../../../../types/Settings/MailConfiguration/employeemailConfigurationTypes'
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
const employeeMailConfigurationApi = {
  getEmployeeMailTemplateTypes,
}
export default employeeMailConfigurationApi
