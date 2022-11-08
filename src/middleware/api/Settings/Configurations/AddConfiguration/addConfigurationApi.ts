import { AddCycle } from '../../../../../types/Settings/Configurations/AddConfiguration/addConfigurationTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import {
  addConfigurationsApiConfig,
  AllowedHttpMethods,
} from '../../../apiList'

const getAddAppraisalCycle = async (
  newCycleRecords: AddCycle,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addConfigurationsApiConfig.addAppraisalCycle,
    method: AllowedHttpMethods.post,
    data: newCycleRecords,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addConfigurationApi = {
  getAddAppraisalCycle,
}

export default addConfigurationApi
