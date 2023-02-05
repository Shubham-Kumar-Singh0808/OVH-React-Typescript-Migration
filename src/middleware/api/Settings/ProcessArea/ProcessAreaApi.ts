import { ProjectTailoringDocument } from '../../../../types/Settings/ProcessAreas/processAreaTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { processAreaApiConfig, AllowedHttpMethods } from '../../apiList'

const getProjectTailoringDocument = async (
  flag: string,
): Promise<ProjectTailoringDocument[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: processAreaApiConfig.getProjectTailoringDocument,
    method: AllowedHttpMethods.get,
    params: {
      flag,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const ProcessAreaApi = {
  getProjectTailoringDocument,
}

export default ProcessAreaApi
