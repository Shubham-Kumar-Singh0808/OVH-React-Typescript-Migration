import {
  ProcessHeadDTO,
  IncomingProjectTailoringList,
  OutgoingSaveProjectTailoringDocumentInitial,
  OutgoingSaveProjectTailoringDocument,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../../utils/apiUtils'
import {
  projectTailoringApiConfig,
  AllowedHttpMethods,
} from '../../../../apiList'

const getDefaultProjectTailoringDocument = async (
  flag: string,
): Promise<ProcessHeadDTO[]> => {
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

const getProjectTailoringDocument = async (
  projectId: string,
): Promise<IncomingProjectTailoringList> => {
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

const saveProjectTailoringDocumentForManager = (
  data: OutgoingSaveProjectTailoringDocumentInitial,
): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectTailoringApiConfig.saveProjectTailoringDocumentForManager,
    method: AllowedHttpMethods.post,
    data,
  })

  return useAxios(requestConfig)
}

const saveProjectTailoringDocument = (
  data:
    | OutgoingSaveProjectTailoringDocumentInitial
    | OutgoingSaveProjectTailoringDocument,
): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectTailoringApiConfig.saveProjectTailoringDocument,
    method: AllowedHttpMethods.post,
    data,
  })

  return useAxios(requestConfig)
}

const projectTailoringApi = {
  getDefaultProjectTailoringDocument,
  getProjectTailoringDocument,
  saveProjectTailoringDocumentForManager,
  saveProjectTailoringDocument,
}

export default projectTailoringApi
