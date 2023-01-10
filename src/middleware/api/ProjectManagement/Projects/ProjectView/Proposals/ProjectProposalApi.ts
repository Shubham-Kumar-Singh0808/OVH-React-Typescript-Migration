import { ProjectProposal } from '../../../../../../types/ProjectManagement/Project/ProjectView/Proposals/ProjectProposalsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../../utils/apiUtils'
import {
  projectProposalsApiConfig,
  AllowedHttpMethods,
} from '../../../../apiList'

const getProjectTimeLine = async (
  projectId: number | string,
): Promise<ProjectProposal[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectProposalsApiConfig.projectProposal,
    method: AllowedHttpMethods.get,
    params: {
      projectId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const projectProposalsApi = {
  getProjectTimeLine,
}

export default projectProposalsApi
