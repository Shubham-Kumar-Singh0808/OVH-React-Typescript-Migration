import axios from 'axios'
import { AllowedHttpMethods, addNewTemplateAPiConfig } from '../../apiList'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import { MailTemplateType } from '../../../../types/MailConfiguration/AddTemplate/addMailTemplateTypes'

const getMailTemplateType = async (): Promise<
  MailTemplateType[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewTemplateAPiConfig.getMailTemplateType,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const addTemplateApi = {
  getMailTemplateType,
}
export default addTemplateApi
