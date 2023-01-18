import {
  ActiveEmployee,
  EmployeePipStatus,
  GetAllPipList,
  GetAllPipListApiProps,
  GetPIPHistory,
  GetPipList,
  PerformanceRatings,
  PipHistoryProps,
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

const addPIP = async ({
  empId,
  endDate,
  improvement,
  rating,
  remarks,
  startDate,
}: {
  empId: number
  endDate: string
  improvement: string
  rating: string
  remarks: string
  startDate: string
}): Promise<number | string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: PipListApiConfig.addPIP,
    method: AllowedHttpMethods.post,
    data: {
      empId,
      endDate,
      improvement,
      rating,
      remarks,
      startDate,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const viewPipDetails = async (id: number | string): Promise<GetPipList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: PipListApiConfig.viewPipDetails,
    method: AllowedHttpMethods.get,
    params: {
      id,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getPIPHistory = async (
  props: PipHistoryProps,
): Promise<GetPIPHistory> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: PipListApiConfig.getPIPHistory,
    method: AllowedHttpMethods.get,
    params: {
      filterName: props.filterName ?? 20,
      pipId: props.pipId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const extendPip = async (data: GetPipList): Promise<GetPipList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: PipListApiConfig.extendPip,
    method: AllowedHttpMethods.put,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const removeFromPip = async (data: GetPipList): Promise<GetPipList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: PipListApiConfig.removeFromPip,
    method: AllowedHttpMethods.put,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updatePipDetails = async (data: GetPipList): Promise<GetPipList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: PipListApiConfig.updatePipDetails,
    method: AllowedHttpMethods.put,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const savePIPClearnceCertificate = async (
  employeeId: number | string,
): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: PipListApiConfig.savePIPClearnceCertificate,
    method: AllowedHttpMethods.post,
    params: {
      employeeId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const pipListApi = {
  getAllPIPList,
  exportPIPList,
  getPerformanceRatings,
  activeEmployee,
  addPIP,
  viewPipDetails,
  getPIPHistory,
  extendPip,
  removeFromPip,
  updatePipDetails,
  savePIPClearnceCertificate,
}

export default pipListApi
