import {
  IncomingCheckList,
  GetChecklistParams,
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

const ChecklistApi = {
  getChecklist,
}

export default ChecklistApi
