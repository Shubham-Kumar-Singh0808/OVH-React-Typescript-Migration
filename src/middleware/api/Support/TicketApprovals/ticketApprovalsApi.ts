import {
  DepartmentCategoryList,
  DepartmentList,
  GetAllLookUps,
  GetAllTicketsForApprovalProps,
  GetAllTicketsForApprovalResponse,
  SubCategoryList,
  TrackerList,
} from '../../../../types/Support/TicketApprovals/ticketApprovalsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, ticketApprovalsApiConfig } from '../../apiList'

const getDepartmentNameList = async (): Promise<DepartmentList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketApprovalsApiConfig.getDepartmentNameList,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getTrackerList = async (): Promise<TrackerList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketApprovalsApiConfig.getAllTrackerList,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllLookUps = async (): Promise<GetAllLookUps[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketApprovalsApiConfig.getAllLookups,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getDepartmentCategoryList = async (
  deptId: number,
): Promise<DepartmentCategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketApprovalsApiConfig.departmentCategoryList,
    method: AllowedHttpMethods.get,
    params: {
      deptId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getSubCategoryList = async (
  categoryId: number,
): Promise<SubCategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketApprovalsApiConfig.subCategoryList,
    method: AllowedHttpMethods.get,
    params: {
      categoryId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const commonParamsUtil = (props: GetAllTicketsForApprovalProps) => {
  return {
    categoryId: props.categoryId ?? '',
    dateSelection: props.dateSelection,
    departmentId: props.departmentId ?? '',
    endIndex: props.endIndex ?? 20,
    from: props.fromDate ?? '',
    multiSearch: props.multiSearch ?? '',
    progressStatus: props.progressStatus,
    searchByAssigneeName: props.searchByAssigneeName,
    searchByEmpName: props.searchByEmpName,
    startIndex: props.startIndex ?? 0,
    subCategoryId: props.subCategoryId ?? '',
    ticketStatus: props.ticketStatus,
    to: props.toDate ?? '',
    trackerID: props.trackerID ?? '',
  }
}

const getAllTicketsForApproval = async (
  props: GetAllTicketsForApprovalProps,
): Promise<GetAllTicketsForApprovalResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketApprovalsApiConfig.getAllTicketsForApproval,
    method: AllowedHttpMethods.get,
    params: commonParamsUtil(props),
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportTicketApprovalList = async (
  props: GetAllTicketsForApprovalProps,
): Promise<Blob | undefined> => {
  const paramsResult = commonParamsUtil(props)
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketApprovalsApiConfig.exportTicketApprovalList,
    method: AllowedHttpMethods.get,
    params: { ...paramsResult, token: localStorage.getItem('token') ?? '' },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const rejectTicket = async (ticketId: number): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketApprovalsApiConfig.rejectManagerTicket,
    method: AllowedHttpMethods.put,
    params: {
      tktId: ticketId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const ticketApprovalsApi = {
  getDepartmentNameList,
  getTrackerList,
  getAllLookUps,
  getDepartmentCategoryList,
  getSubCategoryList,
  getAllTicketsForApproval,
  exportTicketApprovalList,
  rejectTicket,
}

export default ticketApprovalsApi
