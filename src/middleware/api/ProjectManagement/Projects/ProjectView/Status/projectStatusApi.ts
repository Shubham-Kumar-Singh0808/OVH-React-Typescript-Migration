import {
  StatusReportListProps,
  StatusReportList,
  AddProjectStatusReportProps,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/Status/projectStatusTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../../utils/apiUtils'
import { projectStatusApiConfig, AllowedHttpMethods } from '../../../../apiList'

const getStatusReportList = async (
  props: StatusReportListProps,
): Promise<StatusReportList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectStatusApiConfig.statusReportLis,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      firstIndex: props.firstIndex ?? 0,
      projectId: props.projectId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addProjectStatusReport = async (
  addProjectStatusReportProps: AddProjectStatusReportProps,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectStatusApiConfig.addStatusReport,
    method: AllowedHttpMethods.post,
    data: addProjectStatusReportProps,
  })
  const response = await useAxios(requestConfig)
  return response.data
}
const projectStatusApi = {
  getStatusReportList,
  addProjectStatusReport,
}

export default projectStatusApi
