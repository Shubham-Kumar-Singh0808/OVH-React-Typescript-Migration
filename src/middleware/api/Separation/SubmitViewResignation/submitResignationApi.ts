import { AllowedHttpMethods, submitResignationApiConfig } from '../../apiList'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  GetSeparationFormResponse,
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

const submitResignation = async (
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
const getSeparationFormApi = {
  getSeparationFormResponse,
  submitResignation,
}
export default getSeparationFormApi
