import {
  GetAllProjectRequestList,
  GetAllProjectRequestListProps,
  GetProjectRequest,
  ProjectRequestHistoryDetails,
  ApproveProjectRequest,
} from '../../../../types/ProjectManagement/ProjectCreationRequests/projectCreationRequestsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  ProjectCreationRequestApiConfig,
  AllowedHttpMethods,
} from '../../apiList'

const getAllProjectRequestList = async (
  props: GetAllProjectRequestListProps,
): Promise<GetAllProjectRequestList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProjectCreationRequestApiConfig.getAllProjectRequestList,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      firstIndex: props.firstIndex ?? 0,
      multiSearch: props.multiSearch,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getProjectRequest = async (id: number): Promise<GetProjectRequest> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProjectCreationRequestApiConfig.getProjectRequest,
    method: AllowedHttpMethods.get,
    params: {
      id,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const projectRequestHistoryDetails = async (
  projectRequestId: number,
): Promise<ProjectRequestHistoryDetails[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProjectCreationRequestApiConfig.getAuditForProjectRequest,
    method: AllowedHttpMethods.get,
    params: {
      projectRequestId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getApproveProjectRequest = async (
  id: number,
): Promise<ApproveProjectRequest> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProjectCreationRequestApiConfig.getApproveProjectRequest,
    method: AllowedHttpMethods.get,
    params: {
      id,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateProjectRequest = async (
  projectRequestDetails: ApproveProjectRequest,
): Promise<ApproveProjectRequest> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProjectCreationRequestApiConfig.updateProjectRequest,
    method: AllowedHttpMethods.post,
    data: projectRequestDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const projectCreationRequestsApi = {
  getAllProjectRequestList,
  getProjectRequest,
  projectRequestHistoryDetails,
  getApproveProjectRequest,
  updateProjectRequest,
}

export default projectCreationRequestsApi
