import {
  Chelist,
  GetProjectRequestMailIds,
} from '../../../../types/ProjectManagement/ProjectCreationRequests/AddProjectRequest/addProjectRequestTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  addProjectCreationRequestApiConfig,
  AllowedHttpMethods,
} from '../../apiList'

const getCheckList = async (): Promise<Chelist[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addProjectCreationRequestApiConfig.getCheckList,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getProjectRequestMailIds =
  async (): Promise<GetProjectRequestMailIds> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: addProjectCreationRequestApiConfig.getProjectRequestMailIds,
      method: AllowedHttpMethods.get,
    })

    const response = await useAxios(requestConfig)
    return response.data
  }

const addProjectCreationRequestApi = {
  getCheckList,
  getProjectRequestMailIds,
}
export default addProjectCreationRequestApi
