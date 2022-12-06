import {
  GetAllProjectRequestList,
  GetAllProjectRequestListProps,
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

const projectCreationRequestsApi = {
  getAllProjectRequestList,
}

export default projectCreationRequestsApi
