import { DownloadPaySlips } from '../../../types/Finance/PanDetails/panDetailsTypes'
import {
  GetSQAAuditReportProps,
  GetSQAAuditReport,
  ExportSQAAuditReportProps,
  GetSQAAuditHistory,
  GetAuditDetails,
  RescheduleMeetingProps,
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

const deleteProjectAuditDetails = async (
  auditId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: sqaAuditReportApiConfig.deleteProjectAuditDetails,
    method: AllowedHttpMethods.delete,
    params: {
      auditId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const closeProjectAuditDetails = async (
  auditId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: sqaAuditReportApiConfig.closeAudit,
    method: AllowedHttpMethods.put,
    params: {
      auditId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getNewSQAAuditTimelineDetails = async (
  auditId: number,
): Promise<GetSQAAuditHistory> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: sqaAuditReportApiConfig.getNewSQAAuditTimelineDetails,
    method: AllowedHttpMethods.get,
    params: {
      auditId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getSQAAuditDetails = async (
  auditId: number,
): Promise<GetAuditDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: sqaAuditReportApiConfig.getAuditDetails,
    method: AllowedHttpMethods.get,
    params: {
      auditId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const saveOrSubmitAuditForm = async (
  rescheduleMeeting: RescheduleMeetingProps,
): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: sqaAuditReportApiConfig.saveOrSubmitAuditForm,
    method: AllowedHttpMethods.post,
    data: rescheduleMeeting,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const downloadSQAAuditFile = async (
  prepareObject: DownloadPaySlips,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: sqaAuditReportApiConfig.downloadSQAAuditFile,
    method: AllowedHttpMethods.get,
    params: {
      fileName: prepareObject.fileName,
      token: localStorage.getItem('token') ?? '',
      tenantKey: localStorage.getItem('tenantKey') ?? '',
    },
    responseType: 'blob',
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const sqaAuditReportApi = {
  getSQAAuditReport,
  exportSqaAuditReport,
  deleteProjectAuditDetails,
  closeProjectAuditDetails,
  getNewSQAAuditTimelineDetails,
  getSQAAuditDetails,
  saveOrSubmitAuditForm,
  downloadSQAAuditFile,
}

export default sqaAuditReportApi
