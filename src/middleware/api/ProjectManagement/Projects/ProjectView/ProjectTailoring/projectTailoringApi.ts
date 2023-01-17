import {
  ProjectTailoring,
  ProjectTailoringList,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../../utils/apiUtils'
import {
  projectTailoringApiConfig,
  AllowedHttpMethods,
} from '../../../../apiList'

const getProjectTailoringDocument = async (
  flag: string,
): Promise<ProjectTailoringList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectTailoringApiConfig.getProjectTailoringDocument,
    method: AllowedHttpMethods.get,
    params: {
      flag,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getProjectTailoring = async (
  projectId: string,
): Promise<ProjectTailoring> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectTailoringApiConfig.getProjectTailoring,
    method: AllowedHttpMethods.get,
    params: {
      projectId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const projectTailoringApi = {
  getProjectTailoringDocument,
  getProjectTailoring,
}

export default projectTailoringApi
