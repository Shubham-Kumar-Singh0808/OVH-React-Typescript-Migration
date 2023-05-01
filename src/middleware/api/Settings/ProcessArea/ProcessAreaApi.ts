import {
  AddProcessAreaProps,
  GetProcessAreaDetails,
  ProcessAreas,
  ProjectTailoringDocument,
} from '../../../../types/Settings/ProcessAreas/processAreaTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { processAreaApiConfig, AllowedHttpMethods } from '../../apiList'

const getProjectTailoringDocument = async (
  flag: string,
): Promise<ProjectTailoringDocument[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: processAreaApiConfig.getProjectTailoringDocument,
    method: AllowedHttpMethods.get,
    params: {
      flag,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getProcessAreas = async (categoryId: number): Promise<ProcessAreas[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: processAreaApiConfig.getProcessAreas,
    method: AllowedHttpMethods.get,
    params: {
      categoryId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const createProcessArea = async ({
  categoryId,
  name,
}: {
  categoryId: number
  name: string
}): Promise<number | string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: processAreaApiConfig.createProcessArea,
    method: AllowedHttpMethods.post,
    data: {
      name,
      categoryId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const checkDuplicateProcess = async (
  processName: string,
): Promise<number | string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: processAreaApiConfig.checkDuplicateProcess,
    method: AllowedHttpMethods.get,
    params: {
      processName,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const saveProcessArea = async (
  props: AddProcessAreaProps,
): Promise<number | string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: processAreaApiConfig.saveProcessArea,
    method: AllowedHttpMethods.post,
    data: props,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const incrementOrDecrementOrder = async (
  props: AddProcessAreaProps,
): Promise<number | string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: processAreaApiConfig.incrementOrDecrementOrder,
    method: AllowedHttpMethods.put,
    data: props,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getOrderCountOfActiveProcesses = async (
  categoryId: number,
): Promise<ProcessAreas[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: processAreaApiConfig.getOrderCountOfActiveProcesses,
    method: AllowedHttpMethods.get,
    params: {
      categoryId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getProcessAreaDetails = async (
  processSubHeadId: number,
): Promise<GetProcessAreaDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: processAreaApiConfig.getProcessAreaDetails,
    method: AllowedHttpMethods.get,
    params: {
      processSubHeadId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const checkForDuplicateDoc = async (
  docName: string,
): Promise<string | number | boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: processAreaApiConfig.checkforDuplicateDoc,
    method: AllowedHttpMethods.get,
    params: {
      docName,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const ProcessAreaApi = {
  getProjectTailoringDocument,
  getProcessAreas,
  createProcessArea,
  checkDuplicateProcess,
  saveProcessArea,
  incrementOrDecrementOrder,
  getOrderCountOfActiveProcesses,
  getProcessAreaDetails,
  checkForDuplicateDoc,
}

export default ProcessAreaApi
