import { AllowedHttpMethods, employeeProjectsApiConfig } from '../../apiList'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import {
  EmployeeProjects,
  EmployeeProjectsGetParams,
} from '../../../../types/MyProfile/ProjectsTab/employeeProjectTypes'

const getEmployeeProjects = async (
  prepareObject: EmployeeProjectsGetParams,
): Promise<EmployeeProjects> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeProjectsApiConfig.getEmployeeProjects,
    method: AllowedHttpMethods.get,
    params: {
      employeeid: prepareObject.employeeid,
      endIndex: prepareObject.endIndex,
      firstIndex: prepareObject.firstIndex,
      projectStatus: prepareObject.projectStatus,
      type: prepareObject.type,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const getProjectDetails = async (
  projectId: number,
): Promise<EmployeeProjects> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeProjectsApiConfig.getProjectDetails,
    method: AllowedHttpMethods.get,
    params: {
      projectId: projectId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const projectsTabApi = {
  getEmployeeProjects,
  getProjectDetails,
}

export default projectsTabApi
