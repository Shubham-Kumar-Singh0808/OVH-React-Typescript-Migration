import {
  GetUpComingJoineeList,
  UpComingJoineeListProps,
  UpdateUpComingJoineeList,
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

const UpdateNewJoinee = async (
  data: UpdateUpComingJoineeList,
): Promise<UpdateUpComingJoineeList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: getUpComingJoinListConfig.getUpdateNewJoinee,
    method: AllowedHttpMethods.put,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const UpComingJoinListApi = {
  getUpComingJoinList,
  UpdateNewJoinee,
}

export default UpComingJoinListApi
