import { getAppraisalCycle } from '../../../../types/Settings/Configurations/appraisalConfigurationsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  appraisalConfigurationsApiConfig,
} from '../../apiList'

const getAllAppraisalCycle = async (): Promise<getAppraisalCycle[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: appraisalConfigurationsApiConfig.getAppraisalCycle,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getCycleToEdit = async (cycleId: number): Promise<getAppraisalCycle> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: `${appraisalConfigurationsApiConfig.editAppraisalCycle}/${cycleId}`,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const appraisalConfigurationsApi = {
  getAllAppraisalCycle,
  getCycleToEdit,
}

export default appraisalConfigurationsApi
