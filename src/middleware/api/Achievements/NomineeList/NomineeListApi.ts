import { NomineeCycleListType } from '../../../../types/Achievements/commonAchievementTypes'
import {
  IncomingNomineeDetails,
  NominationsListTypes,
} from '../../../../types/Achievements/NomineeList/NomineeListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, NomineeListApiConfig } from '../../apiList'

const getAllCycles = async (): Promise<NomineeCycleListType> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: NomineeListApiConfig.getAllCycles,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getNominations = async (
  cycleId: number,
): Promise<NominationsListTypes[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: NomineeListApiConfig.getNominations,
    method: AllowedHttpMethods.get,
    params: {
      cycleId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getNominationDetails = async (
  nominationId: number,
): Promise<IncomingNomineeDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: NomineeListApiConfig.getNominationDetails,
    method: AllowedHttpMethods.get,
    params: {
      nominationId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const reviewNominee = async (
  outBody: IncomingNomineeDetails,
): Promise<void> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: NomineeListApiConfig.reviewNominee,
    method: AllowedHttpMethods.put,
    data: outBody,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportNomineeList = async (
  cycleId: number,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: NomineeListApiConfig.exportNomineeList,
    method: AllowedHttpMethods.get,
    params: {
      cycle: cycleId,
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const NomineeListApi = {
  getAllCycles,
  getNominations,
  getNominationDetails,
  reviewNominee,
  exportNomineeList,
}

export default NomineeListApi
