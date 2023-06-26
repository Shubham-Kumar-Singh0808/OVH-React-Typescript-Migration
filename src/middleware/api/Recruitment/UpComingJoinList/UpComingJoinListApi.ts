import {
  GetJoineeById,
  GetUpComingJoineeList,
  UpComingJoineeListProps,
} from '../../../../types/Recruitment/UpComingJoinList/UpComingJoinListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, getUpComingJoinListConfig } from '../../apiList'

const getUpComingJoinList = async (
  props: UpComingJoineeListProps,
): Promise<GetUpComingJoineeList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: getUpComingJoinListConfig.getUpcomingJoineeList,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? '',
      searchName: props.searchName ?? '',
      startIndex: props.startIndex ?? '',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const getJoineeById = async (joineeId: number): Promise<GetJoineeById> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: getUpComingJoinListConfig.getJoineeById,
    method: AllowedHttpMethods.get,
    params: {
      joineeId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const UpComingJoinListApi = {
  getUpComingJoinList,
  getJoineeById,
}

export default UpComingJoinListApi
