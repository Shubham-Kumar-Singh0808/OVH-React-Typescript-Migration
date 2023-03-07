import {
  GetAppraisalCycle,
  GetCycle,
} from '../../../../types/Settings/Configurations/appraisalConfigurationsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  appraisalConfigurationsApiConfig,
} from '../../apiList'

const getAppraisalCycle = async (): Promise<GetAppraisalCycle[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: appraisalConfigurationsApiConfig.cycle,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getCycleToEdit = async (cycleId: number): Promise<GetAppraisalCycle> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: appraisalConfigurationsApiConfig.editAppraisalCycle,
    method: AllowedHttpMethods.get,
    params: {
      cycleId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateAppraisalCycle = async (
  updateCycleDetails: GetCycle,
): Promise<GetCycle> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: appraisalConfigurationsApiConfig.updateAppraisalCycle,
    method: AllowedHttpMethods.put,
    data: updateCycleDetails,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const validateAppraisalCycle = async (
  validateCycleDetails: GetCycle,
): Promise<GetCycle> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: appraisalConfigurationsApiConfig.validateCycle,
    method: AllowedHttpMethods.put,
    data: validateCycleDetails,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const appraisalConfigurationsApi = {
  getAppraisalCycle,
  getCycleToEdit,
  updateAppraisalCycle,
  validateAppraisalCycle,
}

export default appraisalConfigurationsApi
