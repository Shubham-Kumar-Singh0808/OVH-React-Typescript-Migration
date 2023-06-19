import { AddNewJoineeProps } from '../../../../types/Recruitment/CandidateOffer/CandidateOfferTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, getCandidateOfferConfig } from '../../apiList'

const getAddNewJoineeData = async (props: AddNewJoineeProps) => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: getCandidateOfferConfig.getAddNewJoinee,
    method: AllowedHttpMethods.post,
    data: props,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getPersonTechnology = async (id: number) => {
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

const CandidateOfferApi = {
  getAddNewJoineeData,
  getPersonTechnology,
}
export default CandidateOfferApi
