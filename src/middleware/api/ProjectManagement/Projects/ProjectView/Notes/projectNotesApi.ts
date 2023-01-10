import { ProjectNotesTimeLine } from '../../../../../../types/ProjectManagement/Project/ProjectView/Notes/projectNotesTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../../utils/apiUtils'
import { projectNotesApiConfig, AllowedHttpMethods } from '../../../../apiList'

const getProjectNotesTimeLine = async (
  projectId: number | string,
): Promise<ProjectNotesTimeLine[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectNotesApiConfig.projectNotesTimeLine,
    method: AllowedHttpMethods.get,
    params: {
      projectId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const projectNotesApi = {
  getProjectNotesTimeLine,
}

export default projectNotesApi
