import {
  GetAppraisalCycleProps,
  GetAppraisalCycleResponse,
} from '../../../../types/Settings/Configurations/appraisalConfigurationsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  appraisalConfigurationsApiConfig,
} from '../../apiList'

const getAllAppraisalCycle = async (
  props: GetAppraisalCycleProps,
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

const appraisalConfigurationsApi = {
  getAllAppraisalCycle,
}

export default appraisalConfigurationsApi
