import axios from 'axios'
import {
  EmployeeTimeSheet,
  ProjectTimeSheetProps,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTimeSheet/projectTimeSheetTypes'
import { getAuthenticatedRequestConfig } from '../../../../../../utils/apiUtils'
import {
  projectTimeSheetApiConfig,
  AllowedHttpMethods,
} from '../../../../apiList'

const getProjectTimeSheet = async (
  props: ProjectTimeSheetProps,
): Promise<EmployeeTimeSheet[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectTimeSheetApiConfig.getProjectTimeSheet,
    method: AllowedHttpMethods.get,
    params: {
      hiveDate: props.hiveDate,
      projectId: props.projectId,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const projectTimeSheetApi = {
  getProjectTimeSheet,
}

export default projectTimeSheetApi
