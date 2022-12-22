import {
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

const changeRequestApi = {
  getProjectChangeRequestList,
}

export default changeRequestApi
