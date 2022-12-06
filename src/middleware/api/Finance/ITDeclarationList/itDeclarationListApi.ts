import {
  Cycle,
  ITDeclarationFormListResponse,
  ITDeclarationListApiProps,
} from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, itDeclarationListApiConfig } from '../../apiList'

const getCycles = async (): Promise<Cycle[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.getCycles,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getITDeclarationForm = async (
  props: ITDeclarationListApiProps,
): Promise<ITDeclarationFormListResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.getITDeclarationForm,
    method: AllowedHttpMethods.get,
    params: {
      cycleId: props.investmentCycle ?? '',
      endIndex: props.endIndex ?? 20,
      employeeName: props.employeeName ?? '',
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportITDeclarationList = async (
  props: ITDeclarationListApiProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.exportITDeclarationList,
    method: AllowedHttpMethods.get,
    params: {
      cycleId: props.investmentCycle ?? '',
      searchname: props.searchname ?? '',
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addCycle = async (addNewCycle: Cycle): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.addCycle,
    method: AllowedHttpMethods.post,
    data: addNewCycle,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

export const itDeclarationListApi = {
  getCycles,
  getITDeclarationForm,
  exportITDeclarationList,
  addCycle,
}
