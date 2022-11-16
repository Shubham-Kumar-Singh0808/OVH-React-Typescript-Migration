import {
  getAppraisalCycle,
  getCycle,
} from '../../../../types/Settings/Configurations/appraisalConfigurationsTypes'
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
  updateCycleDetails: getCycle,
): Promise<getCycle> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: appraisalConfigurationsApiConfig.updateAppraisalCycle,
    method: AllowedHttpMethods.put,
    data: updateCycleDetails,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const validateAppraisalCycle = async (
  validateCycleDetails: getCycle,
): Promise<getCycle> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: appraisalConfigurationsApiConfig.validateCycle,
    method: AllowedHttpMethods.put,
    data: validateCycleDetails,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const appraisalConfigurationsApi = {
  getAllAppraisalCycle,
  getCycleToEdit,
  updateAppraisalCycle,
  validateAppraisalCycle,
}

export default appraisalConfigurationsApi
