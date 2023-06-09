import {
  CandidateListTableProps,
  CandidateTotalInfo,
  GetAllJobVacanciesParams,
  GetAllTechnology,
  country,
  viewHandlerProps,
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

const getCountryWiseCandidatesList = async (
  data: viewHandlerProps,
): Promise<CandidateTotalInfo> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.getCountryWiseCandidatesList,
    method: AllowedHttpMethods.post,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const deleteCandidate = async (candidateId: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.deleteCandidate,
    method: AllowedHttpMethods.get,
    params: {
      candidateId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllJobVacancies = async (params: GetAllJobVacanciesParams) => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.getAllJobVacanciesList,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: params.endIndex ?? '',
      startIndex: params.startIndex ?? '',
      searchJobTitle: params.searchJobTitle ?? '',
      status: params.status ?? 'open',
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const candidateListApi = {
  searchScheduledCandidate,
  getEmpCountries,
  getTechnology,
  getCountryWiseCandidatesList,
  deleteCandidate,
  getAllJobVacancies,
}

export default candidateListApi
