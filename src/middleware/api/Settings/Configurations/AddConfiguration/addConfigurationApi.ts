import { AddCycle } from '../../../../../types/Settings/Configurations/AddConfiguration/addConfigurationTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import {
  addConfigurationsApiConfig,
  AllowedHttpMethods,
} from '../../../apiList'

const addAppraisalCycle = async (
  newCycleRecord: AddCycle,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addConfigurationsApiConfig.addAppraisalCycle,
    method: AllowedHttpMethods.post,
    data: newCycleRecord,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addConfigurationApi = {
  addAppraisalCycle,
}

export default addConfigurationApi
