import {
  EditAuditFormData,
  Employee,
  SaveAuditForm,
  UpdateSQAAudit,
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

const editAuditFormDetails = async (
  auditId: number,
): Promise<EditAuditFormData> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewAuditApiConfig.editAuditFormDetails,
    method: AllowedHttpMethods.get,
    params: {
      auditId,
    },
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

const updateSQAAuditForm = async (
  updateAuditDetails: UpdateSQAAudit,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewAuditApiConfig.updateSQAAuditForm,
    method: AllowedHttpMethods.put,
    data: updateAuditDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

export const addNewAuditApi = {
  saveNewAuditForm,
  editAuditFormDetails,
  getProjectEmployees,
  updateSQAAuditForm,
}
