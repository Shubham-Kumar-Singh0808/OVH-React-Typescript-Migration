import {
  AddNewJoineeProps,
  uploadFileForNewJoineeProps,
} from '../../../../types/Recruitment/CandidateOffer/CandidateOfferTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, getCandidateOfferConfig } from '../../apiList'

const getAddNewJoineeData = async (
  props: AddNewJoineeProps,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: getCandidateOfferConfig.getAddNewJoinee,
    method: AllowedHttpMethods.post,
    data: props,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getPersonTechnology = async (id: number): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: getCandidateOfferConfig.getpersontechnology,
    method: AllowedHttpMethods.get,
    params: {
      id,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const uploadAddNewJoineeFile = async (
  finalData: uploadFileForNewJoineeProps,
): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: getCandidateOfferConfig.getUploadFileForNewJoinee,
    method: AllowedHttpMethods.post,
    params: {
      candidateId: finalData.candidateId,
    },
    data: { file: finalData.file },
    additionalHeaders: {
      'Content-Type': 'addNewJoinee/form-data',
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const CandidateOfferApi = {
  getAddNewJoineeData,
  getPersonTechnology,
  uploadAddNewJoineeFile,
}
export default CandidateOfferApi
