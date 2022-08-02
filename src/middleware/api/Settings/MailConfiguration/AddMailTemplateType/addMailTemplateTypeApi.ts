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
    url: addNewMailTemplateTypeAPiConfig.getMailTemplateTypes,
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
    data: {
      name,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updateMailTemplateType = async (
  mailTemplateType: MailTemplateType,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewMailTemplateTypeAPiConfig.updateMailTemplateType,
    method: AllowedHttpMethods.put,
    data: mailTemplateType,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deleteMailTemplateType = async (
  id: number,
): Promise<MailTemplateType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewMailTemplateTypeAPiConfig.deleteMailTemplateType,
    method: AllowedHttpMethods.delete,
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
  updateMailTemplateType,
}

export default mailTemplateTypeApi
