import {
  AddChangeRequestProps,
  ChangeRequestList,
  ChangeRequestProps,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../../utils/apiUtils'
import {
  projectChangeRequestApiConfig,
  AllowedHttpMethods,
} from '../../../../apiList'

const getProjectChangeRequestList = async (
  props: ChangeRequestProps,
): Promise<ChangeRequestList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectChangeRequestApiConfig.getCRList,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      firstIndex: props.firstIndex ?? 0,
      projectid: props.projectid,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addChangeRequest = async (
  addChangeRequestProps: AddChangeRequestProps,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectChangeRequestApiConfig.changeRequest,
    method: AllowedHttpMethods.post,
    data: addChangeRequestProps,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deleteChangeRequest = async (
  crId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectChangeRequestApiConfig.deleteCR,
    method: AllowedHttpMethods.delete,
    params: {
      crId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateChangeRequest = async (
  updateChangeRequest: AddChangeRequestProps,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectChangeRequestApiConfig.updateChangeRequest,
    method: AllowedHttpMethods.put,
    data: updateChangeRequest,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const changeRequestApi = {
  getProjectChangeRequestList,
  addChangeRequest,
  deleteChangeRequest,
  updateChangeRequest,
}

export default changeRequestApi
