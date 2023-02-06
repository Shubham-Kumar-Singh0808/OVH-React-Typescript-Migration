import {
  ProcessAreas,
  ProjectTailoringDocument,
} from '../../../../types/Settings/ProcessAreas/processAreaTypes'
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

const getProcessAreas = async (categoryId: number): Promise<ProcessAreas[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: processAreaApiConfig.getProcessAreas,
    method: AllowedHttpMethods.get,
    params: {
      categoryId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const ProcessAreaApi = {
  getProjectTailoringDocument,
  getProcessAreas,
}

export default ProcessAreaApi
