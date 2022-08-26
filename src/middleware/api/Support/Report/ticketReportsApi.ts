import { AllowedHttpMethods, ticketReportApiConfig } from '../../apiList'
import {
  useAxios,
  getAuthenticatedRequestConfig,
} from '../../../../utils/apiUtils'
import {
  DepartmentCategoryList,
  DepartmentNameList,
  GetTicketDetails,
  GetTicketsReport,
  TicketDetailsProps,
  TicketReportApiProps,
} from '../../../../types/Support/Report/ticketReportTypes'

const getDepartmentNameList = async (): Promise<DepartmentNameList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketReportApiConfig.getDepartmentNameList,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getDepartmentCategoryList = async (
  deptId: number | string,
): Promise<DepartmentCategoryList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketReportApiConfig.departmentCategoryList,
    method: AllowedHttpMethods.get,
    params: {
      deptId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getTicketsReport = async (
  props: TicketReportApiProps,
): Promise<GetTicketsReport> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketReportApiConfig.getTicketsReport,
    method: AllowedHttpMethods.get,
    params: {
      dateSelection: props.dateSelection ?? '',
      departmentId: props.departmentId ?? '',
      from: props.from ?? '',
      ticketStatus: props.ticketStatus ?? '',
      to: props.to ?? '',
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getTicketDetails = async (
  props: TicketDetailsProps,
): Promise<GetTicketDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ticketReportApiConfig.getTicketsDetails,
    method: AllowedHttpMethods.get,
    params: {
      categoryId: props.categoryId ?? '',
      dateSelection: props.dateSelection ?? '',
      departmentId: props.departmentId ?? '',
      endIndex: props.endIndex ?? 20,
      filter: props.filter ?? '',
      from: props.from ?? '',
      startIndex: props.startIndex ?? 0,
      subCategoryId: props.subCategoryId ?? '',
      ticketStatus: props.ticketStatus ?? '',
      to: props.to ?? '',
      trackerId: props.trackerId ?? '',
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const ticketReportApi = {
  getDepartmentNameList,
  getDepartmentCategoryList,
  getTicketsReport,
  getTicketDetails,
}

export default ticketReportApi
