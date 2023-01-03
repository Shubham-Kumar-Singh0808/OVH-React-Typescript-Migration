import {
  ActiveEmployee,
  EmployeePipStatus,
  GetAllPipList,
  GetAllPipListApiProps,
  PerformanceRatings,
} from '../../../../types/Performance/PipList/pipListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { PipListApiConfig, AllowedHttpMethods } from '../../apiList'

const getAllPIPList = async (
  props: GetAllPipListApiProps,
): Promise<GetAllPipList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: PipListApiConfig.getAllPIPList,
    method: AllowedHttpMethods.get,
    params: {
      dateSelection: props.dateSelection,
      endIndex: props.endIndex ?? 20,
      from: props.from,
      multiSearch: props.multiSearch,
      searchByAdded: props.searchByAdded,
      searchByEmployee: props.searchByEmployee,
      selectionStatus: props.selectionStatus,
      startIndex: props.startIndex ?? 0,
      to: props.to,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportPIPList = async (
  props: GetAllPipListApiProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: PipListApiConfig.exportPIPList,
    method: AllowedHttpMethods.get,
    params: {
      dateSelection: props.dateSelection,
      selectionStatus: props.selectionStatus ?? EmployeePipStatus.pip,
      from: props.from,
      to: props.to,
      searchByEmployee: props.searchByEmployee,
      searchByAdded: props.searchByAdded,
      multiSearch: props.multiSearch,
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getPerformanceRatings = async (): Promise<PerformanceRatings[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: PipListApiConfig.getPerformanceRatings,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const activeEmployee = async (): Promise<ActiveEmployee[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: PipListApiConfig.activeEmployee,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const pipListApi = {
  getAllPIPList,
  exportPIPList,
  getPerformanceRatings,
  activeEmployee,
}

export default pipListApi
