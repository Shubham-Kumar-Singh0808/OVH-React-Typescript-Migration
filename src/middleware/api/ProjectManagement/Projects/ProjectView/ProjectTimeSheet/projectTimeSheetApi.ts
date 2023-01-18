import axios from 'axios'
import { ProjectTimeSheetProps } from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTimeSheet/projectTimeSheetTypes'
import { EmployeeHiveReport } from '../../../../../../types/TimeAndAttendance/HiveActivityReport/hiveActivityReportTypes'
import { getAuthenticatedRequestConfig } from '../../../../../../utils/apiUtils'
import {
  projectTimeSheetApiConfig,
  AllowedHttpMethods,
} from '../../../../apiList'

const getProjectTimeSheet = async (
  props: ProjectTimeSheetProps,
): Promise<EmployeeHiveReport> => {
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
