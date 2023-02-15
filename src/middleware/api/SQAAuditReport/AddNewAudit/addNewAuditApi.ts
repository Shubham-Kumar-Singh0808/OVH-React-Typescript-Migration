import {
  Employee,
  SaveAuditForm,
} from '../../../../types/SQAAuditReport/AddNewAudit/addNewAuditTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { addNewAuditApiConfig, AllowedHttpMethods } from '../../apiList'

const saveNewAuditForm = async (
  newAuditDetails: SaveAuditForm,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewAuditApiConfig.saveNewAuditForm,
    method: AllowedHttpMethods.post,
    data: newAuditDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getProjectEmployees = async (projectId: number): Promise<Employee[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewAuditApiConfig.getProjectEmployees,
    method: AllowedHttpMethods.get,
    params: {
      projectId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

export const addNewAuditApi = {
  saveNewAuditForm,
  getProjectEmployees,
}
