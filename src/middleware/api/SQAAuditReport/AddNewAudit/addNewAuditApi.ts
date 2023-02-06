import { SaveAuditForm } from '../../../../types/SQAAuditReport/AddNewAudit/addNewAuditTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { addNewAuditApiConfig, AllowedHttpMethods } from '../../apiList'

const saveNewAuditForm = async (
  newAuditDetails: SaveAuditForm,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewAuditApiConfig.saveNewAuditForm,
    method: AllowedHttpMethods.post,
    data: newAuditDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

export const addNewAuditApi = {
  saveNewAuditForm,
}
