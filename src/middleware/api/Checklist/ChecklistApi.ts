import {
  IncomingCheckList,
  GetChecklistParams,
  IncomingChecklistItem,
} from '../../../types/Checklist/ChecklistTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import { AllowedHttpMethods, CheckListApiConfig } from '../apiList'

const getChecklist = async (
  finalParams: GetChecklistParams,
): Promise<IncomingCheckList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CheckListApiConfig.getCheckList,
    method: AllowedHttpMethods.get,
    params: {
      ...finalParams,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getChecklistItem = async (
  pageName: string,
): Promise<IncomingChecklistItem> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CheckListApiConfig.getChecklistItem,
    method: AllowedHttpMethods.get,
    params: {
      pageName,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const ChecklistApi = {
  getChecklist,
  getChecklistItem,
}

export default ChecklistApi
