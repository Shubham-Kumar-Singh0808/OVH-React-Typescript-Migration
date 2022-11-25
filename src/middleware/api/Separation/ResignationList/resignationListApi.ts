import axios from 'axios'
import {
  ClearanceDetails,
  ClearanceDetailsProps,
  GetResignationListProps,
  ResignationListResponse,
  SeparationTimeLine,
  submitClearenceCommentsProps,
} from '../../../../types/Separation/ResignationList/resignationListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, resignationListApiConfig } from '../../apiList'

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

const exportResignationListData = async (
  props: GetResignationListProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.exportResignationList,
    method: AllowedHttpMethods.get,
    params: {
      dateSelection: props.dateSelection,
      empStatus: props.empStatus,
      from: props.from,
      multiplesearch: props.multiplesearch,
      status: props.status,
      to: props.to,
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const resignationIntitiateCC = async (
  separationId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.resignationInitiateCC,
    method: AllowedHttpMethods.put,
    params: {
      separationId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getSeparationTimeLine = async (
  separationId: number,
): Promise<SeparationTimeLine> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.getSeparationTimeLine,
    method: AllowedHttpMethods.get,
    params: {
      separationId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const submitClearenceCertificate = async (
  clearenceCertificate: submitClearenceCommentsProps,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.clearanceCertificateComments,
    method: AllowedHttpMethods.post,
    data: clearenceCertificate,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const commonParamsUtil = (props: ClearanceDetailsProps) => {
  return {
    separationId: props.separationId ?? '',
    submittedBy: props.submittedBy ?? '',
  }
}

const getClearanceDetails = async (
  props: ClearanceDetailsProps,
): Promise<ClearanceDetails[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.getClearanceDetails,
    method: AllowedHttpMethods.get,
    params: commonParamsUtil(props),
  })
  const response = await axios(requestConfig)
  return response.data
}

const resignationListApi = {
  getResignationList,
  exportResignationListData,
  resignationIntitiateCC,
  getSeparationTimeLine,
  submitClearenceCertificate,
  getClearanceDetails,
}

export default resignationListApi
