import { AllowedHttpMethods, submitResignationApiConfig } from '../../apiList'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  GetSeparationFormResponse,
  ResignationView,
  RevokeResignation,
  SubmitResignationTypes,
} from '../../../../types/Separation/SubmitViewResignation/submitResignationTypes'

const getSeparationFormResponse =
  async (): Promise<GetSeparationFormResponse> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: submitResignationApiConfig.getSeparationForm,
      method: AllowedHttpMethods.get,
    })

    const response = await useAxios(requestConfig)
    return response.data
  }

const getSubmitResignation = async (
  submitResignation: SubmitResignationTypes,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: submitResignationApiConfig.submitResignation,
    method: AllowedHttpMethods.post,
    data: submitResignation,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getEmployeeResignationView = async (): Promise<ResignationView> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: submitResignationApiConfig.getEmployeeResg,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getRevokeResignation = async (
  revokeResignation: RevokeResignation,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: submitResignationApiConfig.revokeResignation,
    method: AllowedHttpMethods.post,
    data: revokeResignation,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getSeparationFormApi = {
  getSeparationFormResponse,
  getSubmitResignation,
  getEmployeeResignationView,
  getRevokeResignation,
}
export default getSeparationFormApi
