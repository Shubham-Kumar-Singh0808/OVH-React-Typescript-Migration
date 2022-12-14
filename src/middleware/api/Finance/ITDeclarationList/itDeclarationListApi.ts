import {
  Invest,
  Section,
} from '../../../../types/Finance/InvestmentCheckList/investmentCheckListTypes'
import {
  AddInvestmentData,
  AddSection,
  Cycle,
  ITDeclarationFormListResponse,
  ITDeclarationListApiProps,
  UpdateSection,
} from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, itDeclarationListApiConfig } from '../../apiList'

const getCycles = async (): Promise<Cycle[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.getCycles,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getITDeclarationForm = async (
  props: ITDeclarationListApiProps,
): Promise<ITDeclarationFormListResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.getITDeclarationForm,
    method: AllowedHttpMethods.get,
    params: {
      cycleId: props.investmentCycle ?? '',
      endIndex: props.endIndex ?? 20,
      employeeName: props.employeeName ?? '',
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportITDeclarationList = async (
  props: ITDeclarationListApiProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.exportITDeclarationList,
    method: AllowedHttpMethods.get,
    params: {
      cycleId: props.investmentCycle ?? '',
      searchname: props.searchname ?? '',
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getSections = async (): Promise<Section[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.getSections,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addSection = async (
  addNewSection: AddSection,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.addSection,
    method: AllowedHttpMethods.post,
    data: addNewSection,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateSection = async (
  editSection: UpdateSection,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.updateSection,
    method: AllowedHttpMethods.put,
    data: editSection,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deleteSection = async (id: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.deleteSection,
    method: AllowedHttpMethods.delete,
    params: {
      sectionId: id,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getInvestments = async (): Promise<Invest[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.getInvestments,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addInvestment = async (
  addInvestmentData: AddInvestmentData,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.addInvestment,
    method: AllowedHttpMethods.post,
    data: addInvestmentData,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deleteInvestment = async (id: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.deleteInvestment,
    method: AllowedHttpMethods.delete,
    params: {
      investmentId: id,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

export const itDeclarationListApi = {
  getCycles,
  getITDeclarationForm,
  exportITDeclarationList,
  getSections,
  addSection,
  deleteSection,
  updateSection,
  getInvestments,
  addInvestment,
  deleteInvestment,
}
