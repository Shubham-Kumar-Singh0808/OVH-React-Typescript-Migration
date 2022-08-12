import { AllowedHttpMethods, ticketReportApiConfig } from '../../apiList'
import {
  useAxios,
  getAuthenticatedRequestConfig,
} from '../../../../utils/apiUtils'
import {
  DepartmentCategoryList,
  DepartmentNameList,
  GetTicketsReport,
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

const ticketReportApi = {
  getDepartmentNameList,
  getDepartmentCategoryList,
  getTicketsReport,
}

export default ticketReportApi
