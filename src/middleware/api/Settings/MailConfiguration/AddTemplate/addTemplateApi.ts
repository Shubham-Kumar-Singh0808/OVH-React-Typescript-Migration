import axios from 'axios'
import {
  AddNewTemplate,
  AssetTypeResponse,
} from '../../../../../types/Settings/MailConfiguration/AddTemplate/addMailTemplateTypes'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'
import { addNewTemplateApiConfig, AllowedHttpMethods } from '../../../apiList'

const getAssetTypes = async (): Promise<AssetTypeResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewTemplateApiConfig.getAssetTypes,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const addNewMailTemplate = async (
  prepareObject: AddNewTemplate,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewTemplateApiConfig.addNewMailTemplate,
    method: AllowedHttpMethods.post,
    data: prepareObject,
  })

  const response = await axios(requestConfig)
  return response.data
}

const addTemplateApi = {
  getAssetTypes,
  addNewMailTemplate,
}
export default addTemplateApi
