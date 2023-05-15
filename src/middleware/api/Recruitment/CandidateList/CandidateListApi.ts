import {
  CandidateListTableProps,
  CandidateTotalInfo,
  GetAllTechnology,
  country,
} from '../../../../types/Recruitment/CandidateList/CandidateListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, CandidateListApiConfig } from '../../apiList'

const searchScheduledCandidate = async (
  props: CandidateListTableProps,
): Promise<CandidateTotalInfo> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.searchScheduledCandidate,
    method: AllowedHttpMethods.get,
    params: {
      searchStr: props.searchStr,
      endIndex: props.endIndex,
      startIndex: props.startIndex,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getEmpCountries = async (): Promise<country[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.getEmpCountries,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getTechnology = async (): Promise<GetAllTechnology[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.getAllTechnology,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const candidateListApi = {
  searchScheduledCandidate,
  getEmpCountries,
  getTechnology,
}

export default candidateListApi
