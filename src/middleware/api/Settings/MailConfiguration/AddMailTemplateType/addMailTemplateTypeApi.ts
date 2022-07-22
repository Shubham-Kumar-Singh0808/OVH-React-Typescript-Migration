import {
  AllowedHttpMethods,
  addNewMailTemplateTypeAPiConfig,
} from '../../../apiList'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { MailTemplateType } from '../../../../../types/Settings/MailConfiguration/AddMailTemplateType/addTemplateType'

const getMailTemplateTypes = async (): Promise<MailTemplateType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewMailTemplateTypeAPiConfig.addNewMailTemplateType,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addMailTemplateType = async (
  name: string,
): Promise<MailTemplateType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewMailTemplateTypeAPiConfig.addNewMailTemplateType,
    method: AllowedHttpMethods.post,
    params: {
      name,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteMailTemplateType = async (
  id: number,
): Promise<MailTemplateType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewMailTemplateTypeAPiConfig.deleteMailTemplateType,
    method: AllowedHttpMethods.get,
    params: {
      id,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const mailTemplateTypeApi = {
  getMailTemplateTypes,
  deleteMailTemplateType,
  addMailTemplateType,
}

export default mailTemplateTypeApi
