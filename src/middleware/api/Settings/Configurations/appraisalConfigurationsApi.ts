import {
  AppraisalCycleApiProps,
  GetAppraisalCycle,
  GetAppraisalCycleResponse,
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

const getAppraisalCycle = async (
  props: AppraisalCycleApiProps,
): Promise<GetAppraisalCycleResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: appraisalConfigurationsApiConfig.getAppraisalCycle,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
    },
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
