import {
  GetSQAAuditReportProps,
  GetSQAAuditReport,
  ExportSQAAuditReportProps,
} from '../../../types/SQAAuditReport/sqaAuditReportTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import { sqaAuditReportApiConfig, AllowedHttpMethods } from '../apiList'

const getSQAAuditReport = async (
  props: GetSQAAuditReportProps,
): Promise<GetSQAAuditReport> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: sqaAuditReportApiConfig.getSQAAuditReport,
    method: AllowedHttpMethods.get,
    params: {
      SQAAuditSelectionDate: props.SQAAuditSelectionDate,
      auditRescheduleStatus: props.auditRescheduleStatus,
      auditStatus: props.auditStatus,
      endIndex: props.endIndex ?? 20,
      from: props.from,
      multiSearch: props.multiSearch,
      startIndex: props.startIndex ?? 0,
      to: props.to,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportSqaAuditReport = async (
  props: ExportSQAAuditReportProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: sqaAuditReportApiConfig.exportSqaAuditReport,
    method: AllowedHttpMethods.get,
    params: {
      SQAAuditSelectionDate: props.SQAAuditSelectionDate,
      auditStatus: props.auditStatus,
      auditRescheduleStatus: props.auditRescheduleStatus,
      startdate: props.startdate,
      enddate: props.enddate,
      multiSearch: props.multiSearch,
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const sqaAuditReportApi = {
  getSQAAuditReport,
  exportSqaAuditReport,
}

export default sqaAuditReportApi
