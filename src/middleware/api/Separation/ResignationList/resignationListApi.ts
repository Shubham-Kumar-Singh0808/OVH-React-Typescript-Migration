import axios from 'axios'
import {
  ClearanceDetails,
  ClearanceDetailsProps,
  GetEmpDetailsType,
  GetResignationListProps,
  ResignationListResponse,
  SeparationChart,
  SeparationChartProps,
  SeparationTimeLine,
  submitClearanceCommentsProps,
  SubmitExitFeedBackForm,
  UpdateClearanceDetails,
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

const submitClearanceCertificate = async (
  clearanceCertificate: submitClearanceCommentsProps,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.clearanceCertificateComments,
    method: AllowedHttpMethods.post,
    data: clearanceCertificate,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getClearanceDetails = async (
  props: ClearanceDetailsProps,
): Promise<ClearanceDetails[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.getClearanceDetails,
    method: AllowedHttpMethods.get,
    params: {
      separationId: props.separationId ?? '',
      submittedBy: props.submittedBy ?? '',
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const updateCCDetails = async (
  updateClearanceCertificate: UpdateClearanceDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.updateCCDetails,
    method: AllowedHttpMethods.put,
    data: updateClearanceCertificate,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getSeparationChart = async (
  props: SeparationChartProps,
): Promise<SeparationChart> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.getSeparationChart,
    method: AllowedHttpMethods.get,
    params: {
      dateSelection: props.dateSelection ?? '',
      from: props.from ?? '',
      to: props.to ?? '',
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const getEmpDetails = async (
  separationId: number,
): Promise<GetEmpDetailsType> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.getEmpDetails,
    method: AllowedHttpMethods.get,
    params: {
      separationId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const saveExitFeedBackForm = async (
  saveFeedBackForm: SubmitExitFeedBackForm,
): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.saveExitFeedBackForm,
    method: AllowedHttpMethods.post,
    data: saveFeedBackForm,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const uploadRelievingLetter = async (prepareObject: {
  exitFormId: number
  file: FormData
}): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.uploadRelievingLetter,
    method: AllowedHttpMethods.post,
    data: prepareObject.file,
    params: {
      exitfeddbackformId: prepareObject.exitFormId,
    },
    additionalHeaders: {
      'Content-Type': 'multipart/form-data',
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const uploadExitFeedBackFile = async (prepareObject: {
  exitFeedBackFormId: number
  file: FormData
}): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.uploadExitFeedBackFile,
    method: AllowedHttpMethods.post,
    data: prepareObject.file,
    params: {
      exitfeddbackformId: prepareObject.exitFeedBackFormId,
    },
    additionalHeaders: {
      'Content-Type': 'multipart/form-data',
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateResignationTimeLine = async (
  updateSeparationTimeLine: SeparationTimeLine,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: resignationListApiConfig.updateTimeLine,
    method: AllowedHttpMethods.put,
    data: updateSeparationTimeLine,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const resignationListApi = {
  getResignationList,
  exportResignationListData,
  resignationIntitiateCC,
  getSeparationTimeLine,
  submitClearanceCertificate,
  getClearanceDetails,
  updateCCDetails,
  getSeparationChart,
  getEmpDetails,
  saveExitFeedBackForm,
  uploadRelievingLetter,
  uploadExitFeedBackFile,
  updateResignationTimeLine,
}

export default resignationListApi
