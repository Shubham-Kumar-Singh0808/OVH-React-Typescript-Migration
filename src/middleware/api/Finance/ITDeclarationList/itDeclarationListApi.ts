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
      cycleId: props.cycleId ?? '',
      endIndex: props.endIndex ?? 20,
      employeeName: props.employeeName ?? '',
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

export const itDeclarationListApi = {
  getCycles,
  getITDeclarationForm,
}
