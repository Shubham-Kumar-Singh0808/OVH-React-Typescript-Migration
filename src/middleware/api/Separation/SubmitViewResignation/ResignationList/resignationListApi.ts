import {
  GetResignationListProps,
  ResignationListResponse,
} from '../../../../../types/Separation/ResignationList/resignationListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { AllowedHttpMethods, resignationListApiConfig } from '../../../apiList'

const getResignationList = async (
  props: GetResignationListProps,
): Promise<ResignationListResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.resignationList,
    method: AllowedHttpMethods.get,
    params: {
      dateSelection: props.dateSelection,
      empStatus: props.empStatus,
      endIndex: props.endIndex ?? 20,
      from: props.from,
      multiplesearch: props.multiplesearch,
      startIndex: props.startIndex ?? 0,
      status: props.status,
      to: props.to,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const resignationListApi = {
  getResignationList,
}

export default resignationListApi
